import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { Setting, Props } from '.'

const props: Omit<
  Props,
  | 'onChangeBaseNoteSymbol'
  | 'onChangeBaseNoteNumber'
  | 'onChangeBeat'
  | 'onChangeIsDarkMode'
  | 'onChangeBPM'
  | 'onChangeLanguage'
> = {
  locale: 'ja',
  chordSymbol: 'A',
  beat: '4/4',
  midiNoteNumber: 35,
  isDarkMode: true,
  bpm: 120,
}

export default {
  title: `${generateTitle(base, true)}`,
  component: Setting,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => <Setting {...args} />

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <Setting
      {...props}
      onChangeBaseNoteSymbol={action('onChangeBaseNoteSymbol')}
      onChangeBaseNoteNumber={action('onChangeBaseNoteNumber')}
      onChangeBeat={action('onChangeBeat')}
      onChangeIsDarkMode={action('onChangeIsDarkMode')}
      onChangeBPM={action('onChangeBPM')}
      onChangeLanguage={action('onChangeLanguage')}
    />
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <Setting
      {...props}
      onChangeBaseNoteSymbol={action('onChangeBaseNoteSymbol')}
      onChangeBaseNoteNumber={action('onChangeBaseNoteNumber')}
      onChangeBeat={action('onChangeBeat')}
      onChangeIsDarkMode={action('onChangeIsDarkMode')}
      onChangeBPM={action('onChangeBPM')}
      onChangeLanguage={action('onChangeLanguage')}
    />
  </Provider>
)
