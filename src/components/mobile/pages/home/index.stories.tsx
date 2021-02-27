import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { WithProvider } from '../../../../test/components/with-provider'
import { generateTitle } from '../../../../test/utils'
import { MobileHome, Props } from '.'

const props: Omit<Props, 'onChangeValue'> = {
  isDarkMode: true,
  value: 'C',
  chordSymbol: 'C',
  beat: '4/4',
  midiNoteNumber: 3,
  bpm: 120,
  locale: 'ja',
}

export default {
  title: generateTitle(base, true),
  component: MobileHome,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => (
  <WithProvider>
    <MobileHome {...args} />
  </WithProvider>
)

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <WithProvider>
      <MobileHome {...props} onChangeValue={action('onChangeValue')} />
    </WithProvider>
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <WithProvider>
      <MobileHome {...props} onChangeValue={action('onChangeValue')} />
    </WithProvider>
  </Provider>
)
