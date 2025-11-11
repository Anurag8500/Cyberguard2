import { i18n } from 'next-i18next'

export const changeLanguage = (locale: string) => {
  if (i18n) {
    i18n.changeLanguage(locale)
  }
}

export const getCurrentLanguage = () => {
  return i18n?.language || 'en'
}