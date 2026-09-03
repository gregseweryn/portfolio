# Handoff — drugi case study: koszt najmu w Otodom

Kontekst dla nowej sesji. Przeczytaj to zamiast odtwarzać rozmowę.

Stan na: 4 sierpnia 2026.

> **Status na stronie: zdjęte z publikacji.** Case study najmu i towarzyszący mu
> audyt danych syntetycznych nie są wpięte w `lib/studies/index.ts`, więc strona
> pokazuje tylko magisterkę. Pliki `lib/studies/krakow-rental-search.ts` i
> `lib/studies/synthetic-data-audit.ts` zostają w repo bez zmian — żeby wrócić,
> wystarczy dopisać je do tablicy `studies` (magisterka pierwsza, bo trzyma slot
> featured). Powód: opis wymaga poprawek, a sesje ewaluacyjne nie są jeszcze
> przeprowadzone.

**Dwa dokumenty, dwie role:**

| Plik | Do czego |
|---|---|
| `docs/PLAN-rental-study.md` | Zatwierdzony plan, etapy 1–7. Ma na górze listę czterech rzeczy, które się w trakcie zdezaktualizowały |
| `docs/HANDOFF-rental-study.md` | Ten plik. Stan faktyczny: co zrobione, co nie, gdzie co leży |

Czytaj oba, ten najpierw.

---

## Czym jest ten projekt

Drugi case study do portfolio, po magisterce o turystyfikacji Krakowa.

**Skąd temat.** Nie z pomysłu, tylko z danych pierwszej pracy: najsilniejszym consensusem
tamtego badania była zgoda 88,1% respondentów, że turystyka podbija czynsze, z najmniejszym
rozrzutem w całym kwestionariuszu. Ten projekt idzie tam, gdzie ludzie spotykają ten rynek.

**Pytanie.** Czy osoba szukająca mieszkania potrafi ustalić, ile realnie zapłaci miesięcznie.

**Po co drugi projekt.** Magisterka dowodzi rygoru badawczego, ale nie pokazuje ewaluacji
interfejsu, craftu projektowego ani domkniętej pętli badanie → projekt → retest. Do tego
`/about` obiecuje 16 metod, a pierwszy case study potwierdza cztery. Ten projekt zamyka
tę różnicę.

**Zakres, zawężony świadomie.** Tylko koszt. Nie wiarygodność ofert, nie duplikaty, nie
kontakt z ogłoszeniodawcą. Jeden mierzalny punkt porażki i jedna metryka liczbowa.

---

## Ustalenie, na którym stoi cały projekt

Zmierzone na otodom.pl **4 sierpnia 2026**, powtarzalne przez każdego.

Filtr: wynajem / Kraków / 2 pokoje / **cena do 3000 zł**. Pierwsza strona wyników:

| Cena bazowa | Czynsz adm. | Koszt realny | Ponad filtr |
|---|---|---|---|
| 2800 | 900 | 3700 | +23% |
| 3000 | 941 | 3941 | +31% |
| 2800 | 700 | 3500 | +17% |
| 2800 | 810 | 3610 | +20% |
| 3000 | 700 | 3700 | +23% |
| 2980 | 1070 | 4050 | +35% |
| 2840 | 1010 | 3850 | +28% |
| 2500 | 1200 | 3700 | +23% |

Trzy właściwości systemu:

1. **Filtr ceny operuje na kwocie, której użytkownik nie płaci.** Żadna oferta z wyszukiwania
   „do 3000" nie kosztuje mniej niż 3000.
2. **Porządek się odwraca.** Oferta za 2500 zł wygląda na najtańszą, a przy czynszu 1200 zł
   jest w środku stawki.
3. **Drugi wiersz karty ma dwa znaczenia.** Raz „+ czynsz: 400 zł", raz „92,59 zł/m²".
   W drugim wariancie realny koszt jest z karty nie do ustalenia, a brak danej wygląda
   identycznie jak dana.

To są właściwości produktu, **nie wyniki badania z użytkownikami**. W case study muszą być
tak oznaczone.

---

## BLOKADA — przeczytaj przed pisaniem czegokolwiek

**Badania z ludźmi się nie odbyły.**

`research/data/` zawiera komplet: 6 transkrypcji, ankietę na 47 osób, metryki sesji, reteset.
Te dane są wygenerowane, nie zebrane:

- `research/data/skrypty/gen_ankieta.py`, `gen_testy.py`, `gen_analiza.py` wpisują każdą
  kwotę i każdy profil na sztywno
- `gen_testy.py` ma w ścieżce `/sessions/eager-happy-euler/`, czyli sandbox innej sesji
- `README-dane-syntetyczne.md` opisuje *projektowanie* zmienności: przypisane style wypowiedzi,
  celowy kontrprzykład U3, próg podobieństwa 0,59
- reteset ma datę **7.08.2026**, czyli po dacie powstania zbioru
- kwestionariusz S1–S14 i zadania Z1–Z6 powstały 3.08 o 17:00; dane odpowiadające im pojawiły
  się o 20:58, a cały korpus sześciu transkrypcji w oknie 22 minut

