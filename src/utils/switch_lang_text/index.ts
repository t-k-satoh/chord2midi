import { Locale } from '../../types'

export const switchLangText = <T extends Locale, J extends string, E extends string>(
  locale: T,
  jaText: J,
  enText: E
): J | E => {
  switch (locale) {
    case 'ja':
      return jaText
    case 'en':
      return enText
    case 'init':
      return enText

    default:
      return enText
  }
}
