export interface NielsenRow {
  number: number
  heuristic: string
  decision: string
  verification: string
}

export interface MotionTokensI18n {
  title: string
  subtitle: string
  lead: string
  back: string
  scopeLabel: string
  scope: string
  roleLabel: string
  role: string
  toolsLabel: string
  tools: string
  openFigmaAction: string
  nav: string[]
  studioTitle: string
  studioIntro: string
  architectureTitle: string
  architectureBody: string
  tiers: {
    primitives: { title: string; desc: string }
    semantics: { title: string; desc: string }
    components: { title: string; desc: string }
    reduced: { title: string; desc: string }
  }
  nielsenTitle: string
  nielsenIntro: string
  nielsenHeaders: [string, string, string, string]
  nielsenRows: NielsenRow[]
  componentsTitle: string
  componentsIntro: string
  componentList: {
    name: string
    pattern: string
    motionDesc: string
  }[]
  limitsTitle: string
  limitsBody: string
  limitsDisclaimer: string
}

export const motionTokensContent: { en: MotionTokensI18n; pl: MotionTokensI18n } = {
  en: {
    title: 'Motion Tokens Studio',
    subtitle: 'Systematizing UI motion into typed tokens, live dark devtools, and multi-format code exports.',
    lead: 'In interface design, motion is often treated as an arbitrary afterthought. This project establishes an authoritative motion design system with strict mathematical bounds, WAI-ARIA accessibility patterns, and multi-target exports.',
    back: 'Back to all projects',
    scopeLabel: 'Scope',
    scope: 'Motion Design System, Interactive Devtools Studio, Bilingual Case Study',
    roleLabel: 'Role',
    role: 'Design Engineering, Systems Architecture, Usability Inspection',
    toolsLabel: 'Stack & Tools',
    tools: 'React 19, TypeScript 5.7, Framer Motion 12, Tailwind CSS 3.4, Vitest, Figma MCP, Notion MCP',
    openFigmaAction: 'View Figma Motion Specification',
    nav: ['Studio', 'Architecture', 'Heuristics', 'Components', 'Limitations'],
    studioTitle: 'Interactive Devtools Studio',
    studioIntro: 'The studio below runs in real time inside this case study. Switch between the chaotic baseline and the tokenized system, test reduced motion overrides, and export generated code.',
    architectureTitle: 'Token Architecture & Hierarchy',
    architectureBody: 'Motion tokens are structured across three strict tiers with explicit reduced-motion fallbacks. Single source of truth in TypeScript guarantees complete type safety across designers and engineers.',
    tiers: {
      primitives: {
        title: 'Tier 1: Primitives',
        desc: 'Raw physics constants and measurements: durations (120ms, 200ms, 320ms), bezier curves (ease-out, ease-in-out), and physical springs (stiffness, damping, mass).'
      },
      semantics: {
        title: 'Tier 2: Semantics',
        desc: 'Intent-driven aliases pointing to primitives: enter, exit, feedback, emphasis. Semantic naming shields components from raw mathematical shifts.'
      },
      components: {
        title: 'Tier 3: Component Tokens',
        desc: 'Scoped tokens bound to individual components: modal dialog enter, tooltip fade, accordion height disclosure, dropdown opening.'
      },
      reduced: {
        title: 'Accessible Variants',
        desc: 'Every token declares an accessible reduced-motion fallback. Transform scaling and translation are eliminated, preserving swift opacity transitions.'
      }
    },
    nielsenTitle: 'Jakob Nielsen: 10 Usability Heuristics Audit',
    nielsenIntro: 'Every major architectural decision in the studio interface was evaluated against Jakob Nielsen’s 10 usability heuristics for user interface design.',
    nielsenHeaders: ['#', 'Nielsen Heuristic', 'Studio Implementation Decision', 'Verification in Code'],
    nielsenRows: [
      {
        number: 1,
        heuristic: 'Visibility of system status',
        decision: 'Real-time readout of active token values (ms, curve, spring parameters); animated live status indicator (READY / 60 FPS); copy buttons announce "Copied to clipboard" via aria-live="polite".',
        verification: 'Verified via live region assertions and state readouts in Studio.test.tsx.'
      },
      {
        number: 2,
        heuristic: 'Match between system and the real world',
        decision: 'Tokens use human semantic roles (Enter, Exit, Feedback, Emphasis) rather than raw math in the primary view; spring damping mirrors physical resistance.',
        verification: 'Verified by semantic tier structure and naming in tokens.ts.'
      },
      {
        number: 3,
        heuristic: 'User control and freedom',
        decision: 'Granular Reset button for each individual token; global Reset All to Defaults; Escape key immediately dismisses open modals and dropdowns without side-effects.',
        verification: 'Verified in keyboard handler and reset context unit tests.'
      },
      {
        number: 4,
        heuristic: 'Consistency and standards',
        decision: 'WAI-ARIA Authoring Practices keyboard patterns for all 4 components; standardized control rows across all token tiers; unified slider and numeric input pairing.',
        verification: 'Verified via Testing Library user-event assertions in components.test.tsx.'
      },
      {
        number: 5,
        heuristic: 'Error prevention',
        decision: 'Mathematical bounds clamping on all inputs: spring stiffness (20-1000), damping (1-100), mass (0.1-10), duration (0-2000ms); out-of-range values clamp smoothly with an inline warning.',
        verification: 'Verified in validate.test.ts clamping tests.'
      },
      {
        number: 6,
        heuristic: 'Recognition rather than recall',
        decision: 'Visual SVG curve preview updates interactively as bezier handles or spring numbers change; presets list displayed openly so users do not memorize physics constants.',
        verification: 'Verified by CurvePreview SVG render output.'
      },
      {
        number: 7,
        heuristic: 'Flexibility and efficiency of use',
        decision: 'One-click presets for quick evaluation; fine-grained numeric inputs and keyboard arrow adjustments for power users.',
        verification: 'Verified by input change and preset selection test suites.'
      },
      {
        number: 8,
        heuristic: 'Aesthetic and minimalist design',
        decision: 'High-contrast dark devtools interface with clear hierarchy: 3-column layout on desktop and clean tabbed navigation on mobile viewports.',
        verification: 'Verified across responsive viewport tests down to 320px.'
      },
      {
        number: 9,
        heuristic: 'Help users recognize, diagnose, and recover from errors',
        decision: 'Typing non-numeric or out-of-bounds text into number fields retains the last valid numeric state and displays a concise range hint.',
        verification: 'Verified by parseNumberInput fallback and error handling tests.'
      },
      {
        number: 10,
        heuristic: 'Help and documentation',
        decision: 'Contextual tooltip/hint for each token explaining when and why to use it; comprehensive bilingual documentation.',
        verification: 'Verified by token hint rendering in UI controls.'
      }
    ],
    componentsTitle: 'Accessible Preview Components',
    componentsIntro: 'Four interface components showcase the motion tokens under realistic interactive conditions. Each component follows strict WAI-ARIA standards.',
    componentList: [
      {
        name: 'Dialog Modal',
        pattern: 'WAI-ARIA Dialog (Modal)',
        motionDesc: 'Physical spring enter with backdrop opacity fade. Focus is trapped inside while open; Escape closes and restores focus to trigger button.'
      },
      {
        name: 'Contextual Tooltip',
        pattern: 'WAI-ARIA Tooltip',
        motionDesc: 'Subtle slide-up and fade-in using duration-fast. Triggered on mouse hover or keyboard focus; dismisses on Escape.'
      },
      {
        name: 'Disclosure Accordion',
        pattern: 'WAI-ARIA Disclosure',
        motionDesc: 'Height expansion curve with synchronized chevron rotation. Uses aria-expanded state and smooth height measurement.'
      },
      {
        name: 'Menu Dropdown',
        pattern: 'WAI-ARIA Menu Button',
        motionDesc: 'Snappy vertical menu disclosure with full ArrowDown/ArrowUp keyboard traversal, Enter selection, and Escape dismissal.'
      }
    ],
    limitsTitle: 'Explicit Limits & Evaluation Scope',
    limitsBody: 'To maintain academic and professional integrity, the scope and constraints of this work are stated plainly. The heuristics analysis represents an expert inspection and design rationale based on Nielsen’s established principles. It does not constitute a formal usability test with external human participants. Furthermore, Figma prototypes approximate spring physics using cubic-bezier curves, whereas the production studio computes exact physical harmonic oscillator equations.',
    limitsDisclaimer: 'Notice: This evaluation was conducted as an expert heuristic inspection and design rationale. It is not a claim of user testing with human participants. No automated tool replaces real user feedback.'
  },
  pl: {
    title: 'Motion Tokens Studio',
    subtitle: 'Systematyzacja ruchu UI w typowane tokeny, interaktywne studio devtools i wieloformatowy eksport kodu.',
    lead: 'W projektowaniu interfejsów ruch jest często traktowany jako przypadkowy dodatek. Ten projekt ustanawia kompletny system tokenów ruchu ze ścisłymi granicami matematycznymi, dostępnością WAI-ARIA i gotowym kodem eksportu.',
    back: 'Powrót do projektów',
    scopeLabel: 'Zakres',
    scope: 'System tokenów ruchu, interaktywne studio devtools, dwujęzyczne case study',
    roleLabel: 'Rola',
    role: 'Design Engineering, architektura systemowa, inspekcja użyteczności',
    toolsLabel: 'Technologie',
    tools: 'React 19, TypeScript 5.7, Framer Motion 12, Tailwind CSS 3.4, Vitest, Figma MCP, Notion MCP',
    openFigmaAction: 'Otwórz specyfikację w Figmie',
    nav: ['Studio', 'Architektura', 'Heurystyki', 'Komponenty', 'Ograniczenia'],
    studioTitle: 'Interaktywne Studio Devtools',
    studioIntro: 'Poniższe studio działa w czasie rzeczywistym wewnątrz tego case study. Przełączaj między chaotycznym stanem bazowym a spójnym systemem tokenów, testuj ograniczenie ruchu i eksportuj kod.',
    architectureTitle: 'Architektura i hierarchia tokenów',
    architectureBody: 'Tokeny ruchu są podzielone na trzy poziomy z jawnym wariantem dla trybu ograniczonego ruchu (reduced motion). Pojedyncze źródło prawdy w TypeScript gwarantuje bezpieczeństwo typów dla projektantów i programistów.',
    tiers: {
      primitives: {
        title: 'Poziom 1: Prymitywy',
        desc: 'Fizyczne stałe i wartości: czasy trwania (120ms, 200ms, 320ms), krzywe bezier (ease-out, ease-in-out) oraz sprężyny (stiffness, damping, mass).'
      },
      semantics: {
        title: 'Poziom 2: Semantyka',
        desc: 'Aliasy oparte na intencji użytkownika: wejście, wyjście, informacja zwrotna, akcent. Nazewnictwo semantyczne oddziela komponenty od surowych wartości liczbowych.'
      },
      components: {
        title: 'Poziom 3: Komponenty',
        desc: 'Dedykowane tokeny przypisane do konkretnych elementów: okno modalne, podpowiedź, rozwijany akordeon, menu wyboru.'
      },
      reduced: {
        title: 'Warianty dostępności',
        desc: 'Każdy token posiada zdefiniowane zachowanie dla preferencji ograniczonego ruchu. Skalowanie i przesunięcia są eliminowane na rzecz płynnego przejścia przezroczystości.'
      }
    },
    nielsenTitle: 'Jakob Nielsen: Audyt 10 Heurystyk Użyteczności',
    nielsenIntro: 'Każda kluczowa decyzja architektoniczna w interfejsie studia została poddana inspekcji według 10 heurystyk użyteczności Jakoba Nielsena.',
    nielsenHeaders: ['#', 'Heurystyka Nielsena', 'Decyzja wdrożona w studiu', 'Weryfikacja w kodzie'],
    nielsenRows: [
      {
        number: 1,
        heuristic: 'Widoczność stanu systemu',
        decision: 'Odczyt parametrów tokenów w czasie rzeczywistym (ms, krzywa, sprężyna); wskaźnik stanu na żywo (READY / 60 FPS); przyciski kopiowania zgłaszają status przez aria-live="polite".',
        verification: 'Zweryfikowano testami regionów live i odczytów w Studio.test.tsx.'
      },
      {
        number: 2,
        heuristic: 'Dopasowanie systemu do świata rzeczywistego',
        decision: 'Tokeny wykorzystują naturalne role semantyczne (Wejście, Wyjście, Odpowiedź, Akcent) zamiast surowych formuł w widoku głównym; tłumienie sprężyny odzwierciedla opór fizyczny.',
        verification: 'Zweryfikowano strukturą poziomów semantycznych w tokens.ts.'
      },
      {
        number: 3,
        heuristic: 'Kontrola i swoboda użytkownika',
        decision: 'Przycisk resetowania dla każdego pojedynczego tokena; globalne przywracanie wartości domyślnych; klawisz Escape zamyka okna i menu bez efektów ubocznych.',
        verification: 'Zweryfikowano w testach obsługi klawiatury i kontekstu.'
      },
      {
        number: 4,
        heuristic: 'Spójność i standardy',
        decision: 'Zgodność ze wzorcami klawiatury WAI-ARIA Authoring Practices dla wszystkich 4 komponentów; zunifikowane wiersze kontrolne; sparowane suwaki z polami numerycznymi.',
        verification: 'Zweryfikowano asercjami Testing Library user-event w components.test.tsx.'
      },
      {
        number: 5,
        heuristic: 'Zapobieganie błędom',
        decision: 'Matematyczne ograniczanie wartości na wszystkich wejściach: sztywność (20-1000), tłumienie (1-100), masa (0.1-10), czas (0-2000ms); wartości poza zakresem są korygowane z czytelnym ostrzeżeniem.',
        verification: 'Zweryfikowano w testach walidacji granic validate.test.ts.'
      },
      {
        number: 6,
        heuristic: 'Rozpoznawanie zamiast przypominania',
        decision: 'Wizualizacja SVG krzywej aktualizuje się interaktywnie przy modyfikacji parametrów; lista gotowych presetów jest stale widoczna bez konieczności pamiętania stałych fizycznych.',
        verification: 'Zweryfikowano renderowaniem ścieżek SVG w CurvePreview.'
      },
      {
        number: 7,
        heuristic: 'Elastyczność i efektywność',
        decision: 'Presety do szybkiej ewaluacji jednym kliknięciem; precyzyjne pola numeryczne i obsługa klawiszy strzałek dla zaawansowanych użytkowników.',
        verification: 'Zweryfikowano zestawem testów obsługi wejść i presetów.'
      },
      {
        number: 8,
        heuristic: 'Estetyka i umiar',
        decision: 'Wysokokontrastowy ciemny motyw devtools o jasnej hierarchii: 3 kolumny na dużych ekranach i przejrzyste zakładki na urządzeniach mobilnych.',
        verification: 'Zweryfikowano testami responsywności aż do szerokości 320px.'
      },
      {
        number: 9,
        heuristic: 'Pomoc w rozpoznawaniu i naprawianiu błędów',
        decision: 'Wpisanie wartości nieliczbowej lub poza zakresem zachowuje ostatni poprawny stan i wyświetla zwięzłą podpowiedź o dopuszczalnym przedziale.',
        verification: 'Zweryfikowano w testach odporności funkcji parseNumberInput.'
      },
      {
        number: 10,
        heuristic: 'Pomoc i dokumentacja',
        decision: 'Kontekstowa podpowiedź dla każdego tokena objaśniająca kiedy i jak go stosować; pełna dwujęzyczna dokumentacja.',
        verification: 'Zweryfikowano obecnością tekstów podpowiedzi w kontrolkach.'
      }
    ],
    componentsTitle: 'Dostępne komponenty podglądu',
    componentsIntro: 'Cztery komponenty interfejsu demonstrują działanie tokenów ruchu w realistycznych warunkach interakcji. Każdy z nich spełnia standardy dostępności WAI-ARIA.',
    componentList: [
      {
        name: 'Okno modalne (Dialog)',
        pattern: 'WAI-ARIA Dialog (Modal)',
        motionDesc: 'Fizyczne wejście sprężynowe z płynnym przyciemnieniem tła. Klawisz Tab zostaje uwięziony wewnątrz otwartego okna; Escape zamyka i przywraca focus.'
      },
      {
        name: 'Podpowiedź (Tooltip)',
        pattern: 'WAI-ARIA Tooltip',
        motionDesc: 'Subtelne wysunięcie w górę i pojawienie się w czasie duration-fast. Uruchamiane najechaniem myszy lub klawiaturą; zamykane klawiszem Escape.'
      },
      {
        name: 'Akordeon (Disclosure)',
        pattern: 'WAI-ARIA Disclosure',
        motionDesc: 'Płynna krzywa rozwijania wysokości ze zsynchronizowanym obrotem strzałki. Stan komunikowany przez atrybut aria-expanded.'
      },
      {
        name: 'Rozwijane menu (Dropdown)',
        pattern: 'WAI-ARIA Menu Button',
        motionDesc: 'Sprężyste pionowe rozwinięcie listy z pełną nawigacją klawiszami strzałek, wyborem przez Enter i zamykaniem klawiszem Escape.'
      }
    ],
    limitsTitle: 'Ograniczenia i zakres ewaluacji',
    limitsBody: 'W celu zachowania rzetelności zawodowej zakres i ograniczenia projektu zostały określone wprost. Analiza heurystyczna stanowi ekspercką inspekcję i uzasadnienie projektowe oparte na uznanych zasadach Jakoba Nielsena. Nie stanowi ona twierdzenia o przeprowadzeniu testów z udziałem zewnętrznych użytkowników. Ponadto prototypy w programie Figma przybliżają fizykę sprężyn za pomocą krzywych cubic-bezier, podczas gdy studio w kodzie oblicza dokładne równania fizycznego oscylatora harmonicznego.',
    limitsDisclaimer: 'Uwaga: Niniejsza ewaluacja została przeprowadzona jako ekspercka inspekcja heurystyczna i uzasadnienie projektowe. Nie stanowi ona twierdzenia o testach z użytkownikami. Żadne zautomatyzowane narzędzie nie zastępuje bezpośredniej weryfikacji z odbiorcami.'
  }
}
