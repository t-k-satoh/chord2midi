import { Provider } from '@adobe/react-spectrum'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import combinate from 'combinate'
import base from 'paths.macro'
import { Combination } from '../../../../test/components/combination'
import { WithProvider } from '../../../../test/components/with-provider'
import { generateTitle } from '../../../../test/utils'
import { Page, Props } from '.'

type CombinationType<P extends Record<string | number, unknown>, U = { [K in keyof P]: P[K][] }> = U

const options: CombinationType<Props> = {
  isDarkMode: [true, false],
  isShowNav: [true, false],
  onCloseShowNav: [action('onCloseShowNav')],
}

const combinations = combinate(options)

const stories = storiesOf(generateTitle(base, false), module)

combinations.forEach((combinationProps, index) =>
  stories
    .add(`light-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="light">
          <WithProvider>
            <Page {...combinationProps} />
          </WithProvider>
        </Provider>
      </Combination>
    ))
    .add(`dark-${index}`, () => (
      <Combination code={combinationProps}>
        <Provider colorScheme="dark">
          <WithProvider>
            <Page {...combinationProps} />
          </WithProvider>
        </Provider>
      </Combination>
    ))
)
