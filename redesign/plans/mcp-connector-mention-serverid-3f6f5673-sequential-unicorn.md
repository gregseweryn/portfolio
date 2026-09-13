# Makieta: świeższy layout portfolio badacza UX

## Context

Grzegorz prowadzi portfolio badacza UX (grzegorzseweryn.pl, repo `gregseweryn/portfolio`
w Next.js). Obecny layout jest dopracowany, ale dość klasyczny: hero → pasek metod →
featured study + index → ciemny pasek „approach" → kontakt. Marka jest silna (Swiss /
Ragged Edge, ink-on-paper, jeden akcent, reguła „respect the skim", tylko prawdziwe treści).

Cel: pokazać **świeższą alternatywę layoutu** inspirowaną portfolio z Figma Community, która
lepiej pasuje do „typu portfolio" badacza — bardziej redakcyjny, dowodowy, skanowalny układ.
To ma być **makieta w tym projekcie Figma Make (Vite)**, którą Grzegorz obejrzy w podglądzie
i porówna z obecną stroną. Nie ruszamy repo Next.js.

Treść pozostaje **prawdziwa** (zasada z PRODUCT.md) — te same case studies, metody i dane,
tylko w nowej kompozycji.

## Podejście: kierunek „research journal / index"

Świeższa alternatywa = odejście od klasycznego układu landing-page na rzecz **redakcyjnego
spisu treści badacza** (wzorzec częsty w mocnych portfolio na Figma Community):

1. **Editorial split hero** — po lewej nadwymiarowe oświadczenie (tagline), po prawej
   kolumna meta: rola, dostępność, lokalizacja + mały „dowód" (mini-wykres/statystyka).
   Zamiast wyśrodkowanego hero — asymetryczna siatka.
2. **Methods marquee** — poziomy, powolny ticker nazw metod (reduced-motion → statyczny wrap).
3. **Work jako numerowany indeks (00 / 01)** — tabelaryczny spis badań z dużymi tytułami,
   metrykami po prawej i hover-preview miniatury/wykresu. Czyta się jak spis treści raportu.
4. **Featured evidence block** — pełnowymiarowa sekcja pierwszego studium: wielka metryka
   (65% less task time), adnotowany wykres-placeholder, chipy metod, pytanie badawcze.
5. **Process strip** — 3 kroki „framing → method → synthesis" (płasko, bez cieni), oddające
   „I start from the question, not the method."
6. **Proof / numbers band** — kilka twardych liczb (n = 446, 3 districts, 2 studies) jako
   pasek dowodowy.
7. **Contact** — duża typografia + copy-email + LinkedIn + résumé.

Zasady zachowane: near-monochrome baza + JEDEN akcent ≤10% ekranu, hierarchia przez skalę,
płasko domyślnie, `prefers-reduced-motion`, brak poziomego scrolla, WCAG AA (kontrast ≥4.5:1).
„Świeżość" bierze się z **kompozycji** (asymetria, indeks, marquee, evidence block), nie z
gradientów/glassmorphizmu (jawnie odrzucone w DESIGN.md).

## Kroki implementacji

1. **Aesthetic + theme (na starcie implementacji, poza plan mode):**
   - Wywołać `Skill('make:aesthetic-stance')`.
   - Wywołać `create_make_theme` z 1–2 zdaniowym briefem: „Editorial research-journal
     portfolio for a UX researcher — near-monochrome, one decisive accent, big grotesque
     display type, index-driven layout." Wybrać parę fontów (display grotesk + czysty sans)
     i wpiąć wg `AGENTS.md` (Google Fonts `@import` na górze `src/index.css`).
   - Zdefiniować tokeny (ink/paper/mute/accent) w `src/index.css` (Tailwind v4 `@theme`).

2. **Dane makiety** — `src/data/portfolio.ts`: hardkod prawdziwych treści (tagline, rola,
   dostępność, `methods[]`, dwa `studies[]` z tytułem/pytaniem/metodami/impact/danymi wykresu,
   about, kontakt). Źródło: obecna strona.

