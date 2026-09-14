import React, { useState, useEffect, useRef } from 'react'

interface HeaderProps {
  currentPath: string
  navigate: (path: string) => void
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const [isStickyVisible, setIsStickyVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsStickyVisible(true)
      } else {
        setIsStickyVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work', path: '/work' },
    { label: 'Contact', path: '#contact' },
  ]

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (path.startsWith('#')) {
      const el = document.getElementById(path.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-[#111111] focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-[#111111]"
      >
        Skip to content
      </a>

      {/* Static Top Header */}
      <header className="py-5 border-b border-gray-100 relative z-30">
        <div className="site-container flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <button
              onClick={(e) => handleLinkClick(e, '/')}
              className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded p-1 -m-1"
            >
              <p className="text-md font-medium leading-none text-[#111111]">Research by Greg.</p>
              <p className="block text-sm text-zinc-600 mt-1">Grzegorz Seweryn. Kraków, Poland</p>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-7">
            <nav aria-label="Main navigation" className="flex items-center gap-7 shrink-0">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path
                return (
                  <a
                    key={link.label}
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className={`transition-colors text-sm md:text-md py-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded ${
                      isActive ? 'text-[#111111] font-semibold underline underline-offset-4 decoration-2 decoration-[#111111]' : 'text-zinc-600 hover:text-[#111111]'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
            </nav>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="sm:hidden flex items-center">
            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="px-3 py-2 text-sm font-medium border border-zinc-200 rounded-lg text-[#111111] hover:bg-zinc-50 active:bg-zinc-100 transition-colors cursor-pointer flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Sticky Header on Scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-3 sm:py-4 transition-transform duration-300 ease-out shadow-xs ${
          isStickyVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="site-container flex flex-row items-center justify-between gap-2">
          <button
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded p-1 -m-1"
          >
            <span className="hidden sm:inline text-md font-medium text-[#111111]">Grzegorz Seweryn</span>
            <span className="inline sm:hidden text-md font-medium text-[#111111]">GS</span>
          </button>

          {/* Desktop Sticky Nav */}
          <nav aria-label="Sticky navigation" className="hidden sm:flex items-center gap-6 shrink-0">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path
              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`transition-colors text-sm md:text-md py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded ${
                    isActive ? 'text-[#111111] font-semibold underline underline-offset-4 decoration-2 decoration-[#111111]' : 'text-zinc-600 hover:text-[#111111]'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Mobile Sticky Menu Toggle */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="px-2.5 py-1.5 text-xs font-medium border border-zinc-200 rounded-lg text-[#111111] hover:bg-zinc-50 transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-200 sm:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 shadow-xl p-6 transition-transform duration-300 ease-in-out sm:hidden ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div>
            <p className="text-sm font-semibold text-[#111111]">Grzegorz Seweryn</p>
            <p className="text-xs text-zinc-500">Junior UX Researcher and Designer. Kraków</p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="p-2 -mr-2 text-zinc-600 hover:text-[#111111] hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col py-4 gap-1">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path
            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`flex items-center justify-between py-3 px-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                  isActive ? 'bg-zinc-100 text-[#111111]' : 'text-zinc-700 hover:bg-zinc-50 hover:text-[#111111]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>}
              </a>
            )
          })}
        </nav>

        <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2 text-xs text-zinc-500">
          <p>Email: <a href="mailto:grzegorz.seweryn99@gmail.com" className="text-zinc-800 underline">grzegorz.seweryn99@gmail.com</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/gseweryn/" target="_blank" rel="noopener noreferrer" className="text-zinc-800 underline">linkedin.com/in/gseweryn ↗</a></p>
        </div>
      </div>
    </>
  )
}
