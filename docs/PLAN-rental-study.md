# Drugi case study: wynajem długoterminowy w Krakowie

> **Plan z 4.08.2026, zatwierdzony. Cztery rzeczy zdezaktualizowały się w trakcie realizacji.
> Przeczytaj to, zanim zaczniesz cokolwiek z niego wykonywać.**
>
> 1. **Zakres zawężony do samego kosztu.** Plan mówi o koszcie i wiarygodności ofert.
>    Po przeglądzie heurystycznym zostawiliśmy tylko koszt: jeden mierzalny punkt porażki
>    i jedna metryka liczbowa. Wiarygodność jest świadomie poza zakresem.
> 2. **Prototypowanie w Figmie działa.** Plan traktował to jako ryzyko do sprawdzenia.
>    Sprawdzone: `setReactionsAsync` przechodzi przez ten MCP. Nie trzeba linkować ręcznie.
> 3. **`generate_figma_design` nie istnieje** w tej instalacji. Jest tylko `use_figma`.
>    Ekrany zbudowane natywnie z tokenów.
> 4. **Kolejność odwrócona: najpierw kod, potem Figma.** Plan zakładał projektowanie w Figmie.
>    Robimy odwrotnie, bo retest wymaga interfejsu, w który da się realnie wpisać budżet,
>    a klikalny prototyp tego nie przyjmie. Figma jest miejscem dostawy, nie projektowania.
>
> **Stan realizacji: `docs/HANDOFF-rental-study.md`.** Etapy 1, 4, 5 i 6 są zrobione.
> Etap 2 (teren) nie został wykonany. Etapy 3 i 7 czekają na dane.

## Context

Portfolio ma dziś jedną pracę — magisterkę o turystyfikacji Krakowa (446 ankiet, 10 wywiadów,
design konwergentny). Dowodzi rygoru badawczego, ale nie odpowiada na pytanie, które zadaje
rekruter produktowy: *czy umiesz zbadać interfejs, przełożyć ustalenia na projekt i domknąć
pętlę na terminie.* Na całej stronie nie ma ani jednego ekranu, przepływu ani prototypu,
a `/about` obiecuje 16 metod, z których case study potwierdza cztery. Przy pozycjonowaniu
opartym na uczciwości ta rozbieżność kosztuje więcej niż u kogokolwiek innego.

Drugi projekt domyka tę lukę. Temat wynika z danych pierwszego, nie z pomysłu: najsilniejszym
consensusem magisterki była zgoda **88,1%**, że turystyka podbija czynsze — z najmniejszym
rozrzutem w całym kwestionariuszu. Projekt idzie tam, gdzie ludzie faktycznie spotykają ten
rynek: do wyszukiwarki ofert najmu.

**Efekt końcowy:** case study `/work/krakow-rental-search` oparty na 6 moderowanych testach
użyteczności na żywym produkcie, ankiecie przesiewowej, przeprojektowanym przepływie w Figmie
(wireframe → hi-fi → prototyp) i retestcie, z przypisem od każdej decyzji projektowej do
konkretnego ustalenia.

**Zasada nadrzędna:** nie wymyślam żadnych wyników. Każda liczba i każdy cytat pochodzi
z badania, które przeprowadzisz Ty. Do czasu Twoich danych etapy 3–7 pozostają szkieletem.

---

## Zweryfikowane środowisko

Sprawdzone realnym wywołaniem, nie założone.

### Figma — pełny zapis, DZIAŁA
Konto `Grzegorz Seweryn`, plan **Portfolio** `team::1624891726134606124`, tier student, seat Full.

| Możliwość | Narzędzie |
|---|---|
| Tworzenie/edycja czegokolwiek (ramki, auto-layout, tekst, komponenty, warianty, zmienne, style) | `use_figma` — JS przez Plugin API |
| Nowy plik design / FigJam / Slides | `create_new_file` |
| Diagramy z Mermaid w FigJam (flowchart, sequence, state, gantt, ER) | `generate_diagram` |
| Podgląd, metadane, zmienne, eksport wideo, wgrywanie zasobów | `get_screenshot`, `get_metadata`, `get_variable_defs`, `export_video`, `upload_assets` |

