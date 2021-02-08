import { Provider } from '@adobe/react-spectrum'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { generateTitle } from '../../../../test/utils'
import { Indicator, Props } from '.'

const props: Props = {
  currentBar: 0,
  currentBeat: 0,
  bpm: 120,
  beat: '4/4',
}

export default {
  title: generateTitle(base, true),
  component: Indicator,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => <Indicator {...args} />

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <Indicator {...props} />
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <Indicator {...props} />
  </Provider>
)
