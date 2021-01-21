import { I18N } from '../../constants/i18n'
import { switchLangText } from '.'

test(switchLangText.name, () => {
  const test = switchLangText(I18N.UTILS.CLOSE, 'ja', null)
  const test1 = switchLangText(I18N.HOME.ERROR_BAR, 'ja', { ERROR_BAR_INDEX: 1 })

  expect(test).toEqual(I18N.UTILS.CLOSE.ja)
  expect(test1).toEqual('エラー: 1小節目')
})