**Ograniczenia, które trzeba nazwać teraz:**
- `createImageAsync`, `loadAllPagesAsync`, `setPluginData` są **zabronione** — obrazy wchodzą przez `upload_assets`.
- **Prototypowanie (połączenia między ekranami) jest niezweryfikowane.** Plugin API ma `setReactionsAsync`, ale nie potwierdziłem, że przechodzi przez ten MCP. → **Krok 0 etapu 6: test na jednym pustym pliku, zanim zbuduję 20 ekranów.** Jeśli nie zadziała, linkujesz ręcznie (~15 min), a ja nazwę warstwy tak, żeby to było trywialne.
- Druk Wide i Noirden to kroje licencjonowane, lokalne. W Figmie zadziałają tylko w aplikacji desktop z fontami zainstalowanymi w systemie. **Nieistotne** — makiety Otodomu mają wyglądać jak produkt, nie jak Twoja strona. W Figmie: Inter.
- Drugi Figma MCP (`mcp__Figma__*`) jest tylko do odczytu — redundantny.

### Reszta środowiska

| Narzędzie | Status | Do czego w tym projekcie |
|---|---|---|
| **Browser MCP** | działa lokalnie | Przegląd heurystyczny Otodom/OLX: `read_page` (drzewo dostępności), `get_page_text`, screenshot, `resize_window` 375 px. Realny audyt zamiast zgadywania |
| **Google Drive MCP** | dostępny, do potwierdzenia | Jeśli ankieta w Google Forms — zaciągnę odpowiedzi bezpośrednio (`search_files`, `read_file_content`) |
| **markitdown** | dostępny | Transkrypcje/notatki (docx, pdf, xlsx) → markdown do analizy |
| **claude-in-chrome** | dostępny | Tylko jeśli trzeba być zalogowanym; do audytu wystarczy Browser |
| **Notion MCP** | **wymaga autoryzacji** | Niedostępny w tej sesji (OAuth nieinteraktywny). Nie jest potrzebny — repozytorium badawcze trzymamy jako markdown w repo |
| **Canva, Windows-MCP, computer-use, pdf-viewer** | dostępne | Niepotrzebne |

### Skille, które wejdą do workflow
`design:user-research` · `ux-heuristics` (heurystyki Nielsena + severity) · `design:research-synthesis`
· `product-management:synthesize-research` · `data:analyze`, `data:statistical-analysis`, `data:create-viz`
· `figma:figma-use` (**obowiązkowy przed każdym `use_figma`**), `figma:figma-generate-design`,
`figma:figma-create-new-file` · `refactoring-ui`, `design:design-critique`, `design:ux-copy`
· `design:accessibility-review` · `impeccable` (audyt gotowej strony)

### Ustalenie o CSP, które przesądza o formie prototypu na stronie
`next.config.mjs` nie definiuje `frame-src`, więc `default-src 'self'` **zablokuje osadzony
iframe Figmy**. Otwieranie CSP dla jednego embedu byłoby regresem wobec zamkniętej polityki.
→ Prototyp pokazujemy jako **self-hosted wideo** (`export_video` z Figmy → `public/`),
`media-src` spada na `default-src 'self'`, więc przechodzi. Link do żywego prototypu obok.

---

## ETAP 1 — Definicja problemu *(dziś, ~1h, wspólnie)*

Produkuje `research/01-problem.md`.

- **Problem statement (wstępny, do przepisania po badaniach):** osoba szukająca najmu w Krakowie
  nie potrafi na podstawie ogłoszenia ustalić, ile realnie zapłaci miesięcznie i czy oferta jest
  prawdziwa. Koszt jest rozproszony (czynsz / czynsz administracyjny / media / kaucja / prowizja),
  a sygnały wiarygodności są nieobecne lub nieczytelne.
- **Hipotezy** (H1–H4), formułowane jako **falsyfikowalne**, np. H1: *użytkownik proszony o podanie
  kwoty pierwszego miesiąca poda kwotę zaniżoną o co najmniej jeden składnik.*
