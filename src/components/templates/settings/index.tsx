import { TextField, RadioGroup, Radio, Form, Picker, Item } from '@adobe/react-spectrum'
import Cookies from 'js-cookie'
import React from 'react'
import { Beats } from '../../constants'
import { Title } from '../../molecules/title'
import { dictionary as _dictionary, options } from './constants'
import * as Styles from './styles'

type Props = {
  locale: string
}

export const Setting: React.FC<Props> = ({ locale }) => {
  const dictionary = React.useMemo(() => {
    return locale === 'ja' ? _dictionary.ja : _dictionary.en
  }, [locale])

  const makeDefaultValues = React.useMemo(() => {
    return {
      baseNoteSymbol: Cookies.get('baseNoteSymbol') ? Cookies.get('baseNoteSymbol') : 'C',
      baseNoteNumber: Cookies.get('baseNoteNumber') ? Cookies.get('baseNoteNumber') : '3',
      beat: Cookies.get('beat') ? Cookies.get('beat') : '4/4',
    }
  }, [])

  const onChangeBaseNoteSymbol = React.useCallback((baseNoteSymbol: React.ReactText) => {
    Cookies.set('baseNoteSymbol', String(baseNoteSymbol))
  }, [])

  const onChangeBaseNoteNumber = React.useCallback((baseNoteNumber: string) => {
    Cookies.set('baseNoteNumber', baseNoteNumber)
  }, [])

  const onChangeBeat = React.useCallback((beat: string) => {
    Cookies.set('beat', beat)
  }, [])

  return (
    <Styles.Main>
      <Title text={dictionary.title} />
      <Form>
        <Picker
          label={dictionary.baseNoteSymbol}
          items={options}
          onSelectionChange={onChangeBaseNoteSymbol}
          defaultSelectedKey={makeDefaultValues.baseNoteSymbol}
        >
          {(item) => <Item key={item.name}>{item.name}</Item>}
        </Picker>
        <TextField
          label={dictionary.baseNoteNumber}
          defaultValue={makeDefaultValues.baseNoteNumber}
          onChange={onChangeBaseNoteNumber}
          inputMode={'tel'}
        />
        <RadioGroup
          label={dictionary.beat}
          defaultValue={makeDefaultValues.beat}
          onChange={onChangeBeat}
        >
          {Beats.map((_beat) => (
            <Radio key={_beat} value={_beat}>
              {_beat}
            </Radio>
          ))}
        </RadioGroup>
      </Form>
    </Styles.Main>
  )
}
