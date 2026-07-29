# Handoff — portfolio Grzegorza Seweryna

Kontekst dla nowej sesji. Przeczytaj to zamiast odtwarzać historię rozmowy.

Stan na: 28 lipca 2026.

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

**`myfonts/` zawiera licencjonowane kroje** (Druk Wide, Noirden). Przed
upublicznieniem repozytorium sprawdź licencję — jeśli nie pozwala, dodaj do
`.gitignore`, a WOFF2 odtwarza `scripts/build-webfonts.py`.

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

### Etap A — dokończenie strony

Zrobione: usunięcie czterech fikcyjnych case studies, obsługa strony z jedną pracą
(brak bloku „Next study", licznik prac, ukryty pusty indeks), ukrycie linków do CV.

**Zostało — zablokowane na danych od właściciela:**

1. **`lib/site.ts`** — trzy `TODO(replace)`: prawdziwy e-mail (teraz
   `hello@grzegorzseweryn.com`), lokalizacja, LinkedIn (teraz `https://www.linkedin.com/`)
   i link „Read / Writing" (teraz `https://medium.com/`). Martwe linki są gorsze
   niż ich brak — jeśli profilu do pisania nie ma, usuń pozycję.
2. **CV** — `site.resumeHref` jest `null`, więc wszystkie trzy przyciski pobierania
   są ukryte. Wystarczy wrzucić plik do `public/` i ustawić ścieżkę, żeby wróciły.
   Poprzedni plik był 683-bajtowym placeholderem i został usunięty.
3. **Portret na `/about`** — wciąż pusta ramka `MediaFrame`. Właściciel nie ma
   jeszcze zdjęcia.

**Zostało — do zrobienia bez blokad:**

4. **Kompresja PDF-a pracy** — 6,2 MB, cel ~2 MB przez downsampling obrazów.
   Jeśli ucierpi czytelność tabel, zostaw oryginał.
5. **Obraz OG** dla case study — `generateMetadata` w `app/work/[slug]/page.tsx`
   już istnieje, brakuje statycznego PNG w `public/`.

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
