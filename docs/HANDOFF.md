# Handoff — portfolio Grzegorza Seweryna

Kontekst dla nowej sesji. Przeczytaj to zamiast odtwarzać historię rozmowy.

Stan na: 29 lipca 2026.

---

## Czym jest ten projekt

Portfolio badacza UX szukającego **pierwszej pracy**. Next.js 15 (App Router,
statyczna generacja), bez bazy danych, bez API. Strategia i zasady projektowe siedzą
w `PRODUCT.md` i `DESIGN.md` w katalogu głównym — **przeczytaj oba przed pierwszą
zmianą wizualną**, są krótkie i wiążące.

Odbiorca: rekruter, 10 sekund pierwszego skanowania, często na telefonie.
Rejestr: `brand` (design JEST produktem).

---

## Co jest zrobione

### Case study z pracy magisterskiej — `/work/krakow-touristification`

Jedyna prawdziwa praca na stronie. Badanie percepcji turystyfikacji przez mieszkańców
Krakowa: 446 ankiet + 10 wywiadów pogłębionych, design konwergentny.

Dwanaście sekcji, sześć własnych wykresów SVG, cztery cytaty (polski oryginał +
tłumaczenie), joint display, PDF pracy do pobrania. Treść po angielsku.

### Architektura treści

Studia to **dane, nie JSX**. `lib/studies/types.ts` definiuje unię bloków:
`prose` · `media` · `figure` · `quote` · `stats` · `note` · `callout` · `list`.
Renderuje je `components/study/StudyBlocks.tsx` przez dispatcher.

Nowa praca = nowy plik w `lib/studies/` na wzór `krakow-overtourism.ts` + wpis
w `lib/studies/index.ts`. Nie trzeba dotykać szablonu strony.

### Wykresy — bez żadnej biblioteki

`components/charts/`: `LikertBars`, `DistrictGradient`, `ForestPlot` (dwa modele,
jeden komponent), `TypologyScatter`, `ThemeMatrix`, `JointDisplay`.
Adresowane po `ChartId` przez `components/charts/registry.tsx`.

`Figure.tsx` to wspólny wrapper: podpis, linia źródła, animacja wejścia
i **ukryta tabela z danymi** dla czytników ekranu. Każdy nowy wykres musi ją mieć.

Zasady: kolory wyłącznie z tokenów, akcent na jednej serii (reguła „One Voice"
z `DESIGN.md`), podpis mówi wniosek a nie opisuje osi, skalowanie przez `viewBox`.

### Skrypty

| Skrypt | Do czego |
|---|---|
| `scripts/extract-thesis-data.py` | Przelicza dane z pracy i **nie zapisuje nic, jeśli nie zgadzają się z pracą** |
| `scripts/audit-published-numbers.py` | Sprawdza każdą liczbę w tekście na zbudowanej stronie |
| `scripts/build-webfonts.py` | Konwersja licencjonowanych TTF/OTF do WOFF2 |
| `scripts/compress-thesis-pdf.py` | Odchudza PDF pracy i **odmawia zapisu, jeśli render którejkolwiek strony się zmieni** |
| `scripts/build-icons.py` | Z `brand/gs-mark.png` robi favikonę, ikonę Next i ikonę Apple |

Pochodzenie każdej liczby: `lib/data/thesis/SOURCES.md`.

---

## Decyzje, których nie podważaj

Zostały podjęte świadomie i były przedmiotem rozmowy z właścicielem projektu.

- **Case study po angielsku**, cytaty po polsku z tłumaczeniem pod spodem.
  Oryginał jest danymi, tłumaczenie uprzejmością — dlatego jest ciszej złożone.
- **β kosztów publikujemy jako −0,52.** Odtworzony model zwraca −0,5135, co
  zaokrągla się do −0,51, ale praca złożona w APD UJ drukuje −0,52. Wygrywa wersja
  archiwalna, bo to ją czytelnik może sprawdzić. Szczegóły w `SOURCES.md`
  i `PUBLISHED_OVERRIDES` w skrypcie ekstrakcji.
- **Zgoda na publikację cytatów jest pełna** — potwierdzona przez właściciela.
- **Wykresy są statyczne**, bez tooltipów i filtrów. Świadomy wybór: rekruter ma
  zobaczyć wniosek, nie bawić się narzędziem.
- **Dwie prace docelowo**, nie trzy. Jedna gotowa, druga w planie.
- **Dwa głosy typografii, nie jedna drabinka.** `--text-display` (Druk Wide) to
  tytuły stron. `--text-statement` (Druk Wide, o stopień niżej) to teza wewnątrz
  strony: pasmo „Approach" i tytuł kontaktu. `--text-h1` i niżej to Noirden,
  czyli nagłówki porządkujące stronę, którą ktoś już czyta. Display i h1 nie są
  kolejnymi stopniami tej samej skali, bo to nie ten sam rodzaj pisma.
