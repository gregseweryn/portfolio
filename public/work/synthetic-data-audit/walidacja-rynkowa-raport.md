# Walidacja rynkowa — jak bardzo dane wygenerowane przez model odbiegają od rynku

Projekt: przepływ ustalania realnego kosztu najmu w Otodom
Data: 2 września 2026

---

> ## ⚠ Ten raport został zastąpiony tego samego dnia. Przeczytaj to najpierw.
>
> Dokument opiera się na kotwicach z sieci. Kilka godzin po jego napisaniu okazało się,
> że lepszy arbiter leżał w repozytorium przez cały czas: **423 oferty zmierzone na
> otodom.pl 4 sierpnia 2026** (`../audyt/listings-audit-2026-08-04.csv`). Po przeliczeniu
> wobec pomiaru dwie rzeczy się zmieniły:
>
> | | Ten raport | Po przeliczeniu na 423 ofertach |
> |---|---|---|
> | Czynsz adm., mediana rynkowa | 550 zł | **700 zł** |
> | Odchylenie O-1 | +55% | **+11%** |
> | Udział ofert bez czynszu na karcie (K-15) | zał. 30% | **5,5%** |
> | Korpus AI, n dla czynszu | 31 | **23** |
>
> Dwie przyczyny. Po pierwsze, kotwica K-06 była za niska — raport sam wskazywał ją
> w §7 jako najczulszy parametr na najsłabszym źródle, i tak właśnie wyszło.
> Po drugie, **do korpusu AI policzyłem osiem wierszy przeglądu heurystycznego
> z `01-problem.md`, które są pomiarem, nie wynikiem modelu.** To zawyżyło medianę
> korpusu z 780 zł do 850 zł.
>
> **Nie publikuj +55% nigdzie.** Obowiązujący zapis to `scripts/extract-synthetic-audit.py`
> i `lib/data/synthetic/`, wraz z `lib/data/synthetic/SOURCES.md`. Ten dokument zostaje
> w repozytorium nieprzepisany, bo jest dowodem na to, co robi walidacja oparta wyłącznie
> na źródłach wtórnych — a przepisanie go po poznaniu odpowiedzi zniszczyłoby ten dowód.
>
> Co przeżyło bez zmian: **O-2, kolaps wariancji** (σ 243 wobec 557 zł na cenie bazowej),
> **O-3 i O-4**, czyli zerowa wariancja mediów i kaucji, oraz wniosek z §6, że miary
> centralne trafiają, a ogony znikają. Zmieniła się skala O-1, nie kierunek.

---

## 1. Po co to jest

Zbiór w `data/` został wygenerowany przez model językowy. Zanim posłuży do czegokolwiek,
trzeba wiedzieć, w którą stronę i o ile model minął się z rynkiem. Ten dokument nie
poprawia tamtych danych. Buduje obok nich **punkt odniesienia zakotwiczony w publicznie
dostępnych danych rynkowych** i mierzy różnicę.

Zbiór odniesienia też jest syntetyczny. Różnica polega na tym, że każdy jego parametr ma
przypisane źródło w `zrodla-rynkowe.csv` albo jest jawnie oznaczony jako założenie.
**To nie są dane rzeczywiste i nie zastępują zliczenia ofert na otodom.pl.**

## 2. Artefakty

| Plik | Zawartość |
|---|---|
| `zrodla-rynkowe.csv` | 16 kotwic: wartość, zakres, populacja, data, URL, klasa dowodu |
| `generuj-oferty-rynkowe.py` | Generator, każdy parametr podpisany numerem kotwicy |
| `oferty-rynkowe-syntetyczne.csv` | 250 ofert 2-pokojowych, Kraków |
| `porownaj-ai-vs-rynek.py` | Skrypt porównawczy |
| `porownanie-ai-vs-rynek.csv` | Tabela odchyleń |

Ziarno losowe stałe (`20260902`), więc zbiór odtwarza się co do wiersza.

## 3. Kalibracja zbioru odniesienia

| Wielkość | Cel (kotwica) | Uzyskano | Reszta |
|---|---|---|---|
| Mediana ceny bazowej | 2800 zł (K-01) | 2800 zł | 0% |
| Średnia ceny bazowej | 2775 zł (K-02) | 2897 zł | +4,4% |
| Cena za m² | 66–71 zł (K-04) | 66,8 zł | w zakresie |
| Średni metraż | 44 m² (K-05) | 43,8 m² | −0,5% |
| Media łącznie | 350–600 zł (K-09) | mediana 420 zł | w zakresie |

Panel dzielnic obejmuje wyłącznie sześć dzielnic podanych w źródle i nadreprezentuje
drogie centrum, więc jego średnia ważona (3161 zł) została przeskalowana współczynnikiem
0,878. Drugi współczynnik (1,055) dostraja medianę. Oba są w kodzie jawne.

## 4. Wynik: sześć odchyleń

