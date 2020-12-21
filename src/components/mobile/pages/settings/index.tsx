import React from 'react'
import { Setting } from '../../../templates/settings'
import { Frame } from '../../templates/frame'
import { Page } from '../../templates/page'

type Props = {
  locale: string
}

export const MobileSetting: React.FC<Props> = ({ locale }) => {
  return (
    <Page locale={locale}>
      <Frame>
        <Setting locale={locale} />
      </Frame>
    </Page>
  )
}