- **Cele biznesowe:** konwersja z wyszukiwania na kontakt, jakość leada, retencja szukającego,
  koszt obsługi zgłoszeń o fałszywych ofertach.
- **Cele użytkownika:** ustalić realny koszt, ocenić wiarygodność, porównać oferty bez arkusza.
- **Research questions:** RQ1–RQ5, każde przypisane do metody, która na nie odpowiada.
- **Założenia i ograniczenia:** jedna osoba, brak dostępu do analityki produktu, próba nieprobabilistyczna,
  brak możliwości wdrożenia → mierzymy zmianę na prototypie, nie w produkcji.

**Krok 0 przed wszystkim:** przegląd heurystyczny żywego produktu przez Browser MCP (desktop + 375 px),
żeby potwierdzić, że punkt porażki istnieje naprawdę. Jeśli nie istnieje — zmieniamy przepływ, nie udajemy.

---

## ETAP 2 — UX Research *(Ty, 2–4 dni)*

Produkuje `research/02-plan.md`, `research/consent-pl.md`, `research/script-pl.md`, `research/screener.md`.

### 2a. Ankieta przesiewowa i kwantyfikująca
- **Kto:** osoby, które w ostatnich 12 miesiącach szukały najmu długoterminowego w Krakowie.
- **Ilu:** n ≈ 30–50. Kanał: krakowskie grupy FB (**ten sam kanał co magisterka — i ta sama,
  jawnie nazwana słabość próby; spójność metodologiczna jest tu atutem, nie wstydem**).
- **10–12 pytań:** ostatnie doświadczenie, ile ofert obejrzał, czy natrafił na duplikat/ofertę-widmo,
  czy końcowy koszt zgadzał się z ogłoszeniem, ranking kryteriów, + pytanie rekrutacyjne do testów.
- **Po co dwie funkcje naraz:** rekrutacja uczestników przez kontrast **oraz** liczby, które
  pozwolą powiedzieć „to nie jest anegdota z sześciu osób".

### 2b. Moderowane testy użyteczności — rdzeń projektu
- **6 osób**, dobór **przez kontrast** (jak w magisterce): pierwszy raz vs doświadczony ·
  student vs pracujący · z pośrednikiem vs bez · budżet niski vs średni.
- **45–60 min**, na żywym produkcie, na **telefonie uczestnika** (mobile-first to realny kontekst).
- **Zadania:**
  1. Budżet X zł/mies. na wszystko. Znajdź 2-pokojowe w Krakowie, w które realnie się zmieścisz.
  2. Wybrałeś ofertę. Ile zapłacisz w pierwszym miesiącu, a ile w drugim? *(test rozumienia kosztu)*
  3. Na ile ufasz temu ogłoszeniu? Co byś sprawdził przed kontaktem?
  4. Porównaj z drugą ofertą — która jest dla Ciebie lepsza i dlaczego?
  5. Retro: kiedy ostatnio szukałeś — co poszło źle?
- **Dane:** nagranie ekranu + głos, ukończenie zadania, czas do ustalenia pełnego kosztu,
  **błąd oszacowania kosztu w zł**, liczba przełączeń między ofertami, SEQ (1–7) po każdym zadaniu,
  cytaty dosłowne.

### 2c. Etyka — nie do pominięcia
- **Klauzula zgody obejmuje od razu publikację w portfolio online**: anonimizowane cytaty i klipy.
  W magisterce nie obejmowała i trzeba było to ratować po fakcie.
- Nie prosimy o logowanie, nie wchodzimy na konto uczestnika, nie zbieramy danych kontaktowych
  z ogłoszeń. W materiałach publikowanych: zamazane adresy, telefony, nazwiska.
- Surowe nagrania i transkrypcje **nie trafiają do repo** (analogicznie do zasady z magisterki).

### Artefakty etapu 2
Research plan · screener · scenariusz moderacji (PL) · formularz zgody (PL) · arkusz obserwacji
· 6 nagrań + notatki · surowe wyniki ankiety