| Zmienna | Mediana AI | Mediana rynek | Odchylenie | Rozrzut AI (σ) | Rozrzut rynek (σ) |
|---|---|---|---|---|---|
| Czynsz administracyjny | 850 zł | 550 zł | **+55%** | 295 | 228 |
| Cena bazowa | 2900 zł | 2800 zł | +3,6% | **229** | **662** |
| Media szacowane | 300 zł | 420 zł | **−29%** | **0** | 69 |
| Kaucja (krotność) | 1,0× | 1,0× | 0% | **0** | 0,5 |
| Prowizja pośrednika | 0 zł | 0 zł | — | 570 | 1701 |
| Narzut ponad cenę bazową | 38,8% | 33,8% | +14,6% | 16,0 | 11,0 |

n dla czynszu i ceny: 31 wartości modelu (24 oferty z sesji, 4 z retestu, 8 z tabeli
przeglądu heurystycznego w `01-problem.md`) wobec 250 ofert odniesienia.

### O-1. Czynsz administracyjny zawyżony o połowę
Model dał medianę 850 zł przy rynkowej 550 zł. **39% wygenerowanych ofert ma czynsz
powyżej 900 zł; w zbiorze odniesienia 9%.** Wartości 1200 i 1250 zł, użyte w zadaniu
porównawczym Z4 jako oferta A, leżą w okolicach 98. percentyla rynku. Model wybrał
skrajność rynku jako przypadek typowy.

### O-2. Rozrzut cen bazowych trzykrotnie za wąski
Odchylenie standardowe 229 zł wobec 662 zł. Wszystkie 24 oferty modelu mieszczą się
w 2450–3300 zł — czyli w wąskim pasie wokół budżetu scenariusza (3500 zł). Rynek ma
dwupokojowe za 1800 zł w Nowej Hucie i za 4500 zł w Zwierzyńcu. **Model wygenerował
nie rynek, tylko okolicę zadania.** To najbardziej systematyczne odchylenie w zbiorze,
mimo że mediana trafia niemal idealnie. Zgodność miary centralnej ukryła brak ogona.

### O-3. Media jako stała
Wszystkie 24 oferty mają `media_szacowane = 300`. Jedna unikalna wartość na 24 wiersze,
odchylenie standardowe zero. Zbiór odniesienia ma 33 unikalne wartości i medianę 420 zł.
Zaniżenie o 29% i zerowa wariancja w zmiennej, która na rynku waha się z sezonem,
metrażem i sposobem ogrzewania.

### O-4. Kaucja zawsze równa dokładnie jednemu czynszowi
24 oferty, 24 razy `kaucja = cena_bazowa`. Rynek zna kaucję dwumiesięczną
(przyjęte 23% ofert) i oferty bez kaucji. Model odtworzył regułę z definicji, nie rozkład.

### O-5. Prowizja pośrednika praktycznie nieobecna
Prowizja niezerowa w 1 ofercie na 24 (4%). Przy przyjętym udziale ofert agencyjnych 45%
to zaniżenie kosztu wejścia o cały jeden czynsz w blisko połowie przypadków. Trzeba
zaznaczyć: **udział 45% jest moim założeniem bez źródła (K-16)**, więc to odchylenie ma
najsłabszą podstawę z całej szóstki.

### O-6. Narzut przesadzony, i to z niewłaściwych składników
Model pokazuje narzut 38,8% ponad cenę bazową wobec 33,8% w odniesieniu. Różnica sama
w sobie niewielka, ale powstaje przez złożenie dwóch błędów o przeciwnych znakach:
zawyżony czynsz (+300 zł) i zaniżone media (−120 zł). **Model trafił mniej więcej
w sumę, myląc się w obu składnikach** — a to właśnie rozbicie na składniki jest
przedmiotem tego badania.

## 5. Czy ustalenia projektu przeżywają konfrontację

To jest ważniejsze niż same odchylenia. Sprawdzam trzy właściwości systemu z `01-problem.md`
na zbiorze odniesienia, nie na danych modelu.

| Właściwość | Deklaracja w 01-problem.md | Zbiór odniesienia | Werdykt |
|---|---|---|---|
| **W1** — filtr „do 3000 zł" wpuszcza oferty droższe | 8/8 ofert przekracza, o 17–35% | pas 2500–3000 zł: **89%** przekracza, mediana przekroczenia **11%** (p90 = 26%) | **kierunek potwierdzony, skala zawyżona** |
| **W2** — porządek cenowy się odwraca | pokazane na jednej parze | odwrócenie w **9,2%** losowych par ofert (n = 19 304) | **potwierdzone, ale rzadsze niż sugeruje narracja** |
| **W3** — brak czynszu nieodróżnialny od zera | obserwacja jakościowa właściwości interfejsu | nie podlega walidacji liczbowej | **poza zasięgiem tej metody** |

Wniosek: **problem jest realny, prezentacja jest podkręcona.** Zdanie „żadna oferta
z pierwszej strony nie kosztuje mniej niż 3000 zł" broni się (89% w porównywalnym pasie),
ale „przekroczenie 17–35%" opisuje górny ogon rynku, nie jego środek. Uczciwa wersja
brzmi: mediana przekroczenia 11%, dziewiąty decyl 26%.

## 6. Wzorzec odchyleń

Cztery obserwacje układają się w jedno:

