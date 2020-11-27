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
import { isMobile, isBrowser } from 'react-device-detect'
import { Data, Chord } from '../types'
import * as Styles from './styles'

type Props = {
  data: Data[]
  chords: Chord[]
  baseNoteNumber: number
}

export const ViewArea: React.FC<Props> = ({ data, chords, baseNoteNumber }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [currentSymbol, setCurrentSymbol] = React.useState<string>('')

  const baseNote = Note.midi(`C${baseNoteNumber}`)

  const allChord: {
    chord: string[]
    notes: Data[]
  }[] = React.useMemo(() => {
    return chords.map(({ chord, index }) => {
      return {
        chord,
        notes: data.filter(({ noteIndex }) => noteIndex === index),
      }
    })
  }, [data, chords])

  const symbolsList: {
    duration: number
    symbol: string
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
      }))
    })
  }, [data, chords])

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

  return (
    <Styles.Main>
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
        {allChord.map(({ chord, notes }, index) => {
          return (
            <Styles.Bar key={`${chord}_${index}`}>
              {isBrowser && (
                <Styles.Layer zIndex={0}>
                  {symbolsList[index].map(({ symbol, duration }, index) => {
                    return (
                      <Styles.Chord duration={duration} key={index}>
                        {symbol}
                      </Styles.Chord>
                    )
                  })}
                </Styles.Layer>
              )}

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

              {isMobile && (
                <Styles.Layer zIndex={2}>
                  {symbolsList[index].map(({ duration, symbol }, index) => {
                    return (
                      <Styles.NoteButton
                        key={index}
                        duration={duration}
                        onClick={onClickNoteButton(symbol)}
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