---

## ETAP 3 — Analiza *(wspólnie, po Twoich danych)*

Produkuje `research/03-findings.md` + dane do wykresów w `lib/data/rental/`.

- **Jakościowe:** kodowanie otwarte → grupowanie w tematy (`design:research-synthesis`).
  Przy n = 6 to analiza tematyczna, nie „affinity map dla ozdoby".
- **Ilościowe:** metryki zadaniowe + ankieta (`data:analyze`, `data:statistical-analysis`).
  **Statystyka opisowa i przedziały, bez testów istotności na n = 6** — nadinterpretacja tutaj
  zniszczyłaby dokładnie tę wiarygodność, którą projekt 1 zbudował.
- **Macierz problemów:** częstość × dotkliwość × koszt naprawy → priorytetyzacja.
  Severity 1–4 wg skali Nielsena (`ux-heuristics`).
- **Segmentacja:** tylko jeśli dane ją utrzymają. Przy 6 osobach **domyślnie zamiast person robimy
  2 profile zachowań** oparte na obserwacji. Persona z n = 6 podana jako persona to overclaim —
  a Ty masz w portfolio sekcję, w której argumentujesz przeciwko własnej typologii. Bądźmy spójni.
- **Journey map** jednego przepływu z zaznaczonymi punktami zerwania.
- **Opportunities** → HMW → **finalny problem statement** (przepisany, nie ten z etapu 1).

---

## ETAP 4 — Ideacja i koncepcja

- Rozwiązania **tylko dla problemów z górnej połowy macierzy**. Reszta trafia do „świadomie odrzucone".
- Lista funkcjonalności → **MVP** (RICE lub MoSCoW, uzasadnione, nie ozdobne).
- User flows: stan obecny vs proponowany.
- Architektura informacji karty ogłoszenia i filtrów.
- **Sekcja „czego nie zrobiliśmy i dlaczego"** — to jest ten sam ruch co „What this doesn't support"
  w projekcie 1 i to on odróżni ten case study od reszty rynku.

---

## ETAP 5 — UX Design

| Co | Wierność | Dlaczego |
|---|---|---|
| Przepływ wyszukiwanie → wyniki → oferta → kontakt | flow diagram (FigJam) | Pokazuje myślenie systemowe |
| Lista wyników, karta oferty, porównanie, kontakt | wireframe → hi-fi | Rdzeń przeprojektowania |
| Stany: brak wyników, oferta wygasła, niepełne dane, błąd | wireframe + kluczowe hi-fi | Stany brzegowe to sygnał dojrzałości |
| Mobile 375 px | **priorytet** | Testy prowadzimy na telefonie |

**Zakres:** 8–12 ekranów hi-fi. Nie 40. Przeprojektowujemy **jeden przepływ**, jak ustalono.

---

## ETAP 6 — Figma *(workflow wykorzystujący MCP)*

0. **Test możliwości** — jeden pusty plik, sprawdzam `setReactionsAsync` (prototyp) i zmienne.
   Wynik raportuję, zanim cokolwiek zbuduję.
1. `create_new_file` (design) w planie `team::1624891726134606124` — ale **przed każdym `use_figma`
   ładuję skill `figma:figma-use`** (wymóg twardy, pomijanie powoduje trudne w diagnozie błędy).
2. Fundamenty: zmienne kolorów/spacingu, skala typograficzna (Inter), siatka 375 i 1440.
3. Komponenty: karta oferty, pole filtra, pasek kosztu, znacznik wiarygodności, przyciski, pola.
4. `generate_diagram` → user flow i mapa stanów w FigJam.
5. Wireframe'y → przegląd (`get_screenshot`) → iteracja → hi-fi.
6. Krytyka wizualna: `refactoring-ui` + `design:design-critique`, kontrola kontrastu.
7. Prototyp (automat lub Twoje ręczne 15 min, zależnie od kroku 0).
8. `export_video` → `public/` jako self-hosted wideo do case study.

