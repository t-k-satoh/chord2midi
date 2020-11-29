import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import { InputArea, Props } from '.'

export default {
  title: InputArea.name,
  component: InputArea,
  argTypes: { onChangeChords: { action: 'clicked' } },
} as Meta

const Template: Story<Props> = (args) => <InputArea {...args} />

const props: Props = {
  baseNoteNumber: 4,
  beat: '4/4',
  onChangeChords: (arg) => console.log(arg),
  onChangeData: (arg) => console.log(arg),
  onError: (arg) => console.log(arg),
}

export const Component = Template.bind({})
Component.args = props
