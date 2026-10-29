export type Easing = {
  type: 'bezier'
  points: [number, number, number, number]
}

export type Spring = {
  type: 'spring'
  stiffness: number
  damping: number
  mass: number
}

export type Duration = {
  type: 'duration'
  ms: number
}

export type TokenTier = 'primitive' | 'semantic' | 'component'

export type MotionToken = {
  id: string
  tier: TokenTier
  label: { en: string; pl: string }
  hint: { en: string; pl: string }
  value: Easing | Spring | Duration
  reduced: { type: 'duration'; ms: number }
  ref?: string
}

export const defaultTokens: MotionToken[] = [
  // Primitives: Durations
  {
    id: 'duration-fast',
    tier: 'primitive',
    label: { en: 'Duration Fast', pl: 'Czas krótki' },
    hint: {
      en: 'Quick micro-interactions such as button taps, icon states, and tooltips.',
      pl: 'Szybkie mikrointerakcje takie jak kliknięcia przycisków, ikony i podpowiedzi.'
    },
    value: { type: 'duration', ms: 120 },
    reduced: { type: 'duration', ms: 80 }
  },
  {
    id: 'duration-base',
    tier: 'primitive',
    label: { en: 'Duration Base', pl: 'Czas bazowy' },
    hint: {
      en: 'Standard UI transitions like dropdown disclosures and tab switches.',
      pl: 'Standardowe przejścia interfejsu jak rozwijane menu i przełączanie zakładek.'
    },
    value: { type: 'duration', ms: 200 },
    reduced: { type: 'duration', ms: 120 }
  },
  {
    id: 'duration-slow',
    tier: 'primitive',
    label: { en: 'Duration Slow', pl: 'Czas długi' },
    hint: {
      en: 'Large container layout expansions and full dialog transitions.',
      pl: 'Duże przekształcenia kontenerów i przejścia pełnych okien dialogowych.'
    },
    value: { type: 'duration', ms: 320 },
    reduced: { type: 'duration', ms: 150 }
  },
  // Primitives: Easings
  {
    id: 'ease-out',
    tier: 'primitive',
    label: { en: 'Ease Out', pl: 'Wygładzenie wyjściowe' },
    hint: {
      en: 'Decelerating curve for elements entering the screen or expanding.',
      pl: 'Krzywa zwalniająca dla elementów wchodzących na ekran lub rozwijających się.'
    },
    value: { type: 'bezier', points: [0.23, 1, 0.32, 1] },
    reduced: { type: 'duration', ms: 0 }
  },
  {
    id: 'ease-in-out',
    tier: 'primitive',
    label: { en: 'Ease In Out', pl: 'Wygładzenie symetryczne' },
    hint: {
      en: 'Smooth acceleration and deceleration for continuous repositioning.',
      pl: 'Płynne przyspieszanie i zwalnianie dla ciągłych zmian położenia.'
    },
    value: { type: 'bezier', points: [0.4, 0, 0.2, 1] },
    reduced: { type: 'duration', ms: 0 }
  },
  // Primitives: Springs
  {
    id: 'spring-snappy',
    tier: 'primitive',
    label: { en: 'Spring Snappy', pl: 'Sprężyna sprężysta' },
    hint: {
      en: 'High-responsiveness physical spring with minimal overshoot for interactive controls.',
      pl: 'Sprężyna o wysokiej responsywności z minimalnym przestawieniem dla elementów sterujących.'
    },
    value: { type: 'spring', stiffness: 300, damping: 28, mass: 1 },
    reduced: { type: 'duration', ms: 100 }
  },
  {
    id: 'spring-soft',
    tier: 'primitive',
    label: { en: 'Spring Soft', pl: 'Sprężyna miękka' },
    hint: {
      en: 'Gentle, forgiving spring for ambient cards and non-blocking overlays.',
      pl: 'Łagodna, miękka sprężyna dla kart tła i nienaruszających skupienia nakładek.'
    },
    value: { type: 'spring', stiffness: 180, damping: 22, mass: 1 },
    reduced: { type: 'duration', ms: 120 }
  },
  // Semantics
  {
    id: 'motion-enter',
    tier: 'semantic',
    label: { en: 'Semantic Enter', pl: 'Wejście semantyczne' },
    hint: {
      en: 'Universal enter transition token for incoming elements.',
      pl: 'Uniwersalny token wejścia dla pojawiających się elementów.'
    },
    value: { type: 'bezier', points: [0.23, 1, 0.32, 1] },
    reduced: { type: 'duration', ms: 120 },
    ref: 'ease-out'
  },
  {
    id: 'motion-exit',
    tier: 'semantic',
    label: { en: 'Semantic Exit', pl: 'Wyjście semantyczne' },
    hint: {
      en: 'Swift exit curve to avoid keeping the user waiting on dismiss.',
      pl: 'Szybkie wyjście, aby nie zatrzymywać użytkownika przy zamykaniu.'
    },
    value: { type: 'duration', ms: 120 },
    reduced: { type: 'duration', ms: 80 },
    ref: 'duration-fast'
  },
  {
    id: 'motion-feedback',
    tier: 'semantic',
    label: { en: 'Semantic Feedback', pl: 'Informacja zwrotna' },
    hint: {
      en: 'Spring physics feedback for direct user interactions.',
      pl: 'Fizyczna odpowiedź sprężynowa na bezpośrednią akcję użytkownika.'
    },
    value: { type: 'spring', stiffness: 300, damping: 28, mass: 1 },
    reduced: { type: 'duration', ms: 100 },
    ref: 'spring-snappy'
  },
  {
    id: 'motion-emphasis',
    tier: 'semantic',
    label: { en: 'Semantic Emphasis', pl: 'Wyróżnienie semantyczne' },
    hint: {
      en: 'Gentle spring for attention cues and subtle focus shifts.',
      pl: 'Łagodna sprężyna dla elementów wymagających uwagi.'
    },
    value: { type: 'spring', stiffness: 180, damping: 22, mass: 1 },
    reduced: { type: 'duration', ms: 120 },
    ref: 'spring-soft'
  },
  // Components
  {
    id: 'modal-enter',
    tier: 'component',
    label: { en: 'Modal Enter', pl: 'Pojawienie okna modalnego' },
    hint: {
      en: 'Physics spring for dialog scale and backdrop opacity.',
      pl: 'Fizyka sprężynowa dla skali okna dialogowego i przezroczystości tła.'
    },
    value: { type: 'spring', stiffness: 280, damping: 26, mass: 1 },
    reduced: { type: 'duration', ms: 150 },
    ref: 'spring-snappy'
  },
  {
    id: 'tooltip-enter',
    tier: 'component',
    label: { en: 'Tooltip Enter', pl: 'Pojawienie podpowiedzi' },
    hint: {
      en: 'Rapid slide and opacity fade for contextual hover text.',
      pl: 'Błyskawiczne pojawienie się tekstu kontekstowego po najechaniu.'
    },
    value: { type: 'duration', ms: 120 },
    reduced: { type: 'duration', ms: 60 },
    ref: 'duration-fast'
  },
  {
    id: 'accordion-expand',
    tier: 'component',
    label: { en: 'Accordion Expand', pl: 'Rozwinięcie akordeonu' },
    hint: {
      en: 'Smooth height expansion curve and chevron rotation.',
      pl: 'Płynna krzywa rozwijania wysokości i obrotu strzałki.'
    },
    value: { type: 'bezier', points: [0.23, 1, 0.32, 1] },
    reduced: { type: 'duration', ms: 100 },
    ref: 'ease-out'
  },
  {
    id: 'dropdown-open',
    tier: 'component',
    label: { en: 'Dropdown Open', pl: 'Otwarcie listy' },
    hint: {
      en: 'Snappy menu disclosure with vertical anchor.',
      pl: 'Szybkie otwarcie menu z zakotwiczeniem pionowym.'
    },
    value: { type: 'duration', ms: 150 },
    reduced: { type: 'duration', ms: 80 },
    ref: 'duration-base'
  }
]

