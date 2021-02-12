import { Provider } from '@adobe/react-spectrum'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { WithProvider } from '../../../../test/components/with-provider'
import { generateContainerTitle } from '../../../../test/utils'
import { HeaderContainer } from '.'

export default {
  title: generateContainerTitle(base),
  component: HeaderContainer,
  includeStories: /.*Story$/,
} as Meta

const Template: Story = (args) => (
  <WithProvider>
    <HeaderContainer {...args} />
  </WithProvider>
)

export const DefaultStory = Template.bind({})
DefaultStory.args = {}

export const DarkModeStory = (): JSX.Element => (
  <WithProvider>
    <Provider colorScheme="dark">
      <HeaderContainer />
    </Provider>
  </WithProvider>
)

export const LightModeStory = (): JSX.Element => (
  <WithProvider>
    <Provider colorScheme="light">
      <HeaderContainer />
    </Provider>
  </WithProvider>
)
