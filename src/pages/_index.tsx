import fs from 'fs'
import { Chord } from '@tonaljs/tonal'
import { Midi } from '@tonejs/midi'
import Head from 'next/head'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

export async function getStaticProps() {
  const ch = Chord.get('Cmaj7')

  console.log(ch.notes)
  const midi = new Midi()
  // add a track
  const track = midi.addTrack()

  const test = [
    {
      note: 'Cb3',
      time: 0,
      duration: 2,
    },
    {
      note: 'Eb4',
      time: 0,
      duration: 2,
    },
    {
      note: 'Gb4',
      time: 0,
      duration: 2,
    },
    {
      note: 'Bb4',
      time: 0,
      duration: 2,
    },
    {
      note: 'Db3',
      time: 2,
      duration: 2,
    },
    {
      note: 'F4',
      time: 2,
      duration: 2,
    },
    {
      note: 'Ab4',
      time: 2,
      duration: 2,
    },
    {
      note: 'Bb3',
      time: 4,
      duration: 2,
    },
    {
      note: 'Db4',
      time: 4,
      duration: 2,
    },
    {
      note: 'F4',
      time: 4,
      duration: 2,
    },
    {
      note: 'Ab4',
      time: 4,
      duration: 2,
    },
    {
      note: 'Eb3',
      time: 6,
      duration: 2,
    },
    {
      note: 'Gb4',
      time: 6,
      duration: 2,
    },
    {
      note: 'Bb4',
      time: 6,
      duration: 2,
    },
  ]

  test.forEach(({ note, time, duration }) => {
    track.addNote({ name: note, time, duration })
  })

  // write the output
  fs.writeFileSync('output.mid', new Buffer(midi.toArray()))
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

const TextArea = styled.textarea`
  height: 28px;
  width: 400px;
`

export default function Home() {
  const [currentValue, setCurrentValue] = React.useState<string>('')

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { currentTarget } = event

      setCurrentValue(currentTarget.value.replace(/\r?\n/g, '|'))
    },
    [setCurrentValue]
  )

  React.useEffect(() => {
    const test = []
    const bars = currentValue.split('|').map((bar) => bar.trim())
    const withTime = bars.map((bar, index) => {
      return {
        bar,
        time: index * 2,
      }
    })
    withTime.forEach(({ bar, time }) => {
      const _bars = bar.split(' ')
      const inner = _bars.length
      let duration = 2 / inner

      if (inner === 3) {
        duration = 2 / 4
      }

      _bars.forEach((__bar, index) => {
        if (__bar === '') {
          return
        }

        const { notes } = Chord.get(__bar)

        notes.forEach((note, noteIndex) => {
          test.push({
            note: `${note}${noteIndex === 0 ? 3 : 4}`,
            time: time + duration * index,
            duration: inner === 3 && index + 1 === _bars.length ? 1 : duration,
          })
        })
      })
    })

    console.log(test)
  }, [currentValue])

  return (
    <>
      <Head>
        <title>Hello, world!</title>
      </Head>
      <Container>
        <GlobalStyle />
        <TextArea onChange={onChange} />
        <p>{currentValue}</p>
      </Container>
    </>
  )
}
