import { Provider } from '@adobe/react-spectrum'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { Props } from './types'
import { Loading } from '.'

const props: Props = {
  isLoading: true,
  isDarkMode: true,
}

export default {
  title: generateTitle(base, true),
  component: Loading,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => <Loading {...args} />

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <Loading {...props} />
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <Loading {...props} isDarkMode={false} />
  </Provider>
)
