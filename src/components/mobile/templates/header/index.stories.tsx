import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { MainHeader, Props } from '.'

export default {
  title: `/mobile/${MainHeader.name}`,
  component: MainHeader,
} as Meta

const Template: Story<Props> = (args) => <MainHeader {...args} />

const props: Props = {
  version: '0.1.0',
  isHome: false,
  isDarkMode: true,
  isDisabledDownLoad: false,
  isDisabledShare: false,
  isShowNav: false,
  onClickNav: (value) => {
    console.log({ value })
  },
  value: { value: 'C', from: 'init' },
  chordSymbol: { value: 'C', from: 'init' },
  beat: { value: '3/4', from: 'init' },
  midiNoteNumber: { value: 3, from: 'init' },
}

export const Component = Template.bind({})
Component.args = props
