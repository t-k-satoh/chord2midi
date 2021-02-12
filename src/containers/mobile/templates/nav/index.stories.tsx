import { Provider } from '@adobe/react-spectrum'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { WithProvider } from '../../../../test/components/with-provider'
import { generateContainerTitle } from '../../../../test/utils'
import { NavContainer } from '.'

export default {
  title: generateContainerTitle(base),
  component: NavContainer,
  includeStories: /.*Story$/,
} as Meta

const Template: Story = (args) => (
  <WithProvider>
    <NavContainer {...args} />
  </WithProvider>
)

export const DefaultStory = Template.bind({})
DefaultStory.args = {}

export const DarkModeStory = (): JSX.Element => (
  <WithProvider>
    <Provider colorScheme="dark">
      <NavContainer />
    </Provider>
  </WithProvider>
)

export const LightModeStory = (): JSX.Element => (
  <WithProvider>
    <Provider colorScheme="light">
      <NavContainer />
    </Provider>
  </WithProvider>
)
