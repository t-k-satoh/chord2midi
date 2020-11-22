import fs from 'fs'
import { Midi } from '@tonejs/midi'
import { Home } from '../src/pages/home'

type Score = {
  note: string
  time: number
  duration: number
}

export async function getStaticProps() {
  const midi = new Midi()
  const track = midi.addTrack()

  const test: Score[] = [
    { note: 'C3', time: 0, duration: 2 },
    { note: 'E3', time: 0, duration: 2 },
    { note: 'G3', time: 0, duration: 2 },
    { note: 'B3', time: 2, duration: 2 },
    { note: 'B3', time: 2, duration: 2 },
    { note: 'D4', time: 2, duration: 2 },
    { note: 'A3', time: 4, duration: 2 },
    { note: 'C#4', time: 4, duration: 2 },
    { note: 'E4', time: 4, duration: 2 },
    { note: 'G4', time: 4, duration: 2 },
    { note: 'D3', time: 6, duration: 2 },
    { note: 'F#3', time: 6, duration: 2 },
    { note: 'A3', time: 6, duration: 2 },
    { note: 'C4', time: 6, duration: 2 },
  ]

  test.forEach(({ note, time, duration }) => {
    track.addNote({ name: note, time, duration })
  })

  fs.writeFileSync('output.mid', new Buffer(midi.toArray()))

  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Home
