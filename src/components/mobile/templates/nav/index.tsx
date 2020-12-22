import { Text } from '@adobe/react-spectrum'
import Email from '@spectrum-icons/workflow/Email'
import Help from '@spectrum-icons/workflow/Help'
import Home from '@spectrum-icons/workflow/Home'
import Info from '@spectrum-icons/workflow/Info'
import Settings from '@spectrum-icons/workflow/Settings'
import Link from 'next/link'

import React from 'react'
import * as Styles from './styles'

export type Props = {
  locale: string
  version: string
}

export const Nav: React.FC<Props> = ({ locale, version }) => {
  const navList: { label: string; path: string; key: string }[] = React.useMemo(() => {
    return [
      { label: locale === 'ja' ? 'ホーム' : 'Home', path: '/', key: 'home' },
      { label: locale === 'ja' ? '設定' : 'Settings', path: '/settings', key: 'settings' },
      { label: locale === 'ja' ? '使い方' : 'How to use', path: '/how_to_use', key: 'how_to_use' },
      { label: locale === 'ja' ? 'お問い合わせ' : 'Contact', path: '/contact', key: 'contact' },
      {
        label: locale === 'ja' ? '仕様' : 'Specifications',
        path: '/specifications',
        key: 'specifications',
      },
    ]
  }, [locale])

  const generateIcon = React.useCallback((key: string): JSX.Element => {
    const size = 20

    switch (key) {
      case 'home':
        return <Home width={size} />

      case 'settings':
        return <Settings width={size} />

      case 'how_to_use':
        return <Help width={size} />

      case 'contact':
        return <Email width={size} />

      case 'specifications':
        return <Info width={size} />

      default:
        break
    }

    return <Settings width={size} />
  }, [])

  return (
    <Styles.Main>
      <Styles.NavWrap>
        {navList.map(({ label, path, key }) => {
          return (
            <Styles.NavChild key={key}>
              <Link prefetch href={path} passHref>
                <Styles.NavChildContents>
                  <Styles.Icon>{generateIcon(key)}</Styles.Icon>
                  <Styles.Label>
                    <Text>{label}</Text>
                  </Styles.Label>
                </Styles.NavChildContents>
              </Link>
            </Styles.NavChild>
          )
        })}
      </Styles.NavWrap>
      <Styles.Version>
        <Styles.VersionText>{`Chords to MIDI v.${version}`}</Styles.VersionText>
      </Styles.Version>
    </Styles.Main>
  )
}
