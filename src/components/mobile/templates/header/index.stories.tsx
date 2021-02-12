import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { MainHeader, Props } from '.'

const props: Omit<Props, 'onChangeIsShowNav'> = {
  version: 'v.0.1.0',
  isHome: true,
  isDarkMode: true,
  isDisabledDownLoad: true,
  isDisabledShare: true,
  isShowNav: false,
  value: 'C',
  beat: '4/4',
  midiNoteNumber: 3,
  chordSymbol: 'C',
  bpm: 120,
}

export default {
  title: generateTitle(base, true),
  component: MainHeader,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => <MainHeader {...args} />

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <MainHeader {...props} onChangeIsShowNav={action('onChangeIsShowNav')} />
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <MainHeader {...props} onChangeIsShowNav={action('onChangeIsShowNav')} />
  </Provider>
)
