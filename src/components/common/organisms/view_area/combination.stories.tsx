import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { Note as tonalNote } from '@tonaljs/tonal'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { generateTitle } from '../../../../test/utils'
import * as utils from '../../../../utils'
import { ViewArea, Props } from '.'

type CombinationType<P extends Record<string | number, unknown>, U = { [K in keyof P]: P[K][] }> = U

const options: CombinationType<Props> = {
  isIdling: [false, true],
  isDarkMode: [false, true],
  currentBarIndex: [1, 0, 10],
  currentBeatIndex: [1, 0, 10],
  beatCountProgress: [1, 0, 0.7],
  allData: [
    utils.makeAllData({ value: 'C', chordSymbol: 'C', beat: '4/4', midiNoteNumber: 3 }),
    utils.makeAllData({
      value: 'C#/D6 | C C/F A | E/F A B | A B C/D | A B | A B C | A | A B C D',
      chordSymbol: 'C',
      beat: '4/4',
      midiNoteNumber: 3,
    }),
    utils.makeAllData({
      value: 'C# | Error | C Error',
      chordSymbol: 'C',
      beat: '4/4',
      midiNoteNumber: 3,
    }),
  ],
  timeSignature: [4, 3],
  baseNote: [tonalNote.midi('C3')],
  onClick: [action('onClick')],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <div style={{ height: '100vh' }}>
            <ViewArea {...combinationProps} />
          </div>
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <div style={{ height: '100vh' }}>
            <ViewArea {...combinationProps} />
          </div>
        </Provider>
      </Combination>
    ))
)
