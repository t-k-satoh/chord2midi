import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import { HowToUse, Props } from '.'

export default {
  title: HowToUse.name,
  component: HowToUse,
} as Meta

const Template: Story<Props> = (args) => <HowToUse {...args} />

const props: Props = {
  onClose: () => console.log('close'),
}

export const Component = Template.bind({})
Component.args = props
