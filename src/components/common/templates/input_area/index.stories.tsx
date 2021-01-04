import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { InputArea, Props } from '.'

export default {
  title: `/common/templates/${InputArea.name}`,
  component: InputArea,
} as Meta

const Template: Story<Props> = (args) => <InputArea {...args} />

const props: Props = {
  isError: true,
  value: 'Bm7 | D C',
  onChangeValue: () => {
    console.log()
  },
}

export const Component = Template.bind({})
Component.args = props