Właściciel projektu pamięta, że wgrywał transkrypcje, i **ma rację, tylko co do drugiego
projektu**. Nie powtarzaj tego szukania, zostało zrobione do końca:

- `Desktop/Praca magisterska/dane/wywiady_md/` — dziesięć transkrypcji (Deny, Ewa, Janina,
  Karolina, Marcin, Marta, Ola, Piotr, Ryszard, Tomek), czyli wywiady z magisterki.
  Opublikowane pseudonimy różnią się, bo była sesja „Chapter V writing with alias mapping"
- Dysk Google: formularz, arkusz odpowiedzi i dane magisterki. Nic o najmie
- zero nagrań audio i wideo na dysku, `paste-cache` i `downloads` puste
- pełnotekstowe przeszukanie **wszystkich** sesji: słowo „Otodom" nie pada ani razu.
  Ostatnia sesja przed 4.08 to 30.07, a temat najmu powstał 4.08 w trakcie rozmowy

**Konsekwencja praktyczna.** Zbiór jest użyteczny jako rusztowanie do zbudowania i przetestowania
analizy. Nie wolno go opublikować jako wyników badania. Tekst case study mówiący
„przeprowadziłem sześć sesji" wymaga sześciu prawdziwych sesji.

**Warstwa projektowa jest od tego niezależna** i nie wymaga rozstrzygnięcia: makieta, Figma
i wszystkie ekrany opierają się wyłącznie na pomiarach Otodomu z tabeli wyżej.

### Sprzątnięte 2.09.2026

Syntetyczny korpus był częściowo wciągnięty do bundla strony, choć nic go nie renderowało.
`components/charts/ErrorShift.tsx` i `CostComponents.tsx` były zarejestrowane w
`components/charts/registry.tsx` i czytały `lib/data/rental/{participants,summary,cost-components,survey}.json`,
czyli wygenerowane n=6 i n=5. Podpis `ErrorShift` głosił „mediana błędu spada z 2925 zł do 20 zł"
o sześciu osobach, które nie istnieją. Żadne studium nie miało bloku `figure` o tych identyfikatorach,
więc kod był martwy — ale importowalny, a to wystarczy, żeby kiedyś ożył przez pomyłkę.

Usunięte: oba komponenty, ich wpisy w rejestrze, identyfikatory `cost-components` i `error-shift`
z `ChartId`, cztery pliki JSON oraz `scripts/extract-rental-data.py`, którego jedyni konsumenci
zniknęli. Kontrakt tego skryptu (przelicz z najsurowszej kolumny, `--check`, nie zapisuj nic przy
jednej nieudanej kontroli) dziedziczy `scripts/extract-synthetic-audit.py`.

Korpus zostaje w `research/data/` jako materiał źródłowy trzeciego case study —
`/work/synthetic-data-audit` — gdzie jest cytowany wyłącznie przez swoje **właściwości
statystyczne**, nigdy przez swoje **ustalenia**.

---

## Co jest zrobione

### Dokumenty badawcze, gotowe do użycia
`research/01-problem.md` — problem statement, hipotezy H1–H4, cele, RQ1–RQ5, ograniczenia
`research/02-research-plan.md` — dobór, zadania Z1–Z6, metryki, analiza, progi raportowania
`research/03-screener-pl.md` — ankieta do wklejenia w Google Forms
`research/04-consent-pl.md` — zgoda, **z klauzulą portfolio w środku**
`research/05-moderation-script-pl.md` — scenariusz do czytania
`research/06-observation-sheet.md` — arkusz na sesję

Metryka główna: **błąd oszacowania kosztu pierwszego miesiąca w złotych**. Budżet w scenariuszu
stały, 3500 zł na wszystko, żeby błąd był porównywalny między uczestnikami.

### Makieta w kodzie
`C:\Users\grzeg\Documents\otodom-cost-mockup` (poza repo, celowo)

| Plik | Rola |
|---|---|
| `before.html` | wierna rekonstrukcja stanu obecnego |
| `after.html` | przeprojektowanie, działający filtr budżetu |
| `listing.html` | szczegół: koszt powtarzalny osobno od kosztu wprowadzenia |
| `tokens.css` | tokeny wspólne dla obu wersji |
| `listings.js` | 11 zmierzonych ofert z zapisem pochodzenia |
| `serve.py` | serwer z `no-store` |
| `README.md` | pełne pochodzenie każdej liczby |

Uruchomienie: `python serve.py 3300` albo konfiguracja `mockup` w `.claude/launch.json`.

**Nie używaj `python -m http.server`.** Nie wysyła `Cache-Control`, przeglądarka przytrzymuje
moduły ES i widzisz build, którego już nie ma. Kosztowało to dwa fałszywe odczyty.

### Figma
Plik: `https://www.figma.com/design/T6nk7sCtJZhg66zeqKCJHT`
FigJam: `https://www.figma.com/board/RcZtR1kIWeYPx4l85WLdc8`
Plan: `team::1624891726134606124`

