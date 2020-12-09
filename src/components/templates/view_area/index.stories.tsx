import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'
import { makeAllData } from '../../templates/input_area/utils'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import { ViewArea, Props } from '.'

export default {
  title: ViewArea.name,
  component: ViewArea,
} as Meta

const Template: Story<Props> = (args) => <ViewArea {...args} />

const props: Props = {
  ...makeAllData('C#', 3, '4/4'),
  beat: '4/4',
  baseNote: {
    symbol: 'C',
    number: 3,
  },
}

export const Component = Template.bind({})
Component.args = props
