import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { MobileHome, Props } from '.'

export default {
  title: `/mobile/${MobileHome.name}`,
  component: MobileHome,
} as Meta

const Template: Story<Props> = (args) => <MobileHome {...args} />

const props: Props = {
  currentValue: 'C',
  locale: 'ja',
  chordSymbol: 'C',
  beat: '4/4',
  midiNoteNumber: 3,
  isDarkMode: true,
  onChangeValue: (value: string) => {
    console.log(value)
  },
}

export const Component = Template.bind({})
Component.args = props
