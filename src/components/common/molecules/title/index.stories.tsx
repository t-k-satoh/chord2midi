import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { Title, Props } from '.'

export default {
  title: `/common/${Title.name}`,
  component: Title,
} as Meta

const Template: Story<Props> = (args) => <Title {...args} />

const props: Props = {
  text: 'title',
}

export const Component = Template.bind({})
Component.args = props