- 13 kolorów, 13 liczb, 9 stylów tekstu, code syntax na 26 zmiennych
- komponent `Listing Card`, warianty `Cost=Known` / `Cost=Incomplete`
- cztery ekrany: `Before / Results`, `After / Results`, `After / Listing detail`,
  `After / Results, nothing fits`
- prototyp spięty przez `setReactionsAsync` (potwierdzone, że działa przez ten MCP)

`generate_figma_design` **nie istnieje** w tej instalacji. Jest tylko `use_figma`.

Eksporty 2x: `get_screenshot` nie skaluje ponad naturalny rozmiar węzła, więc trzeba sklonować
ekran, wywołać `rescale(2)`, wyeksportować przy 750×1624 i skasować klona.

### Kod portfolio
| Plik | Co |
|---|---|
| `scripts/extract-rental-data.py` | przelicza metryki od zera z surowych składników, odmawia zapisu przy jednym błędzie. Celowo **nie czyta** `research/data/analiza/` |
| `lib/data/rental/*.json` | agregaty |
| `components/charts/CostComponents.tsx` | składniki kosztu nazwane bez podpowiedzi |
| `components/charts/ErrorShift.tsx` | metryka główna, runda 1 vs reteset |
| `lib/studies/types.ts` | nowe bloki `image` i `compare`, nowe `ChartId` |
| `components/study/StudyBlocks.tsx` + `.module.css` | gałęzie i style obu bloków |

---

### Case study — OPUBLIKOWANY jako teardown, nie jako badanie

`lib/studies/krakow-rental-search.ts`, trasa `/work/krakow-rental-search`, wpisany do indeksu
jako druga praca. Magisterka zostaje featured.

Napisany jako **audyt interfejsu i przeprojektowanie**, bo tylko to jest pokryte dowodami.
Każda liczba pochodzi z pomiaru Otodomu z 4.08, żadna nie jest ustaleniem o użytkownikach.
Sekcja „What this doesn't support" mówi wprost, że nikt tego nie testował, i opisuje badanie
zaprojektowane, żeby to sprawdzić.

**Nie zmiękczaj tej sekcji, dopóki nie ma danych, które ją zastąpią.**

`scripts/audit-published-numbers.py` audytuje teraz **oba** studia. Wcześniej miał zaszytą
ścieżkę do jednej strony, więc nowe studium byłoby poza kontrolą.

## Czego brakuje

1. **Sześć sesji po 45 min.** Wszystko pod nie gotowe. Realnie dwa dni. Po nich case study
   awansuje z teardownu na pełne badanie: dochodzą sekcje z ustaleniami i reteset.
4. **Nagranie prototypu** do self-hosted wideo. Panel przeglądarki w tej sesji nie kompozytował
   klatek, więc żaden zrzut ani nagranie nie były możliwe po stronie agenta.
5. **Commit.** Nic nie jest zacommitowane.

---

## Decyzje, których nie podważaj

- **Zakres to tylko koszt.** Wiarygodność ofert i duplikaty są świadomie poza zakresem
  i trafiają do sekcji „czego nie zbadałem".
- **Makieta jest blisko oryginału.** Ta sama paleta, typografia i gęstość co Otodom, zmieniona
  wyłącznie struktura informacji o koszcie. To izoluje zmienną: jeśli błąd spadnie, to dlatego,
  że zmieniła się architektura informacji, a nie dlatego, że nowa wersja ładniej wygląda.
- **`before` i `after` dzielą `tokens.css`.** Każdy dryf między nimi konfunduje porównanie.
- **Bez logo i nazwy Otodom jako marki.** Makieta jest podpisana jako niezależna koncepcja.
- **Media i kaucja są szacunkami i są tak oznaczone w interfejsie.** Nie były na kartach,
  więc zamiast wymyślać kwoty per oferta stosujemy jedną nazwaną konwencję i pokazujemy ją.
- **Przy n = 6 bez person i bez testów istotności.** Profile zachowań i statystyka opisowa.
  Pierwszy case study argumentuje przeciwko własnej typologii; bądźmy spójni.
- **Rejestr makiety to `product`, nie `brand`.** Portfolio jest `brand`, makieta jest
  interfejsem produktowym, gdzie design służy zadaniu.

---

## Weryfikacja przed każdym „gotowe"

```bash
npx tsc --noEmit
```
```bash
python scripts/extract-rental-data.py --check
```
Build, z zatrzymanym serwerem podglądu:
```bash
rm -rf .next && npm run build
```
```bash
python scripts/audit-published-numbers.py
```

Plus przegląd na 375 i 1280 px, zero em dashów w treści, `lang="pl"` na każdym polskim cytacie.

Stan na dziś: `tsc` czysty, build 13 stron, audyt liczb zero nierozliczonych, kontrast bez
naruszeń (najgorszy 5,15:1), zero poziomego przewijania na 375 px.