- **Reguła „etykieta nazywa rodzaj".** Małe wersaliki z trackingiem mogą nazywać,
  czym coś **jest** (Featured, Next study, Copy, nagłówek kolumny, nagłówek
  tabeli). Nie wolno nimi zapowiadać sekcji, która ma własny nagłówek: „APPROACH"
  nad nagłówkiem mówiącym, czym jest approach, to druga, słabsza etykieta i nic
  więcej. Wyjście z tego prowadzi przez skalę, nie przez cichszy kicker.
- **Zero em dashów (`—`) w widocznej treści.** Decyzja właściciela: ta pauza czyta
  się dziś jako sygnatura tekstu generowanego, a nie jako interpunkcja. Zamiast
  niej: przecinek, dwukropek, nawias albo osobne zdanie. Półpauza (`–`) zostaje
  tam, gdzie znaczy zakres (`45–70 minut`, `C1–C9`, `cost–benefit`) i jako
  separator w tytułach stron. W kartach OG separatorem jest `·`, tak jak w kickerze.
  Reguła dotyczy treści, nie komentarzy w kodzie. Sprawdzenie:
  `grep -rn "—" --include="*.ts" --include="*.tsx" --include="*.json" lib app components`

---

## Pułapki

**Nie uruchamiaj `npm run build` przy działającym `next dev`.** Build nadpisuje
`.next`, z którego czyta dev-server, i serwer pada z błędem o brakującym module.
W poprzedniej sesji wywaliło to podgląd dwa razy.

Poprawna kolejność:
```bash
# zatrzymaj serwer podglądu, potem:
rm -rf .next && npm run build
```

**Pliki `03_Wyniki/agregaty/*.json` w folderze pracy są nieaktualne.** Mają status
`WYNIKI ROBOCZE` i nie zgadzają się z finalną pracą — inne pseudonimy rozmówców,
inne ilorazy szans, inne liczebności modeli. Źródłem prawdy jest PDF pracy plus
`01_Baza_danych/zbior_analityczny.csv`.

**Nie publikuj** transkrypcji wywiadów, surowych plików ankiety ani danych
respondentów. Tylko agregaty. Folder pracy nie należy do repo.

**`myfonts/` JEST w repozytorium, celowo.** Druk Wide i Noirden to licencjonowane
kroje komercyjne, ale bez nich projekt się nie zbuduje — kopia zapasowa, z której
nie da się odtworzyć projektu, nie jest kopią zapasową. Jest to akceptowalne,
dopóki repozytorium pozostaje **prywatne**, jako osobista kopia archiwalna.
**Przed upublicznieniem trzeba je usunąć z historii** (razem z CV z wcześniejszego
commita). WOFF2 odtwarza `scripts/build-webfonts.py`.

**Polskie znaki.** Noirden nie ma `ą ć ę ń ś ź ż` — ma tylko `ó` i `ł`. Bez
obsługi przeglądarka podmienia pojedyncze litery na font systemowy w środku wyrazu.
Rozwiązane regułą `:lang(pl)` w `globals.css`, która przełącza na Oswalda
(pełne pokrycie). Dotyczy trzech cytatów; **każdy nowy tekst po polsku musi mieć
`lang="pl"`**, inaczej wróci ten sam problem.

---

## Stan jakości

Audyt techniczny `/impeccable audit`: **20/20**.

Zweryfikowane pomiarem w przeglądarce: zero naruszeń kontrastu (najgorszy 5,6:1),
zero celów dotykowych poniżej 24 px, zero przepełnień poziomych na 375 i 1280 px,
zero kolizji tekstu w SVG, fokus klawiaturą działa, menu mobilne przenosi i oddaje fokus.

Świadome koszty, które zostają:
- **176 kB JS** na stronie głównej — GSAP + Lenis + OGL. To cena shader-fielda
  i smooth-scrolla, które są częścią charakteru marki.
- Fonty 100 KB WOFF2 (było 227 KB jako surowe TTF/OTF).

---

## Co dalej

Etap A jest **zamknięty**: prawdziwe dane kontaktowe, portret, usunięte fikcyjne
case studies, obsługa strony z jedną pracą, naprawione polskie znaki, kopia na
GitHubie (`gregseweryn/portfolio`, prywatne).

Z etapu A2 zostało **tylko wdrożenie** (punkt 1) — pozostałe sześć pozycji jest
zrobionych, szczegóły przy każdej niżej. Jedna rzecz czeka na ręczne sprawdzenie
w prawdziwej przeglądarce: reset scrolla (punkt 2).

### Etap A2 — do publikacji

