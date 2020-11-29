import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import { Setting, Props } from '.'

export default {
  title: Setting.name,
  component: Setting,
} as Meta

const Template: Story<Props> = (args) => <Setting {...args} />

const props: Props = {
  beat: '4/4',
  baseNote: 4,
  isStringsMode: true,
  onChangeBaseNote: (arg) => console.log(arg),
  onChangeBeat: (arg) => console.log(arg),
  onChangeStringsMode: (arg) => console.log(arg),
  onClose: () => console.log('close'),
}

export const Component = Template.bind({})
Component.args = props