export const chaoticTokens: MotionToken[] = [
  {
    id: 'duration-fast',
    tier: 'primitive',
    label: { en: 'Duration Fast', pl: 'Czas krótki' },
    hint: { en: 'Chaotic un-tokenized duration.', pl: 'Niespójny, przypadkowy czas trwania.' },
    value: { type: 'duration', ms: 90 },
    reduced: { type: 'duration', ms: 90 }
  },
  {
    id: 'duration-base',
    tier: 'primitive',
    label: { en: 'Duration Base', pl: 'Czas bazowy' },
    hint: { en: 'Chaotic un-tokenized duration.', pl: 'Niespójny, przypadkowy czas trwania.' },
    value: { type: 'duration', ms: 540 },
    reduced: { type: 'duration', ms: 540 }
  },
  {
    id: 'duration-slow',
    tier: 'primitive',
    label: { en: 'Duration Slow', pl: 'Czas długi' },
    hint: { en: 'Chaotic un-tokenized duration.', pl: 'Niespójny, przypadkowy czas trwania.' },
    value: { type: 'duration', ms: 850 },
    reduced: { type: 'duration', ms: 850 }
  },
  {
    id: 'ease-out',
    tier: 'primitive',
    label: { en: 'Ease Out', pl: 'Wygładzenie wyjściowe' },
    hint: { en: 'Linear, abrupt transition.', pl: 'Liniowe, skokowe przejście.' },
    value: { type: 'bezier', points: [0, 0, 1, 1] },
    reduced: { type: 'duration', ms: 0 }
  },
  {
    id: 'ease-in-out',
    tier: 'primitive',
    label: { en: 'Ease In Out', pl: 'Wygładzenie symetryczne' },
    hint: { en: 'Linear transition without ease.', pl: 'Liniowe przejście bez wygładzenia.' },
    value: { type: 'bezier', points: [0, 0, 1, 1] },
    reduced: { type: 'duration', ms: 0 }
  },
  {
    id: 'spring-snappy',
    tier: 'primitive',
    label: { en: 'Spring Snappy', pl: 'Sprężyna sprężysta' },
    hint: { en: 'Overdamped sluggish spring.', pl: 'Powolna, stłumiona sprężyna.' },
    value: { type: 'spring', stiffness: 60, damping: 40, mass: 2 },
    reduced: { type: 'duration', ms: 200 }
  },
  {
    id: 'spring-soft',
    tier: 'primitive',
    label: { en: 'Spring Soft', pl: 'Sprężyna miękka' },
    hint: { en: 'Sluggish spring.', pl: 'Niestabilna sprężyna.' },
    value: { type: 'spring', stiffness: 50, damping: 30, mass: 2 },
    reduced: { type: 'duration', ms: 200 }
  },
  {
    id: 'modal-enter',
    tier: 'component',
    label: { en: 'Modal Enter', pl: 'Pojawienie okna modalnego' },
    hint: { en: 'Abrupt linear jump.', pl: 'Liniowy, nagły skok okna.' },
    value: { type: 'duration', ms: 600 },
    reduced: { type: 'duration', ms: 200 }
  },
  {
    id: 'tooltip-enter',
    tier: 'component',
    label: { en: 'Tooltip Enter', pl: 'Pojawienie podpowiedzi' },
    hint: { en: 'Laggy tooltip delay.', pl: 'Opóźniona podpowiedź.' },
    value: { type: 'duration', ms: 450 },
    reduced: { type: 'duration', ms: 100 }
  },
  {
    id: 'accordion-expand',
    tier: 'component',
    label: { en: 'Accordion Expand', pl: 'Rozwinięcie akordeonu' },
    hint: { en: 'Stiff linear expansion.', pl: 'Sztywne liniowe rozwijanie.' },
    value: { type: 'duration', ms: 850 },
    reduced: { type: 'duration', ms: 150 }
  },
  {
    id: 'dropdown-open',
    tier: 'component',
    label: { en: 'Dropdown Open', pl: 'Otwarcie listy' },
    hint: { en: 'Abrupt dropdown toggle.', pl: 'Gwałtowne otwarcie menu.' },
    value: { type: 'duration', ms: 380 },
    reduced: { type: 'duration', ms: 120 }
  }
]
