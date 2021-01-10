import { DialogContainer, AlertDialog, Text } from '@adobe/react-spectrum'
import { Note as tonalNote } from '@tonaljs/tonal'
import React from 'react'
import { ChordSymbol, Beat, MIDINoteNumber, Locale } from '../../../../types'
import { makeAllData } from '../../../../utils/data'
import * as Styles from './styles'
import { makeViewData } from './utils'

export type Props = {
  isBrowser: boolean
  value: string
  beat: Beat
  baseNote: {
    symbol: ChordSymbol
    number: MIDINoteNumber
  }
  locale: Locale
}

export const ViewArea: React.FC<Props> = ({ value, beat, baseNote, isBrowser, locale }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isOpenBarError, setIsOpenBarError] = React.useState<boolean>(false)
  const [selectedBar, setSelectedBar] = React.useState<number>(NaN)

  const [selectedChord, setSelectedChord] = React.useState<{
    barIndex: number
    chordIndex: number
  }>({ barIndex: NaN, chordIndex: NaN })

  const allData = React.useMemo(() => makeAllData(value, baseNote, beat), [value, baseNote, beat])
  const beatParser = React.useMemo(
    () => ({
      molecular: Number(beat.split('/')[0]),
      denominator: Number(beat.split('/')[1]),
    }),
    [beat]
  )
  const baseNoteParser: number = React.useMemo(
    () => tonalNote.midi(`${baseNote.symbol}${baseNote.number}`),
    [baseNote]
  )
  const parsedBars = React.useMemo(
    () =>
      makeViewData(
        allData.bars,
        allData.chords,
        allData.notes,
        allData.data,
        baseNoteParser,
        beatParser.molecular
      ),
    [allData, baseNoteParser, beatParser]
  )
  const selectedChordForComponent: { title: string; texts: string[] } = React.useMemo(() => {
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
      return {
        title: 'Error',
        texts: ['Error'],
      }
    }

    if (currentChord.isError) {
      return {
        title: currentBar.chords[currentChord.index],
        texts: [`${locale === 'ja' ? '不正なコードです' : 'Invalid chord'}`],
      }
    }

    return {
      title:
        'symbol' in currentChord
          ? currentChord.symbol
          : `${currentChord.configurationSymbol}/${currentChord.baseSymbol}`,
      texts: currentNotes.map(({ note, distance }) => `${distance}: ${note}`),
    }
  }, [selectedChord, allData.bars, allData.chords, allData.notes, locale])

  const barErrorText = React.useMemo(() => {
    const currentBar = allData.bars.find((bar) => bar.index === selectedBar)

    if (typeof currentBar === 'undefined') {
      return ''
    }

    return locale === 'ja'
      ? `小節に四分音符が${
          currentBar.chords.length
        }つ入っています。現在${beat}なので四分音符は一小節に${beat.split('/')[0]}つまでです。`
      : `There are ${
          currentBar.chords.length
        } quarter notes in a measure. Since we are currently in ${beat},
    there can be no more than ${beat.split('/')[0]} quarter notes in a measure.`
  }, [locale, beat, selectedBar, allData.bars])

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
            variant="information"
            primaryActionLabel={locale === 'ja' ? '閉じる' : 'Close'}
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
            title={
              locale === 'ja' ? `エラー: ${selectedBar + 1}小節目` : `Error: ${selectedBar + 1} Bar`
            }
            variant="error"
            primaryActionLabel={locale === 'ja' ? '閉じる' : 'Close'}
          >
            <Text>{barErrorText}</Text>
          </AlertDialog>
        )}
      </DialogContainer>
      <Styles.Bars>
        {parsedBars.map((bar) => {
          if (bar.isError) {
            return (
              <Styles.Bar key={bar.index} beat={beatParser.molecular}>
                <Styles.ErrorBar onClick={onClickBarError(bar.index)} />
              </Styles.Bar>
            )
          }

          return (
            <Styles.Bar key={bar.index} beat={beatParser.molecular}>
              {bar.targetChords.map((targetChord) => (
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
              ))}
            </Styles.Bar>
          )
        })}
      </Styles.Bars>
    </Styles.Main>
  )
}