**1. Wdrożenie na Vercela — jedyna otwarta pozycja i największa blokada.**
Bez adresu URL nie da się wysłać niczego rekruterowi. Projekt jest statyczny,
bez backendu, więc wdrożenie to podpięcie repo i domena. Repo jest prywatne —
Vercel to obsłuży po autoryzacji GitHuba. **Wymaga rąk właściciela**: logowania
do Vercela ani autoryzacji GitHuba nie da się oddelegować agentowi.

Kod jest po stronie wdrożenia gotowy: build przechodzi czysto, nagłówki
bezpieczeństwa i karty OG generują się z `next.config.mjs` i tras
`opengraph-image`. Uwaga: build **czyta `myfonts/`** (Satori potrzebuje TTF,
nie WOFF2), więc katalog musi zostać w repo, żeby wdrożenie się powiodło.

**2. Reset scrolla przy zmianie trasy — zrobione.**
`components/SmoothScroll.tsx` trzyma teraz instancję Lenis w `useRef` i ma drugi
efekt na `usePathname()`. Przy zmianie trasy, po jednej klatce (żeby nowy widok
zdążył się rozłożyć), woła `lenis.resize()` i przewija: na kotwicę, jeśli URL ma
hash — inaczej na `lenis.scrollTo(0, { immediate: true })`. Pierwsze wywołanie
jest pomijane, bo montaż ma już własną obsługę hasha i nie chcemy zabijać
przywracania pozycji przy odświeżeniu. Bez instancji Lenisa (zredukowany ruch)
efekt nie robi nic — tam natywny reset Nexta działa sam.

**Nie zweryfikowane w przeglądarce.** Panel przeglądarki Claude'a nie kompozytuje
klatek, więc pętla `requestAnimationFrame` Lenisa stoi i strona w ogóle się nie
przewija. **Do sprawdzenia ręcznie w prawdziwej przeglądarce**: `/` → case study
(ma otworzyć się na górze), `/about` → „Work" (ma wylądować na sekcji, nie na
górze), i to samo przy `prefers-reduced-motion`.

**3. Nagłówki bezpieczeństwa — zrobione.** `next.config.mjs`, `headers()` na
`/:path*`: CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
`Permissions-Policy`. CSP jest od razu **egzekwowane**, nie Report-Only — udało
się je zweryfikować pomiarem zamiast na produkcji: żadnych naruszeń w konsoli na
`/`, `/work/…`, `/about` i `/contact` w buildzie produkcyjnym.

Dwa `'unsafe-inline'` są nośne, nie z lenistwa: Next wstrzykuje ładunek RSC jako
inline `<script>`, a GSAP, Lenis i `next/font` piszą inline style. Nonce
wymagałby renderowania per żądanie, czyli wymiany statycznej generacji na
dyrektywę, która i tak niczego tu nie broni. `next dev` dostaje osobno
`'unsafe-eval'` i socket HMR — relaksacja jest warunkowana `NODE_ENV` i nigdy
nie trafia do buildu.

**4. `npm audit fix` — zrobione.** Czyste zero. `npm audit fix` samo nic nie
naprawiało: podatne `postcss` i `sharp` są przypięte przez Nexta, a wszystkie
opublikowane wersje Nexta mieszczą się w zakresie ostrzeżenia. Rozwiązane przez
`overrides` w `package.json` (postcss ≥8.5.25, sharp ≥0.35.3) plus Next 15.5.22.
Optymalizator obrazów zweryfikowany po podmianie sharpa — `/_next/image` zwraca 200.

**5. Formalny tytuł pracy — zrobione.** `Study` ma teraz opcjonalne
`formalTitle` + `formalTitleLang`. Tytuł stoi pod nagłówkiem „Check the work",
w `<cite lang="pl">` (czyli na Oswaldzie, z pełnymi znakami diakrytycznymi),
i w metadanych jako `citation_title` / `citation_author`. Nagłówek H1 zostaje
redakcyjny. Do podmiany, jeśli właściciel woli inne miejsce w metadanych.

**6. Obrazy OG — zrobione, ale inaczej niż zakładał plan.** Zamiast statycznego
PNG w `public/` są dwie trasy `opengraph-image.tsx` (globalna i per case study),
renderowane przez `next/og` przy buildzie z tych samych tokenów i krojów co
strona. Ręcznie wyeksportowany PNG rozjechałby się z systemem przy pierwszej
zmianie akcentu; ten się nie rozjedzie. Wspólne kolory i fonty: `lib/og.ts`
(hex-owe lustro tokenów OKLCH — trzymaj je w zgodzie z `globals.css`).

