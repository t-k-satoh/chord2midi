import { Provider } from '@adobe/react-spectrum'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { WithProvider } from '../../../../test/components/with-provider'
import { generateContainerTitle } from '../../../../test/utils'
import { PageContainer } from '.'

export default {
  title: generateContainerTitle(base),
  component: PageContainer,
  includeStories: /.*Story$/,
} as Meta

const Template: Story = (args) => (
  <WithProvider>
    <PageContainer {...args} />
  </WithProvider>
)

export const DefaultStory = Template.bind({})
DefaultStory.args = {}

export const DarkModeStory = (): JSX.Element => (
  <WithProvider>
    <Provider colorScheme="dark">
      <PageContainer />
    </Provider>
  </WithProvider>
)

export const LightModeStory = (): JSX.Element => (
  <WithProvider>
    <Provider colorScheme="light">
      <PageContainer />
    </Provider>
  </WithProvider>
)
