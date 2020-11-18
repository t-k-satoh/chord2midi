import { Chord } from '@tonaljs/tonal'
import { Midi } from '@tonejs/midi'
// import fs from 'fs'

export async function getStaticProps() {
  const ch = Chord.get('Cmaj7')

  console.log(ch.notes)
  const midi = new Midi()
  // add a track
  const track = midi.addTrack()

  ch.notes.forEach((note) => {
    track.addNote({ name: `${note}3`, time: 0, duration: 2 })
    track.addNote({ name: `${note}4`, time: 2, duration: 2 })
    track.addNote({ name: `${note}5`, time: 4, duration: 2 })
  })

  // write the output
  //fs.writeFileSync("output.mid", new Buffer(midi.toArray()))
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default function Home() {
  return <div>テストだよーん</div>
}
