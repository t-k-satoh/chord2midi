import {
  DialogContainer,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  Divider,
  Heading,
  Text,
} from '@adobe/react-spectrum'
import { Note, Chord as tonalChord } from '@tonaljs/tonal'
import _ from 'lodash'
import React from 'react'
import { isBrowser } from 'react-device-detect'
import { Beats } from '../constants'
import { Data, Chord } from '../types'
import * as Styles from './styles'

type Props = {
  data: Data[]
  chords: Chord[]
  baseNoteNumber: number
  beat: typeof Beats[number]
}

export const ViewArea: React.FC<Props> = ({ data, chords, baseNoteNumber, beat }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [currentSymbol, setCurrentSymbol] = React.useState<string>('')
  const [hover, setHover] = React.useState<string>('')

  const baseNote: number = React.useMemo(() => Note.midi(`C${baseNoteNumber + 1}`), [
    baseNoteNumber,
  ])

  const onClickNoteButton = React.useCallback(
    (symbol: string) => () => {
      setIsOpen(true)
      setCurrentSymbol(symbol)
    },
    []
  )

  const onDismiss = React.useCallback(() => {
    setIsOpen(false)
    setCurrentSymbol('')
  }, [])

  const onMouseEnter = React.useCallback(
    (uuid: string) => () => {
      setHover(uuid)
    },
    []
  )

  const onMouseLeave = React.useCallback(() => {
    setHover('')
  }, [])

  const allChord: {
    chord: string[]
    notes: Data[]
    isError: boolean
    uuid: string
  }[] = React.useMemo(() => {
    return chords.map(({ chord, index, isError, uuid }) => {
      return {
        chord,
        notes: data.filter(({ noteIndex }) => noteIndex === index),
        isError,
        uuid,
      }
    })
  }, [data, chords])

  const symbolsList: {
    duration: number
    symbol: string
    uuid: string
  }[][] = React.useMemo(() => {
    return chords.map(({ uuid }) => {
      const targetData = data
        .filter(({ uuid: _uuid }) => uuid === _uuid)
        .map(({ chordIndex, duration, symbol }) => {
          return { chordIndex, duration: 2 / duration, symbol }
        })

      return _.uniqBy(targetData, 'chordIndex').map(({ duration, symbol }) => ({
        duration,
        symbol,
        uuid,
      }))
    })
  }, [data, chords])

  const dialogContents: { interval: string; note: string }[] = React.useMemo(() => {
    const hasOnChord = currentSymbol.indexOf('/') !== -1

    if (hasOnChord) {
      const splitSlash = currentSymbol.split('/')
      const configurationChord = tonalChord.get(splitSlash[0])
      const baseChord = tonalChord.get(splitSlash[1])

      return [
        { interval: '1P', note: baseChord.notes[0] },
        ...configurationChord.notes
          .filter((_note, index) => index !== 0)
          .map((note, index) => {
            return {
              interval: configurationChord.intervals[index + 1],
              note,
            }
          }),
      ]
    }

    return tonalChord.get(currentSymbol).notes.map((note, index) => {
      return {
        interval: tonalChord.get(currentSymbol).intervals[index],
        note,
      }
    })
  }, [currentSymbol])

  const newBeat: {
    denominator: number
    numerator: number
  } = React.useMemo(() => {
    const split = beat.split('/')

    return {
      denominator: Number(split[1]),
      numerator: Number(split[0]),
    }
  }, [beat])

  return (
    <Styles.Main id={hover}>
      <DialogContainer onDismiss={onDismiss}>
        {isOpen && (
          <Dialog>
            <Heading>{currentSymbol}</Heading>
            <Divider />
            <Content>
              {dialogContents.map(({ note, interval }) => {
                return (
                  <Styles.NoteText key={note}>
                    <Text>{`${interval}: ${note}`}</Text>
                  </Styles.NoteText>
                )
              })}
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={onDismiss}>
                Close
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogContainer>
      <Styles.Bars>
        {allChord.map(({ chord, notes, isError }, index) => {
          return (
            <Styles.Bar key={`${chord}_${index}`} beat={newBeat.numerator}>
              {isError && (
                <Styles.Layer zIndex={0}>
                  <Styles.Error>
                    <Styles.NoteText>Error: {chord}</Styles.NoteText>
                  </Styles.Error>
                </Styles.Layer>
              )}

              {isBrowser && !isError && (
                <Styles.Layer zIndex={0}>
                  {symbolsList[index].map(({ symbol, duration }, _index) => {
                    return (
                      <Styles.Chord duration={duration} key={`${index}_${_index}`}>
                        {symbol}
                      </Styles.Chord>
                    )
                  })}
                </Styles.Layer>
              )}

              {!isError && (
                <Styles.Layer zIndex={1}>
                  {notes.map(({ note, duration, time }, _index) => {
                    return (
                      <Styles.Note
                        key={_index}
                        duration={2 / duration}
                        position={Note.midi(note) - baseNote}
                        left={((time - index * 2) / 2) * 100}
                      ></Styles.Note>
                    )
                  })}
                </Styles.Layer>
              )}

              {!isError && (
                <Styles.Layer zIndex={2}>
                  {symbolsList[index].map(({ duration, symbol, uuid }, _index) => {
                    return (
                      <Styles.NoteButton
                        key={`${index}_${_index}`}
                        duration={duration}
                        onClick={onClickNoteButton(symbol)}
                        onMouseEnter={onMouseEnter(uuid)}
                        onMouseLeave={onMouseLeave}
                      />
                    )
                  })}
                </Styles.Layer>
              )}
            </Styles.Bar>
          )
        })}
      </Styles.Bars>
    </Styles.Main>
  )
}