3. **Komponenty** w `src/components/` (małe, płaskie, reużywalne):
   `Hero`, `MethodsMarquee`, `WorkIndex` (+ `WorkRow`), `FeaturedStudy`, `EvidenceChart`
   (lekki SVG/inline, dostępny opis danych), `ProcessStrip`, `ProofBand`, `Contact`, `Footer`.

4. **Kompozycja** w `src/App.tsx` — złożyć sekcje w kolejności powyżej; zachować `container`,
   focus states, skip-link.

5. **Motion** — subtelny reveal/marquee z fallbackiem `prefers-reduced-motion` (bez
   scroll-jackingu). Można reużyć wzorzec `Reveal` z repo (IntersectionObserver).

## Pliki do utworzenia/zmiany (makieta)
- `src/App.tsx` — złożenie sekcji (zastępuje pusty scaffold).
- `src/index.css` — `@import` fontów, tokeny `@theme`, drobne globalne reguły (bez
  nielayerowanego resetu `*`).
- `src/data/portfolio.ts` — treść.
- `src/components/*.tsx` — sekcje wymienione wyżej.

## Weryfikacja
- Podgląd Vite (serwer już działa na `$PORT`) — wizualny przegląd sekcji.
- Sprawdzić: brak poziomego scrolla od 320px, widoczny focus na linkach/CTA, akcent ≤10%
  ekranu, kontrast tekstu, działanie `prefers-reduced-motion` (marquee/reveal zatrzymane).