1. **Miary centralne trafiają, ogony znikają.** Cena bazowa: mediana pudłuje o 3,6%,
   odchylenie standardowe o 65%. Sama zgodność mediany nie jest dowodem realizmu zbioru.
2. **Stałe zamiast rozkładów.** Media i kaucja mają wariancję dokładnie zero. Model
   podstawił regułę tam, gdzie rynek ma rozrzut.
3. **Skrajność jako przypadek typowy** w zmiennej, która niesie tezę. Zawyżony jest
   dokładnie ten składnik, o którym jest całe badanie.
4. **Wszystko ciąży ku zadaniu.** Ceny skupiają się wokół budżetu scenariusza, bo model
   generował ilustrację do hipotezy, a nie próbkę rynku.

Trzeci i czwarty punkt to jeden mechanizm: dane potwierdzają tezę mocniej, niż zrobiłby
to rynek. Przy zbiorze wygenerowanym po sformułowaniu hipotez to jest ryzyko wbudowane
w metodę, nie wypadek.

## 7. Czego ten dokument NIE dowodzi

- **Że zbiór odniesienia jest prawdą.** Też jest syntetyczny. Jest tylko lepiej
  udokumentowany. Rozstrzygnąć może wyłącznie zliczenie realnych ofert na otodom.pl.
- **Że rozkłady rynkowe są dobrze dobrane.** Stawka czynszu (12,0 zł/m²) to mój wybór
  środka między poradnikowymi 8–12 zł/m² a samozgłoszeniową medianą 15,33 zł/m² ze
  SprawdzCzynsz. Przy stawce 15,33 zł/m² odchylenie O-1 spada z +55% do około +11%.
  **To najczulszy parametr całego porównania i trzyma się na najsłabszym źródle.**
- **Że dwa założenia bez źródła są trafne.** K-15 (udział kart z czynszem, 0,70)
  i K-16 (udział ofert agencyjnych, 0,45) są zgadnięte. O-5 stoi wyłącznie na K-16.
- **Że dane jakościowe są równie odchylone.** Transkrypcje, cytaty i kody nie podlegają
  tej metodzie. Sprawdzone zostały wyłącznie liczby.
- **Że którakolwiek hipoteza H1–H4 jest potwierdzona lub obalona.** Ten dokument dotyczy
  właściwości ofert, nie zachowania uczestników.

## 8. Co zrobić dalej

1. **Zliczyć ręcznie 50–100 realnych ofert na otodom.pl** (Kraków, 2 pokoje): cena bazowa,
   czynsz z karty, obecność czynszu, typ ogłoszeniodawcy. To zamyka K-06, K-15 i K-16
   i zamienia zbiór odniesienia z syntetycznego na obserwacyjny. Jeden wieczór pracy.
2. **Przeliczyć tabelę przeglądu heurystycznego** w `01-problem.md` na medianę zamiast
   na zakres z ośmiu ofert dobranych z góry filtra.
3. **Poprawić zakres przekroczenia w case study** z „17–35%" na medianę i decyl,
   z podaniem pasa cenowego, w którym mierzono.
4. Jeżeli dane z `data/` mają posłużyć jako materiał portfolio — **oznaczyć je
   wprost jako syntetyczne** i dołączyć ten raport. Zbiór wygenerowany, ale zwalidowany
   i opisany, jest mocniejszym materiałem niż zbiór wygenerowany i przemilczany.

---

## Źródła

- [Znajdź Najem — raport Kraków, kwiecień 2026](https://znajdznajem.pl/krakow/raport/2026-04)
- [Znajdź Najem — ile kosztuje wynajem w Krakowie](https://znajdznajem.pl/poradnik/ile-kosztuje-wynajem-krakow)
- [SprawdzCzynsz — statystyki opłat w Krakowie](https://www.sprawdzczynsz.pl/krakow/statystyki)
- [GAMP Kraków — rynek najmu 2026: dane, mediany, ryzyka](https://www.gamp-krakow.pl/rynek-najmu-krakow-2026-dane-mediany-ryzyka/)
- [Activ Investment — koszty wspólnoty mieszkaniowej 2026](https://www.activ-investment.eu/blog/wspolnota-mieszkaniowa-koszty/)
- [Activ Investment — czynsz za mieszkanie własnościowe 2026](https://www.activ-investment.eu/blog/ile-wynosi-czynsz-za-mieszkanie-wlasnosciowe-przyklad-2026/)
- [Santeos — ceny mediów w Polsce: prąd, gaz, woda, internet](https://santeos.pl/ceny-mediow-w-polsce-prad-gaz-woda-internet-wyliczenia/)
- [PewnyLokal — prowizja pośrednika i agencji nieruchomości](https://pewnylokal.pl/ile-bierze-posrednik-nieruchomosci-i-agencja-nieruchomosci)
- [Bożyk Nieruchomości — prowizje biur nieruchomości, stawki 2026](https://www.bozyknieruchomosci.pl/blog/prowizje-biur-nieruchomosci-w-2025/)
- [Lumo Estate — stawki najmu w dzielnicach Krakowa 2026](https://lumoestate.pl/ile-kosztuje-wynajem-mieszkania-w-krakowie-stawki-dla-dzielnic/)
