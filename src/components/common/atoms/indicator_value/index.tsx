import React from 'react'
import * as utils from '../../../../utils'
import * as CONSTANTS from './constants'
import * as Styles from './styles'

export type Props = {
  value: string | number
  title: string
}

type Values = {
  value: string
  isZero: boolean
}

export const IndicatorValue: React.ForwardRefExoticComponent<Props> = React.memo(
  function Component({ value, title }) {
    const newValues: Values[] = React.useMemo(() => {
      if (typeof value === 'string' && value.length <= 3) {
        return [
          {
            value,
            isZero: false,
          },
        ]
      }

      if (typeof value === 'string') {
        return [
          {
            value: CONSTANTS.ERROR_TEXT,
            isZero: false,
          },
        ]
      }

      const newValue = Math.floor(value)

      if (String(newValue).length > CONSTANTS.LIMIT) {
        return [
          {
            value: CONSTANTS.ERROR_TEXT,
            isZero: false,
          },
        ]
      }

      const zeros: Values[] = utils
        .addZero(value, CONSTANTS.LIMIT)
        .split('')
        .map((zero) => {
          return {
            value: zero,
            isZero: true,
          }
        })

      return [...zeros, { value: String(newValue), isZero: false }]
    }, [value])

    return (
      <Styles.Main>
        <Styles.Top>
          {newValues.map(({ value, isZero }, index) => {
            return isZero ? (
              <Styles.Zero key={index}>{value}</Styles.Zero>
            ) : (
              <Styles.Value key={index}>{value}</Styles.Value>
            )
          })}
        </Styles.Top>
        <Styles.Bottom>
          <Styles.Title>
            <Styles.TitleInner>{title}</Styles.TitleInner>
          </Styles.Title>
        </Styles.Bottom>
      </Styles.Main>
    )
  }
)
