import { DialogContainer, AlertDialog, Text } from '@adobe/react-spectrum'
import { Note as tonalNote } from '@tonaljs/tonal'
import React from 'react'
import { I18N } from '../../../../constants/i18n'
import { ChordSymbol, Beat, MIDINoteNumber, Locale, ExcludeInit } from '../../../../types'
import * as utils from '../../../../utils'
import { makeAllData } from '../../../../utils/data'
import * as Styles from './styles'
import { makeViewData } from './utils'

export type Props = {
  isBrowser: boolean
  value: string
  chordSymbol: ExcludeInit<ChordSymbol>
  beat: ExcludeInit<Beat>
  midiNoteNumber: ExcludeInit<MIDINoteNumber>
  locale: ExcludeInit<Locale>
  barPosition: number
  currentBar: number
}

export const ViewArea: React.FC<Props> = React.memo(function Component({
  value,
  beat,
  isBrowser,
  chordSymbol,
  midiNoteNumber,
  locale,
  barPosition,
  currentBar,
}) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isOpenBarError, setIsOpenBarError] = React.useState<boolean>(false)
  const [selectedBar, setSelectedBar] = React.useState<number>(NaN)
  const [selectedChord, setSelectedChord] = React.useState<{
    barIndex: number
    chordIndex: number
  }>({ barIndex: NaN, chordIndex: NaN })

  const closeText = React.useMemo(() => utils.switchLangText(I18N.UTILS.CLOSE, locale, null), [
    locale,
  ])
  const allData = React.useMemo(() => makeAllData({ value, chordSymbol, beat, midiNoteNumber }), [
    value,
    chordSymbol,
    beat,
    midiNoteNumber,
  ])
  const { molecular } = React.useMemo(() => utils.beatToFraction(beat), [beat])
  const baseNote: number = React.useMemo(() => tonalNote.midi(`${chordSymbol}${midiNoteNumber}`), [
    midiNoteNumber,
    chordSymbol,
  ])
  const parsedBars = React.useMemo(
    () =>
      makeViewData(allData.bars, allData.chords, allData.notes, allData.data, baseNote, molecular),
    [allData, baseNote, molecular]
  )
  const selectedChordForComponent: {
    title: string
    texts: string[]
    isError: boolean
  } = React.useMemo(() => {
    const currentBar = allData.bars.find((bar) => bar.index === selectedChord.barIndex)
    const currentChord = allData.chords.find(
      (chord) =>
        chord.barIndex === selectedChord.barIndex && chord.index === selectedChord.chordIndex
    )
    const currentNotes = allData.notes.filter(
      (note) =>
        note.barIndex === selectedChord.barIndex && note.chordIndex === selectedChord.chordIndex
    )

    if (
      typeof currentBar === 'undefined' ||
      typeof currentChord === 'undefined' ||
      typeof currentNotes === 'undefined'
    ) {
      const errorText = utils.switchLangText(I18N.UTILS.ERROR, locale, null)

      return {
        title: errorText,
        texts: [errorText],
        isError: true,
      }
    }

    if (currentChord.isError) {
      return {
        title: currentBar.chords[currentChord.index],
        texts: [utils.switchLangText(I18N.HOME.INVALID_CHORD, locale, null)],
        isError: true,
      }
    }

    return {
      title:
        'symbol' in currentChord
          ? currentChord.symbol
          : `${currentChord.configurationSymbol}/${currentChord.baseSymbol}`,
      texts: currentNotes.map(({ note, distance }) => `${distance}: ${note}`),
      isError: false,
    }
  }, [selectedChord, allData.bars, allData.chords, allData.notes, locale])
  const barErrorText = React.useMemo(() => {
    const currentBar = allData.bars.find((bar) => bar.index === selectedBar)

    if (typeof currentBar === 'undefined') {
      return ''
    }

    return utils.switchLangText(I18N.HOME.OVERFLOW_NOTES, locale, {
      CURRENT_NOTE_LENGTH: currentBar.chords.length,
      CURRENT_BEAT_LIMIT: beat.split('/')[0],
      CURRENT_BEAT: beat,
    })
  }, [locale, beat, selectedBar, allData.bars])
  const isResetHandle = React.useMemo(() => currentBar === 0 && barPosition === 0, [
    currentBar,
    barPosition,
  ])
  const handlePosition = React.useMemo(() => {
    if (isResetHandle) {
      return 0
    }

    const newBarPos = barPosition - 1
    const bottom = (currentBar - 1) * molecular
    const top = currentBar * molecular

    return (newBarPos - bottom) / (top - bottom)
  }, [barPosition, currentBar, molecular, isResetHandle])
  const handleBar = React.useMemo(() => (isResetHandle ? 1 : currentBar), [
    currentBar,
    isResetHandle,
  ])

  const onClickChord = React.useCallback(
    (barIndex: number, chordIndex: number) => () => {
      setSelectedChord({ barIndex, chordIndex })
      setIsOpen(true)
    },
    []
  )

  const onClickBarError = React.useCallback(
    (barIndex: number) => () => {
      setSelectedBar(barIndex)
      setIsOpenBarError(true)
    },
    []
  )

  const onClose = React.useCallback(() => {
    setIsOpen(false)
    setSelectedChord({ barIndex: NaN, chordIndex: NaN })
  }, [])

  const onCloseBarError = React.useCallback(() => {
    setIsOpenBarError(false)
  }, [])

  return (
    <Styles.Main>
      <DialogContainer onDismiss={onClose}>
        {isOpen && (
          <AlertDialog
            title={selectedChordForComponent.title}
            variant={selectedChordForComponent.isError ? 'error' : 'information'}
            primaryActionLabel={closeText}
          >
            {selectedChordForComponent.texts.map((text, index) => (
              <Styles.NoteText key={index}>
                <Text>{text}</Text>
              </Styles.NoteText>
            ))}
          </AlertDialog>
        )}
      </DialogContainer>
      <DialogContainer onDismiss={onCloseBarError}>
        {isOpenBarError && (
          <AlertDialog
            title={utils.switchLangText(I18N.HOME.ERROR_BAR, locale, {
              ERROR_BAR_INDEX: selectedBar + 1,
            })}
            variant="error"
            primaryActionLabel={closeText}
          >
            <Text>{barErrorText}</Text>
          </AlertDialog>
        )}
      </DialogContainer>
      <Styles.Bars>
        {parsedBars.map((bar) => {
          return (
            <Styles.Bar key={bar.index}>
              {bar.index + 1 === handleBar && (
                <Styles.Handle style={{ left: `calc(${handlePosition * 100}% - 0.5px)` }} />
              )}
              {bar.isError ? (
                <Styles.ErrorBar onClick={onClickBarError(bar.index)} />
              ) : (
                bar.targetChords.map((targetChord) => {
                  return (
                    <Styles.Chord
                      key={String(bar.index + targetChord.index)}
                      duration={targetChord.chordDuration}
                      onClick={onClickChord(bar.index, targetChord.index)}
                    >
                      {targetChord.isNoteError ? (
                        <Styles.Error />
                      ) : (
                        <>
                          {isBrowser && <Styles.Symbol>{targetChord.symbol}</Styles.Symbol>}
                          {targetChord.targetNotes.map((targetNote) => (
                            <Styles.Note
                              key={String(bar.index + targetChord.index + targetNote.index)}
                              position={targetNote.interval}
                            ></Styles.Note>
                          ))}
                        </>
                      )}
                    </Styles.Chord>
                  )
                })
              )}
            </Styles.Bar>
          )
        })}
      </Styles.Bars>
    </Styles.Main>
  )
})
