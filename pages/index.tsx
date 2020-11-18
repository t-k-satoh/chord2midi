import { Chord } from '@tonaljs/tonal'
import { Midi } from '@tonejs/midi'
import Head from 'next/head'
import styled, { createGlobalStyle } from 'styled-components'

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

const GlobalStyle = createGlobalStyle`
 h1 {
   font-size: 4rem;
 }
`
const Container = styled.div`
  text-align: center;
`

export default function Home() {
  return (
    <>
      <Head>
        <title>Hello, world!</title>
      </Head>
      <Container>
        <GlobalStyle />
        <h1>Hello, world!</h1>
      </Container>
    </>
  )
}
