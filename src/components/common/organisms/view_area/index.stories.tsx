import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Note as tonalNote } from '@tonaljs/tonal'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import * as utils from '../../../../utils'
import { ViewArea, Props } from '.'

const value = 'C'

const props: Omit<Props, 'onClick'> = {
  isIdling: false,
  isDarkMode: true,
  currentBarIndex: 1,
  currentBeatIndex: 1,
  beatCountProgress: 0.8,
  allData: utils.makeAllData({ value, chordSymbol: 'C', beat: '4/4', midiNoteNumber: 3 }),
  timeSignature: 4,
  baseNote: tonalNote.midi('C3'),
}

export default {
  title: generateTitle(base, true),
  component: ViewArea,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => (
  <div style={{ height: '100vh' }}>
    <ViewArea {...args} />
  </div>
)

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <div style={{ height: '100vh' }}>
      <ViewArea {...props} onClick={action('onClick')} />
    </div>
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <div style={{ height: '100vh' }}>
      <ViewArea {...props} onClick={action('onClick')} />
    </div>
  </Provider>
)
