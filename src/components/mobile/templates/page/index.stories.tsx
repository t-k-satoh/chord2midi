import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import base from 'paths.macro'
import React from 'react'
import { WithProvider } from '../../../../test/components/with-provider'
import { generateTitle } from '../../../../test/utils'
import { Page, Props } from '.'

const props: Omit<Props, 'onCloseShowNav'> = {
  isDarkMode: true,
  isShowNav: false,
}

export default {
  title: generateTitle(base, true),
  component: Page,
  includeStories: /.*Story$/,
} as Meta

const Template: Story<Props> = (args) => (
  <WithProvider>
    <Page {...args} />
  </WithProvider>
)

export const DefaultStory = Template.bind({})
DefaultStory.args = props

export const DarkModeStory = (): JSX.Element => (
  <Provider colorScheme="dark">
    <WithProvider>
      <Page {...props} onCloseShowNav={action('onCloseShowNav')} />
    </WithProvider>
  </Provider>
)

export const LightModeStory = (): JSX.Element => (
  <Provider colorScheme="light">
    <WithProvider>
      <Page {...props} onCloseShowNav={action('onCloseShowNav')} />
    </WithProvider>
  </Provider>
)
