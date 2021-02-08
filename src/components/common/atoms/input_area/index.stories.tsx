import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { InputArea, Props } from '.'

const props: Omit<Props, 'onChangeValue'> = {
  isError: false,
  canInput: true,
  value: '',
}

export default {
  title: generateTitle(base, true),
  component: InputArea,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => <InputArea {...args} />

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <InputArea {...props} onChangeValue={action('onChangeValue')} />
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <InputArea {...props} onChangeValue={action('onChangeValue')} />
  </Provider>
)
