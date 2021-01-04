import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'

import { Loading, Props } from '.'

export default {
  title: `/common/templates/${Loading.name}`,
  component: Loading,
} as Meta

const Template: Story<Props> = (args) => <Loading {...args} />

const props: Props = {
  isLoading: true,
  children: <div>Render!!</div>,
}

export const Component = Template.bind({})
Component.args = props
