import { Locale, ExcludeInit, ShouldReplaceText, LanguageObject } from '../../types'

export const switchLangText = <
  T extends LanguageObject | (LanguageObject & ShouldReplaceText),
  L extends ExcludeInit<Locale>,
  R extends T extends LanguageObject & ShouldReplaceText
    ? Record<T['replaceKeys'][number], unknown>
    : undefined
>(
  i18n: T,
  locale: L,
  replaceValue: R
): T[L] => {
  if (typeof replaceValue !== 'undefined') {
    for (const prop in replaceValue) {
      if (typeof i18n[locale] === 'undefined') {
        return i18n[locale]
      }
      return Object.prototype.hasOwnProperty.call(replaceValue, prop)
        ? i18n[locale].replace(new RegExp('{{' + prop + '}}', 'g'), String(replaceValue[prop]))
        : i18n[locale]
    }
  }
  return i18n[locale]
}
