import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { MobileHowToUse, Props } from '.'

export default {
  title: `/mobile/${MobileHowToUse.name}`,
  component: MobileHowToUse,
} as Meta

const Template: Story<Props> = (args) => <MobileHowToUse {...args} />

const props: Props = {
  locale: 'en',
}

export const Component = Template.bind({})
Component.args = props