**7. Kompresja PDF-a pracy — zrobione, 6,25 MB → 2,46 MB.** Nic nie ucierpiało,
bo problemem nie były tabele ani obrazy: Word osadził **cały Segoe UI Emoji**,
7,8 MB konturów dla jednego znaku na jednej stronie — 63% pliku. Subsetting fontów
plus przepisanie pliku bez martwych obiektów. Obrazy zachowały rozdzielczość,
warstwa tekstowa jest identyczna, a render wszystkich 172 stron jest
pikselowo identyczny (`scripts/compress-thesis-pdf.py` sam to sprawdza i odmawia
zapisu przy jakiejkolwiek różnicy).

### Etap A3 — tło w nagłówku case study

Właściciel chce wizualne tło w pierwszym ekranie strony z pracą (tam, gdzie tytuł
i diagram trzech dzielnic). **Nie pod wykresami** — to zostało odrzucone, bo cofnęłoby
pracę nad kontrastem.

Czego użyć: impeccable nie generuje obrazów rastrowych, projektuje wizualizacje
w kodzie. Do dyspozycji: SVG, canvas, WebGL. Na stronie głównej jest już
`components/ShaderField.tsx` (OGL/WebGL) — wzorzec i obsługa `prefers-reduced-motion`,
pauzy poza ekranem i sprzątania kontekstu są tam gotowe do skopiowania.

Ograniczenia, których nie wolno złamać: nagłówek musi zachować kontrast ≥3:1,
diagram `DistrictPhases` nie może konkurować z tłem, a całość musi mieć wariant dla
zredukowanego ruchu. Rejestr jest near-monochrome — gradient ani zdjęcie tu nie pasują.

### Bezpieczeństwo — co jest, a co nie jest problemem

Strona jest statyczna: bez backendu, bazy, formularzy, logowania i danych użytkownika.
**Nie dotyczą jej** SQL injection, XSS z danych wejściowych, CSRF, przejęcie sesji
ani rate limiting — nie ma czego atakować.

Realne pozycje to były: nagłówki bezpieczeństwa (punkt 3), łańcuch zależności
(punkt 4) i higiena danych osobowych. Pierwsze dwie są zamknięte. Trzecia
została rozstrzygnięta wcześniej — **CV zdjęte
ze strony**, bo zawiera numer telefonu `+48 508 649 968`, a publiczny PDF to
dokładnie to, co skanują boty zbierające numery. Plik leży w `private/`
(poza serwowanym katalogiem, wykluczony z gita), `site.resumeHref` jest `null`,
więc wszystkie trzy przyciski pobierania są ukryte. CV idzie bezpośrednio do
rekruterów, którzy się odezwą.

Uwaga: CV znajduje się w historii gita z wcześniejszego commita. Repo jest prywatne,
więc to akceptowalne jako kopia zapasowa — ale **przed ewentualnym upublicznieniem
repozytorium trzeba wyczyścić historię** (razem z `myfonts/`).

### Etap B — druga praca

**Projekt własny od zera**, nie opis istniejącego projektu. Cel jest jeden:
magisterka dowodzi rygoru, ale nie odpowiada na pytanie „czy umiesz to zrobić
w zespole produktowym, na terminie". Druga praca ma odpowiadać wyłącznie na to.

Zakres: wybór realnego produktu z wyraźnym punktem porażki (usługi publiczne,
transport, bankowość — nie wymyślony startup), 5–8 moderowanych testów użyteczności,
analiza, **przeprojektowanie jednego przepływu** z przypisem od każdej decyzji
do ustalenia z badań.

Ważne: **klauzula zgody musi od razu obejmować publikację w portfolio.**
W magisterce nie obejmowała i trzeba było to rozstrzygać po fakcie.

Czego zabraknie w kodzie i trzeba będzie dobudować:
- blok porównania przed/po (para obrazów, wspólny podpis),
- obsługa prawdziwych obrazów przez `next/image` — dziś w treści nie ma ani
  jednego `<img>`, wszystko jest SVG,
- ewentualnie wykres wagi problemów; `Figure.tsx` daje gotowy wrapper.

---

## Weryfikacja przed każdym „gotowe"

```bash
npx tsc --noEmit
```

Build (z zatrzymanym serwerem podglądu):
```bash
rm -rf .next && npm run build
```

Audyt liczb — musi pokazać zero nierozliczonych:
```bash
python scripts/audit-published-numbers.py
```

Plus przegląd w przeglądarce na 375 i 1280 px: kontrast, cele dotykowe,
brak przepełnień poziomych, brak martwych linków.

Nagłówki bezpieczeństwa sprawdzaj **na buildzie produkcyjnym**, nie na `next dev` —
CSP jest tam celowo luźniejsze. Konfiguracja podglądu `site-prod`
(`.claude/launch.json`) uruchamia `next start` na porcie 3211 właśnie do tego.
