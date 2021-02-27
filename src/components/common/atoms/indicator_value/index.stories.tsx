import { Provider } from '@adobe/react-spectrum'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { Props } from './types'
import { IndicatorValue } from '.'

const props: Props = {
  value: 120,
  title: 'Title',
}

export default {
  title: generateTitle(base, true),
  component: IndicatorValue,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => <IndicatorValue {...args} />

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <IndicatorValue {...props} />
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <IndicatorValue {...props} />
  </Provider>
)
