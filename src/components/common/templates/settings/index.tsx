import { TextField, RadioGroup, Radio, Form, Picker, Item, Switch } from '@adobe/react-spectrum'
import { useRouter } from 'next/router'
import React from 'react'
import { BEAT, CHORD_SYMBOL, INIT, PAGE_TITLES, EN, JA } from '../../../../constants'
import { I18N } from '../../../../constants/i18n'
import { ChordSymbol, Beat, MIDINoteNumber, Locale, ExcludeInit } from '../../../../types'
import * as utils from '../../../../utils'
import { Title } from '../../molecules/title'
import { dictionary as _dictionary, options } from './constants'
import * as Styles from './styles'

export type Props = {
  locale: ExcludeInit<Locale>
  chordSymbol: ExcludeInit<ChordSymbol>
  beat: ExcludeInit<Beat>
  midiNoteNumber: ExcludeInit<MIDINoteNumber>
  isDarkMode: boolean
  onChangeBaseNoteSymbol: (baseNoteSymbol: ChordSymbol) => void
  onChangeBaseNoteNumber: (baseNoteNumber: MIDINoteNumber) => void
  onChangeBeat: (beat: Beat) => void
  onChangeIsDarkMode: (isDarkMode: boolean) => void
}

export const Setting: React.FC<Props> = React.memo(function Component({
  locale,
  chordSymbol,
  beat,
  midiNoteNumber,
  isDarkMode,
  onChangeBaseNoteSymbol,
  onChangeBaseNoteNumber,
  onChangeBeat,
  onChangeIsDarkMode,
}) {
  const router = useRouter()

  const title = React.useMemo(() => PAGE_TITLES[router.asPath.split('/')[1]][locale], [
    router.asPath,
    locale,
  ])
  const dictionary = React.useMemo(() => (locale === JA ? _dictionary.ja : _dictionary.en), [
    locale,
  ])
  const langs: { id: Locale; value: string }[] = React.useMemo(
    () => [
      { id: EN, value: 'English' },
      { id: JA, value: '日本語' },
    ],
    []
  )

  const changeHandlerBaseNoteSymbol = React.useCallback(
    (baseNoteSymbol: string) => {
      const _baseNoteSymbol = baseNoteSymbol as ChordSymbol

      if (_baseNoteSymbol === INIT) {
        return
      }

      if (CHORD_SYMBOL.includes(_baseNoteSymbol)) {
        onChangeBaseNoteSymbol(_baseNoteSymbol)
      }
    },
    [onChangeBaseNoteSymbol]
  )

  const changeHandlerBaseNoteNumber = React.useCallback(
    (baseNoteNumber: string) => {
      onChangeBaseNoteNumber(Number(baseNoteNumber))
    },
    [onChangeBaseNoteNumber]
  )

  const changeHandlerBeat = React.useCallback(
    (beat: string) => {
      const _beat = beat as Props['beat']

      if (BEAT.includes(_beat)) {
        onChangeBeat(_beat)
      }
    },
    [onChangeBeat]
  )

  const changeLanguage = React.useCallback(
    (locale: Locale) => {
      router.push(router.asPath, router.asPath, { locale })
    },
    [router]
  )

  const changeIsDarkMode = React.useCallback(
    (isDarkMode: boolean) => {
      onChangeIsDarkMode(isDarkMode)
    },
    [onChangeIsDarkMode]
  )

  return (
    <Styles.Main>
      <Title text={title} />
      <Form>
        <Picker
          label={dictionary.baseNoteSymbol}
          items={options}
          onSelectionChange={changeHandlerBaseNoteSymbol}
          defaultSelectedKey={chordSymbol}
          isDisabled
        >
          {(item) => <Item key={item.name}>{item.name}</Item>}
        </Picker>
        <TextField
          label={dictionary.baseNoteNumber}
          defaultValue={String(midiNoteNumber)}
          onChange={changeHandlerBaseNoteNumber}
          inputMode={'tel'}
          validationState={'valid'}
          isDisabled
        />
        <RadioGroup label={dictionary.beat} defaultValue={beat} onChange={changeHandlerBeat}>
          {BEAT.map((_beat) => (
            <Radio key={_beat} value={_beat}>
              {_beat}
            </Radio>
          ))}
        </RadioGroup>
        <RadioGroup label={dictionary.lang} defaultValue={locale} onChange={changeLanguage}>
          {langs.map(({ id, value }) => (
            <Radio key={id} value={id}>
              {value}
            </Radio>
          ))}
        </RadioGroup>
        <Switch defaultSelected={isDarkMode} onChange={changeIsDarkMode}>
          {utils.switchLangText(I18N.SETTINGS.DARK_MODE, locale, null)}
        </Switch>
      </Form>
    </Styles.Main>
  )
})