**Podział pracy:** ja generuję strukturę, komponenty, warianty i stany — to jest praca powtarzalna,
w której MCP jest szybsze od rąk. Ty podejmujesz decyzje projektowe i wykonujesz osąd wizualny.
Nie odwrotnie.

---

## ETAP 7 — Retest i case study

**Retest:** 4–5 osób na prototypie, **te same zadania 1–3**, żeby porównanie było uczciwe.
Mierzymy tę samą metrykę co przedtem (błąd oszacowania kosztu w zł). To domyka pętlę —
i to jest ta rzecz, której nie ma w projekcie 1.

### Struktura case study (dopasowana, nie z szablonu)
Context · Problem · Research (plan, próba, granice) · Insights · Define · Ideation ·
User Flow · Wireframes · UI Design · Prototype · Retest · Iterations · Final Solution ·
**What this doesn't support** · What I Learned

Sekcje bez pokrycia w danych **wypadają**. Nie dodajemy „Impact" z liczbą z sufitu — jeśli mierzalna
zmiana będzie tylko na prototypie, tak to nazwiemy.

### Zmiany w kodzie
| Plik | Zmiana |
|---|---|
| `lib/studies/types.ts` | Nowe warianty `Block`: `compare` (para przed/po, wspólny podpis) i `image` (`next/image`) + nowe `ChartId` |
| `components/study/StudyBlocks.tsx` | Gałęzie dla obu nowych bloków — dispatcher już to zakłada |
| `lib/studies/krakow-rental-search.ts` | Nowa praca, na wzór `krakow-overtourism.ts` |
| `lib/studies/index.ts` | Wpis w tablicy; kolejność wyznacza featured |
| `components/charts/` + `registry.tsx` | 2–3 wykresy (macierz dotkliwości, metryki zadaniowe przed/po). **Każdy z ukrytą tabelą przez `Figure.tsx`** |
| `lib/data/rental/` + `SOURCES.md` | Dane i pochodzenie każdej liczby |
| `lib/site.ts` | `intro` mówi „One study so far" — do przepisania |
| `app/page.tsx` | Nic. Lista `rest` i licznik już obsługują drugą pracę |

Obrazy: CSP ma `img-src 'self' data:` — pliki z `public/` przechodzą bez zmian w polityce.

### Weryfikacja przed „gotowe"
```bash
npx tsc --noEmit
```
Build (z zatrzymanym `next dev` — inaczej pada podgląd):
```bash
rm -rf .next && npm run build
```
Audyt liczb — zero nierozliczonych:
```bash
python scripts/audit-published-numbers.py
```
Plus: przegląd na 375 i 1280 px (kontrast, cele dotykowe, brak poziomego scrolla),
brak em dashów w treści, `lang="pl"` na każdym polskim cytacie, audyt `impeccable`.

---

## Kolejność i tempo

| Dzień | Co | Kto |
|---|---|---|
| 0 | Przegląd heurystyczny + etap 1 + screener + zgoda + scenariusz | wspólnie |
| 1 | Publikacja ankiety, rekrutacja | Ty |
| 2–3 | 6 testów | Ty |
| 4 | Analiza i synteza | wspólnie |
| 5 | IA, flow, wireframe'y | wspólnie |
| 6 | Hi-fi + prototyp | wspólnie |
| 7 | Retest 4–5 osób | Ty |
| 8 | Iteracja + before/after | wspólnie |
| 9–10 | Case study na stronie + audyt | wspólnie |

## Ryzyka
1. **Rekrutacja się ślimaczy** → zaczynamy od 4 testów, dobieramy w trakcie. Nie czekamy na komplet.
2. **Punkt porażki okaże się nieprawdziwy** → krok 0 to wykryje przed rekrutacją; zmieniamy przepływ.
3. **Prototypowanie przez MCP nie działa** → linkujesz ręcznie, ~15 min. Nie blokuje niczego.
4. **Temat jest wyeksploatowany** → obrona to wąski segment, prawdziwe cytaty i przypis od każdej
   decyzji do ustalenia. Jeśli tego zabraknie, projekt pracuje przeciwko Tobie.