- Skanowalność: same nagłówki + liczby + wykres opowiadają całość (reguła „respect the skim").

---

# WARIANT 2 (nowy): Brutalist-rave / CMYK clash na bieli

## Context

Grzegorz obejrzał wariant editorial i chce zobaczyć **coś totalnie odjechanego**: brutalizm
+ klimaty rave, animowane fraktale, kwadratowe ornamenty, kreatywnie — ale **wciąż czytelne**.
Paleta: **CMYK clash na bieli** (cyan / magenta / yellow / key-black na papierze).

To druga, kontrastująca makieta w tym samym projekcie Figma Make (Vite). Treść zostaje
prawdziwa (te same case studies i liczby). Ta wersja świadomie łamie zasady DESIGN.md
(near-monochrome, jeden akcent) — jest jawnie eksperymentalna, do porównania z wariantem 1.
Zamiast nadpisywać wariant 1, wpinam ją pod stanem: `App.tsx` trzyma prosty przełącznik
(np. `useState` „edition") renderujący `<EditorialHome/>` albo `<RaveHome/>`, z brutalnym
togglem w rogu — dzięki temu oba layouty żyją obok siebie i da się je porównać.

## Kierunek wizualny

Stance: **neo-brutalist rave**. Zasady czytelności trzymane mimo chaosu:
- **Papier**: czyste białe tło `#f2f0ea`/`#ffffff`; **key-black** `#0a0a0a` na tekst.
- **CMYK akcenty**: cyan `#00b4e6`, magenta `#e6007e`, yellow `#ffde00` — używane w blokach,
  ramkach, hoverach, ornamentach; NIE pod długim tekstem (kontrast!).
- **Typografia**: display = **Anton** (ogromne, kondensowane, krzykliwe nagłówki), etykiety/
  dane = **Space Mono**, tekst ciągły = **Inter** (czarny na białym, ≥4.5:1 — tu czytelność).
- **Brutalizm**: grube czarne ramki (2–4px), twarde krawędzie (radius 0), offsetowe „hard
  shadows" w CMYK (box-shadow bez blura), rażące bloki koloru, widoczna siatka.
- **Kwadratowe ornamenty**: powtarzalne moduły — szachownice, halftone z kwadratów,
  quad-subdivision, corner-ticks, `+` markery na przecięciach siatki.

## Fraktale / animacje (kreatywny rdzeń)

`FractalField.tsx` — komponent `<canvas>` rysujący **animowaną quad-tree / Sierpiński-carpet
subdivision**: rekurencyjny podział kwadratu na 9 pól, część wypełniana kolorami CMYK, głębia
i wypełnienia pulsują w czasie (`requestAnimationFrame`, faza sterowana `sin`). Efekt:
kwadratowy fraktal, który „oddycha" w rytmie — łączy „fraktale" + „kwadratowe ornamenty" +
„rave". Detale:
- Rysowany na canvasie skalowanym do `devicePixelRatio`; kontener z białym `bg`, żeby layout
  trzymał, zanim canvas się zainicjuje.
- Tło hero (za treścią, z dużą jasnością/niskim kryciem elementów pod tekstem) LUB osobny
  bordowany „panel" — treść zawsze na jednolitym polu dla czytelności.
- **`prefers-reduced-motion`** → jedno statyczne przejście fraktala, `cancelAnimationFrame`,
  brak pętli. `IntersectionObserver` pauzuje pętlę poza ekranem (oszczędność CPU).
- Dodatkowo lekkie CSS: marquee (mamy), glitch-hover na tytułach (translate/clip, wyłączane
  reduced-motion), animowany „conic/halftone" divider między sekcjami.

## Sekcje (ta sama treść, brutalny układ)

1. **Hero** — gigantyczny Anton headline, za nim `FractalField`; pasek meta w Space Mono;
   CTA jako brutalne bloki z hard-shadow w cyan/magenta.
2. **Methods** — marquee jak w wariancie 1, ale czarny pasek z kwadratowymi separatorami CMYK.
3. **Work index** — brutalistyczne „karty-boksy" z grubą ramką i hard-shadow; numer 01/02
   wielki, hover przełącza kolor akcentu (C→M→Y).
4. **Featured evidence** — blok na kolorowym polu (np. yellow) z czarną ramką; wykres słupkowy
   z EvidenceChart przemalowany na CMYK (zachowana dostępna tabela `sr-only`).
5. **Process strip** — 3 boksy z corner-tick ornamentami.
6. **Proof band** — wielkie liczby w kwadratowych kaflach, każdy inny kolor CMYK.
7. **Contact** — ogromny Anton, copy-email jako brutalny przycisk z hard-shadow.
8. **Footer** — mono, kwadratowe markery.

## Pliki
- `src/index.css` — dodać `@import` Anton + Space Mono; tokeny CMYK w `@theme`
  (`--color-cyan/magenta/yellow/key`); utili: `.hard-shadow*`, keyframes glitch/pulse; rozszerzyć
  blok `prefers-reduced-motion`. Zachować istniejące tokeny wariantu 1.
- `src/components/rave/FractalField.tsx` — animowany kwadratowy fraktal na canvasie.
- `src/components/rave/*.tsx` — Hero/Work/Featured/Process/Proof/Contact/Footer w stylu brutal.
  Reużyć `EvidenceChart.tsx` (z override kolorów) i wzorzec `Reveal.tsx`.
- `src/components/RaveHome.tsx` + `src/components/EditorialHome.tsx` — złożenia wariantów.
- `src/App.tsx` — `useState` toggle edycji + brutalny przełącznik (Editorial ⇄ Rave).

## Weryfikacja (wariant 2)
- Podgląd Vite: przełącznik pokazuje oba warianty; fraktal animuje płynnie.
- Czytelność: cały tekst ciągły czarny-na-białym (≥4.5:1); kolory CMYK nie pod długim tekstem.
- Brak poziomego scrolla od 320px; widoczny focus; toggle i CTA obsługiwane klawiaturą.
- `prefers-reduced-motion`: fraktal statyczny, marquee/glitch wyłączone, brak pętli rAF.
- Wydajność: pętla rAF pauzowana poza ekranem (IntersectionObserver).
