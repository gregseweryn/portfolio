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

### Etap A2 — do publikacji (priorytet, w tej kolejności)

**1. Wdrożenie na Vercela — największa blokada.**
Bez adresu URL nie da się wysłać niczego rekruterowi. Projekt jest statyczny,
bez backendu, więc wdrożenie to podpięcie repo i domena. Repo jest prywatne —
Vercel to obsłuży po autoryzacji GitHuba.

**2. Reset scrolla przy zmianie trasy — potwierdzony błąd.**
`components/SmoothScroll.tsx` tworzy instancję Lenis raz, w `useEffect` z pustą
tablicą zależności, i **nigdy nie dowiaduje się o zmianie trasy**. Next normalnie
przewija na górę przy nawigacji, ale Lenis trzyma własny stan pozycji i nadpisuje
`window.scrollTo`, więc reset Nexta nie działa — użytkownik zostaje tam, gdzie był.

Kierunek naprawy: dodać `usePathname()`, a na jego zmianę wywołać
`lenis.scrollTo(0, { immediate: true })`. Uwaga na dwa przypadki brzegowe: nawigacja
z kotwicą (`/#work`) nie powinna skakać na górę, a `prefers-reduced-motion` wyłącza
Lenis w całości, więc tam scroll natywny działa już poprawnie.

Nie da się tego zweryfikować w panelu przeglądarki Claude'a — nie kompozytuje klatek,
więc pętla `requestAnimationFrame` Lenisa stoi. **Testuj w prawdziwej przeglądarce.**

**3. Nagłówki bezpieczeństwa.** Obecnie żadnych. Do dodania w `next.config.mjs`
przez `headers()`: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` (albo `frame-ancestors`
w CSP). CSP wymaga uwagi, bo GSAP i Lenis wstrzykują style — zacznij od
`Content-Security-Policy-Report-Only` i dopiero po weryfikacji przełącz na egzekwowanie.

**4. `npm audit fix`** — trzy podatności o wysokiej wadze w `libvips` przez `sharp`
(CVE-2026-33327/33328/35590/35591). Sharp jest zależnością build-time do optymalizacji
obrazów i nie trafia do przeglądarki, więc ryzyko dla odwiedzającego jest zerowe,
ale build powinien być czysty.

**5. Formalny tytuł pracy.** Nagłówek zostaje redakcyjny („Who pays for a tourist
city"), ale pełny tytuł — *Turystyfikacja Krakowa: percepcja mieszkańców* — ma się
pojawić przy PDF-ie w sekcji pobierania i w metadanych strony. Decyzja właściciela.

**6. Obraz OG** — `generateMetadata` w `app/work/[slug]/page.tsx` już istnieje,
brakuje statycznego PNG w `public/`.

**7. Kompresja PDF-a pracy** — 6,2 MB, cel ~2 MB. Jeśli ucierpi czytelność tabel,
zostaw oryginał.

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

Realne pozycje to: nagłówki bezpieczeństwa (punkt 3), łańcuch zależności (punkt 4)
i higiena danych osobowych. Ta ostatnia została już rozstrzygnięta — **CV zdjęte
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
