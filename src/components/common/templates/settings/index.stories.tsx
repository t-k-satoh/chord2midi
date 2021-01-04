import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { Setting, Props } from '.'

export default {
  title: `/common/templates/${Setting.name}`,
  component: Setting,
  argTypes: { onChangeBaseNoteNumber: { action: 'clicked' } },
} as Meta

const Template: Story<Props> = (args) => <Setting {...args} />

const props: Props = {
  locale: 'ja',
  midiNoteNumber: 3,
  chordSymbol: 'C',
  beat: '4/4',
  onChangeBaseNoteNumber: (value) => {
    console.log(JSON.stringify(value))
  },
  onChangeBaseNoteSymbol: () => {
    console.log()
  },
  onChangeBeat: () => {
    console.log()
  },
}

export const Component = Template.bind({})
Component.args = props
