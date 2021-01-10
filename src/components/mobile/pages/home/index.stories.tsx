import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { MobileHome, Props } from '.'

export default {
  title: `/mobile/${MobileHome.name}`,
  component: MobileHome,
} as Meta

const Template: Story<Props> = (args) => <MobileHome {...args} />

const props: Props = {
  value: { value: 'C', from: 'init' },
  chordSymbol: { value: 'C', from: 'init' },
  beat: { value: '3/4', from: 'init' },
  midiNoteNumber: { value: 3, from: 'init' },
  onChangeValue: (value: string) => {
    console.log(value)
  },
  locale: 'en',
}

export const Component = Template.bind({})
Component.args = props
