import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { ViewArea, Props } from '.'

export default {
  title: `/common/${ViewArea.name}`,
  component: ViewArea,
} as Meta

const Template: Story<Props> = (args) => <ViewArea {...args} />

const props: Props = {
  value: 'Bm7 | D',
  beat: '4/4',
  baseNote: {
    symbol: 'C',
    number: 3,
  },
}

export const Component = Template.bind({})
Component.args = props