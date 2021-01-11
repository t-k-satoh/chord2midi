import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { BlankLink, Props } from '.'

export default {
  title: `/common/${BlankLink.name}`,
  component: BlankLink,
} as Meta

const Template: Story<Props> = (args) => <BlankLink {...args} />

const props: Props = {
  text: 'title',
  href: '/',
}

export const Component = Template.bind({})
Component.args = props
