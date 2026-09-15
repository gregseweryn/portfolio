import { useState, useEffect, lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ErrorBoundary } from './components/ErrorBoundary'
import { HomePage } from './pages/HomePage'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { commonContent } from './i18n'

const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const WorkPage = lazy(() => import('./pages/WorkPage').then(m => ({ default: m.WorkPage })))
const CaseStudyPortfolioDesk = lazy(() => import('./pages/CaseStudyPortfolioDesk').then(m => ({ default: m.CaseStudyPortfolioDesk })))
const CaseStudyTouristification = lazy(() => import('./pages/CaseStudyTouristification').then(m => ({ default: m.CaseStudyTouristification })))

const RouteSkeleton = () => (
  <div className="site-container py-14 min-h-[60vh] flex flex-col gap-6 animate-pulse">
    <div className="h-10 bg-zinc-100 rounded-xl w-1/3" />
    <div className="h-4 bg-zinc-100 rounded w-2/3 max-w-lg" />
    <div className="h-80 bg-zinc-50 border border-zinc-100 rounded-2xl w-full mt-4" />
  </div>
)

function AppContent() {
  const getPath = () => {
    const hash = window.location.hash.slice(1)
    if (hash && hash.startsWith('/')) {
      return hash
    }
    return window.location.pathname || '/'
  }

  const [currentPath, setCurrentPath] = useState(getPath())
  const { language } = useLanguage()
  const common = commonContent[language]

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath())
    }
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('hashchange', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('hashchange', handlePopState)
    }
  }, [])

  // Dynamic SEO metadata updates per route and language
  useEffect(() => {
    const metaMap: Record<string, { title: string; description: string }> = {
      '/': common.meta.home,
      '/about': common.meta.about,
      '/work': common.meta.work,
      '/work/portfolio-desk': common.meta.portfolioDesk,
      '/work/krakow-touristification': common.meta.touristification,
    }

    const meta = metaMap[currentPath] || {
      title: language === 'pl' ? 'Nie znaleziono strony. Grzegorz Seweryn' : 'Page Not Found — Grzegorz Seweryn',
      description: language === 'pl' ? 'Żądana strona nie istnieje lub została przeniesiona.' : 'The requested page does not exist or has moved.',
    }

    document.title = meta.title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description)
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title)
    }

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) {
      ogDesc.setAttribute('content', meta.description)
    }
  }, [currentPath, language, common])

  const navigate = (path: string) => {
    if (window.location.protocol === 'file:' || window.location.hash.startsWith('#/')) {
      window.location.hash = path
    } else {
      window.history.pushState({}, '', path)
    }
    setCurrentPath(path)
  }

  const renderPage = () => {
    switch (currentPath) {
      case '/about':
        return <AboutPage navigate={navigate} />
      case '/work':
        return <WorkPage navigate={navigate} />
      case '/work/portfolio-desk':
        return <CaseStudyPortfolioDesk navigate={navigate} />
      case '/work/krakow-touristification':
        return <CaseStudyTouristification navigate={navigate} />
      case '/':
        return <HomePage navigate={navigate} />
      default:
        return (
          <div className="site-container py-20 min-h-[50vh] flex flex-col items-start justify-center gap-4">
            <h1 className="text-3xl font-medium tracking-tight text-[#111111]">{common.notFound.title}</h1>
            <p className="text-sm text-zinc-600 max-measure text-pretty">
              {common.notFound.desc}
            </p>
            <button
              onClick={() => {
                navigate('/')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              {common.notFound.backHome}
            </button>
          </div>
        )
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#111111] selection:text-white">
        <Header currentPath={currentPath} navigate={navigate} />
        <ErrorBoundary>
          <Suspense fallback={<RouteSkeleton />}>
            {renderPage()}
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </MotionConfig>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
