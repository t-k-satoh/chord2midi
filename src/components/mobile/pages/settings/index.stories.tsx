import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { MobileSetting, Props } from '.'

export default {
  title: `/mobile/${MobileSetting.name}`,
  component: MobileSetting,
} as Meta

const Template: Story<Props> = (args) => <MobileSetting {...args} />

const props: Props = {
  locale: 'ja',
  midiNoteNumber: {
    value: 3,
    from: 'app',
  },
  chordSymbol: {
    value: 'C',
    from: 'app',
  },
  beat: {
    value: '4/4',
    from: 'app',
  },
  isDarkMode: {
    value: true,
    from: 'app',
  },
  onChangeBaseNoteNumber: (value) => {
    console.log(JSON.stringify(value))
  },
  onChangeBaseNoteSymbol: () => {
    console.log()
  },
  onChangeBeat: () => {
    console.log()
  },
  onChangeIsDarkMode: () => {
    console.log()
  },
}

export const Component = Template.bind({})
Component.args = props
