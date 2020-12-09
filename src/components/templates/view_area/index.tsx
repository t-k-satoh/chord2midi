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
import { Note as tonalNote, Chord as tonalChord } from '@tonaljs/tonal'
import _ from 'lodash'
import React from 'react'
// import { isBrowser } from 'react-device-detect'
import { Beats } from '../../constants'
import { Data, Chord, Bar, Note } from '../../types'
import * as Styles from './styles'

export type Props = {
  bars: Bar[]
  chords: Chord[]
  notes: Note[]
  data: Data[]
  beat: typeof Beats[number]
  baseNote: {
    symbol: string
    number: number
  }
}

export const ViewArea: React.FC<Props> = ({ bars, chords, notes, data, beat, baseNote }) => {
  const [selectedChordUuid, setSelectedChordUuid] = React.useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)

  const beatParser = React.useMemo(() => {
    return {
      molecular: Number(beat.split('/')[0]),
      denominator: Number(beat.split('/')[1]),
    }
  }, [beat])

  const baseNoteParser: number = React.useMemo(
    () => tonalNote.midi(`${baseNote.symbol}${baseNote.number}`),
    [baseNote]
  )

  const dialogContents: {
    symbol: string
    notes: { note: string; interval: string }[]
  } = React.useMemo(() => {
    if (selectedChordUuid === '') {
      return {
        symbol: '',
        notes: [],
      }
    }

    const targetChord = chords.find((chord) => chord.uuid === selectedChordUuid)
    const targetNote = notes.filter((note) => note.chordUuid === selectedChordUuid)

    if ('symbol' in targetChord) {
      const { intervals, symbol } = tonalChord.get(targetChord.symbol)

      return {
        symbol,
        notes: targetNote.map(({ note, index }) => ({
          note,
          interval: intervals[index],
        })),
      }
    } else {
      const symbol = `${targetChord.configurationSymbol}/${targetChord.baseSymbol}`

      const baseNote = targetNote[0].note
      const baseInterval = tonalChord.get(targetChord.baseSymbol).intervals[0]

      const configurationIntervals = tonalChord.get(targetChord.configurationSymbol).intervals

      return {
        symbol,
        notes: [
          { note: baseNote, interval: baseInterval },
          ...targetNote
            .filter((_, index) => index !== 0)
            .map(({ note, index }) => {
              return { note, interval: configurationIntervals[index] }
            }),
        ],
      }
    }
  }, [selectedChordUuid, chords, notes])

  const onClickChord = React.useCallback(
    (uuid: string) => () => {
      setIsDialogOpen(true)
      setSelectedChordUuid(uuid)
    },
    []
  )

  const onCloseDialog = React.useCallback(() => {
    setIsDialogOpen(false)
    setSelectedChordUuid('')
  }, [])

  return (
    <Styles.Main>
      <DialogContainer onDismiss={onCloseDialog}>
        {isDialogOpen && (
          <Dialog>
            <Heading>{dialogContents.symbol}</Heading>
            <Divider />
            <Content>
              {dialogContents.notes.map(({ note, interval }) => {
                return (
                  <Styles.NoteText key={note}>
                    <Text>{`${interval}: ${note}`}</Text>
                  </Styles.NoteText>
                )
              })}
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={onCloseDialog}>
                Close
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogContainer>
      <Styles.Bars>
        {bars.map((bar) => {
          const targetChords = chords.filter((chord) => chord.barUuid === bar.uuid)

          return (
            <Styles.Bar key={bar.uuid} beat={beatParser.denominator}>
              {targetChords.map((targetChord) => {
                const chordDuration = _.uniq(
                  data
                    .filter(({ chordUuid }) => chordUuid === targetChord.uuid)
                    .map(({ duration }) => duration)
                )
                const symbol =
                  'symbol' in targetChord
                    ? targetChord.symbol
                    : `${targetChord.configurationSymbol}/${targetChord.baseSymbol}`
                const targetNotes = notes.filter(({ chordUuid }) => chordUuid === targetChord.uuid)

                return (
                  <Styles.Chord
                    key={targetChord.uuid}
                    duration={(chordDuration[0] / 2) * 100}
                    onClick={onClickChord(targetChord.uuid)}
                  >
                    <Styles.Symbol>{symbol}</Styles.Symbol>
                    {targetNotes.map((targetNote) => {
                      const interval =
                        tonalNote.midi(
                          data.find(({ noteUuid }) => noteUuid === targetNote.uuid).note
                        ) - baseNoteParser

                      return <Styles.Note key={targetNote.uuid} position={interval}></Styles.Note>
                    })}
                  </Styles.Chord>
                )
              })}
            </Styles.Bar>
          )
        })}
      </Styles.Bars>
    </Styles.Main>
  )
}
