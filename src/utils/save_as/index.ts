import { Midi } from '@tonejs/midi'
import { saveAs } from 'file-saver'
import { v4 as uuidv4 } from 'uuid'
import { Data } from '../../types'

export const saveMIDIFile = (data: Data[], name?: string): void => {
  const midi = new Midi()
  const track = midi.addTrack()

  data.forEach(({ note, time, duration }) => {
    track.addNote({ name: note, time, duration })
  })

  const blob = new Blob([midi.toArray().buffer], { type: 'audio/midi' })

  saveAs(blob, `${name ?? uuidv4()}.midi`)
}
