import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'pl'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isPl: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Check URL query parameter ?lang=pl or ?lang=en
    try {
      const params = new URLSearchParams(window.location.search)
      const urlLang = params.get('lang')
      if (urlLang === 'pl' || urlLang === 'en') {
        return urlLang
      }
      // Also check hash query e.g. #/about?lang=pl
      if (window.location.hash.includes('lang=pl')) {
        return 'pl'
      }
    } catch {
      // ignore in non-browser env
    }

    // 2. Check localStorage
    try {
      const saved = localStorage.getItem('portfolio_lang')
      if (saved === 'pl' || saved === 'en') {
        return saved
      }
    } catch {
      // ignore
    }

    // 3. Default to 'en'
    return 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('portfolio_lang', lang)
      document.documentElement.lang = lang

      // Update URL query param cleanly without reload
      const url = new URL(window.location.href)
      if (lang === 'pl') {
        url.searchParams.set('lang', 'pl')
      } else {
        url.searchParams.delete('lang')
      }
      window.history.replaceState({}, '', url.toString())
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    try {
      document.documentElement.lang = language
    } catch {
      // ignore
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isPl: language === 'pl' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
