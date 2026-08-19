# Etap 1 — Definicja problemu

Projekt: przepływ ustalania realnego kosztu najmu w Otodom
Data: 3 sierpnia 2026
Badacz: Grzegorz Seweryn

---

## 1. Skąd ten temat

Z danych, nie z pomysłu. Najsilniejszym consensusem badania turystyfikacji Krakowa
(n = 446) była zgoda **88,1%** respondentów, że turystyka podbija czynsze, z najmniejszym
rozrzutem odpowiedzi w całym kwestionariuszu. Tamto badanie kończyło się na tym, że ludzie
odczuwają presję czynszową. Ten projekt idzie o krok dalej: do miejsca, w którym te osoby
faktycznie spotykają rynek najmu.

---

## 2. Dowód wstępny (przegląd heurystyczny, 3.08.2026)

Zebrany przed rekrutacją, żeby potwierdzić, że problem istnieje, zanim ktokolwiek poświęci
na niego godzinę. **To nie są wyniki badania z użytkownikami. To obserwacja właściwości
systemu.** W case study musi być tak oznaczone.

**Procedura:** otodom.pl, wyniki najmu dla Krakowa, filtr `cena do 3000 zł`, `2 pokoje`.
Odczyt pierwszej strony wyników.

| Cena bazowa (zł) | Czynsz adm. (zł) | Koszt realny (zł) | Przekroczenie filtra |
|---|---|---|---|
| 2800 | 900 | 3700 | +23% |
| 3000 | 941 | 3941 | +31% |
| 2800 | 700 | 3500 | +17% |
| 2800 | 810 | 3610 | +20% |
| 3000 | 700 | 3700 | +23% |
| 2980 | 1070 | 4050 | +35% |
| 2840 | 1010 | 3850 | +28% |
| 2500 | 1200 | 3700 | +23% |

### Trzy właściwości systemu

**W1. Filtr ceny operuje na kwocie, której użytkownik nie płaci.**
Żadna oferta z pierwszej strony wyszukiwania „do 3000 zł" nie kosztuje mniej niż 3000 zł.
Przekroczenie: 17–35%, przed mediami.

**W2. Porządek się odwraca.**
Oferta za 2500 zł prezentuje się jako najtańsza na stronie. Przy czynszu 1200 zł jest
w środku stawki. Sortowanie po cenie porządkuje po innej liczbie niż ta, którą użytkownik
porównuje.

**W3. Drugi wiersz karty ma dwa różne znaczenia.**
Raz „+ czynsz: 400 zł/miesiąc" (składnik kosztu), raz „92,59 zł/m²" (cena jednostkowa).
W drugim wariancie realny koszt jest z karty niemożliwy do ustalenia, a użytkownik nie
dostaje sygnału, że danej informacji brakuje. Brak danych wygląda tak samo jak dane.

### Czego ten przegląd NIE dowodzi

Że użytkownicy tego nie zauważają, że im to przeszkadza, ani że wpływa na ich decyzje.
Doświadczony użytkownik może mieć nawyk doliczania czynszu i nie odczuwać żadnego problemu.
**Dokładnie to sprawdzają testy.** Jeśli okaże się, że wszyscy uczestnicy radzą sobie
bez trudu, to jest wynik i tak zostanie opisany.

---

## 3. Problem statement (wstępny)

> Osoba szukająca mieszkania na wynajem w Krakowie podejmuje decyzje o tym, które oferty
> obejrzeć i z którymi się skontaktować, na podstawie liczby, która nie jest kwotą, jaką
> zapłaci. Realny koszt miesięczny jest rozproszony między cenę bazową, czynsz administracyjny
> i media, a narzędzia porównawcze produktu (filtr, sortowanie, karta oferty) operują wyłącznie
> na pierwszym składniku.

**Do przepisania po etapie 3.** Ta wersja opiera się na właściwościach systemu, nie na
zachowaniu użytkowników.

---

## 4. Hipotezy

Formułowane tak, żeby dało się je obalić. Każda ma przypisany sposób pomiaru.

| # | Hipoteza | Jak ją obalę |
|---|---|---|
| **H1** | Poproszony o podanie kwoty pierwszego miesiąca uczestnik poda kwotę zaniżoną o co najmniej jeden składnik | Uczestnicy podają kwoty pełne lub zawyżone. Mierzone: błąd oszacowania w zł |
| **H2** | Uczestnik ustawia filtr ceny na wysokość swojego budżetu całkowitego, nie na budżet minus spodziewany czynsz | Uczestnicy jawnie odejmują czynsz przed ustawieniem filtra. Mierzone: obserwacja + pytanie kontrolne |
| **H3** | Przy dwóch ofertach o odwróconym porządku kosztu (tańsza bazowo, droższa realnie) uczestnik wskazuje jako tańszą tę o niższej cenie bazowej | Uczestnicy poprawnie wskazują tańszą realnie. Mierzone: zadanie porównawcze |
| **H4** | Brak informacji o czynszu na karcie nie jest zauważany jako brak | Uczestnicy spontanicznie komentują nieobecność czynszu. Mierzone: obserwacja, bez podpowiedzi |

**Uwaga:** H1–H4 to hipotezy robocze kierujące obserwacją, nie hipotezy statystyczne.
Przy n = 6 nie będą testowane istotnościowo i nie wolno ich tak raportować.

---

## 5. Cele

### Biznesowe (perspektywa produktu)
- Konwersja z wyszukiwania na kontakt z ogłoszeniodawcą
- **Jakość leada** — kontakt od osoby, która nie wycofa się po poznaniu pełnego kosztu
- Retencja szukającego — porzucenie sesji po serii rozczarowań ofertami poza budżetem
- Zaufanie do serwisu jako źródła danych o cenie

### Użytkownika
- Ustalić, ile realnie zapłacę miesięcznie
- Porównać dwie oferty bez arkusza kalkulacyjnego
- Nie tracić czasu na oferty, na które mnie nie stać
- Wiedzieć, kiedy informacji brakuje, a nie zakładać, że jej nie ma

---

## 6. Research questions

| # | Pytanie | Metoda |
|---|---|---|
| **RQ1** | Jak użytkownik konstruuje pojęcie „mój budżet" i którą liczbę na ekranie z nim zestawia? | Test moderowany, think-aloud |
| **RQ2** | W którym momencie przepływu dowiaduje się o czynszu administracyjnym i czy to zmienia jego decyzję? | Test moderowany, obserwacja |
| **RQ3** | Jak duży jest błąd oszacowania kosztu i czy zależy od doświadczenia? | Test, metryka liczbowa |
| **RQ4** | Co robi, gdy karta nie podaje czynszu? | Test, obserwacja |
| **RQ5** | Jak często i jak dotkliwie problem wystąpił w realnych poszukiwaniach? | Ankieta (n = 30–50) |

---

## 7. Założenia i ograniczenia

**Przyjęte założenia**
- Uczestnicy szukali najmu w Krakowie w ostatnich 12 miesiącach, więc kontekst jest im świeży
- Telefon jest realnym urządzeniem tego zadania, więc testujemy na telefonie uczestnika
- Otodom jest dominującym punktem wejścia dla tego rynku (do potwierdzenia w ankiecie, pytanie S4)

**Ograniczenia, które trafią do case study**
- Jedna osoba prowadzi rekrutację, moderację i analizę. Brak drugiego kodera, więc brak
  miary zgodności międzysędziowskiej
- Brak dostępu do analityki produktu. Wszystkie cele biznesowe są wywnioskowane, nie zmierzone
- Próba nieprobabilistyczna, rekrutacja przez krakowskie grupy na Facebooku. **Ten sam kanał
  i ta sama słabość co w badaniu magisterskim.** Kanał prawdopodobnie nadreprezentuje osoby,
  które miały z rynkiem najmu złe doświadczenia
- n = 6 w testach. Wystarcza do wykrycia powtarzalnych problemów użyteczności, nie wystarcza
  do żadnego uogólnienia ilościowego
- Brak możliwości wdrożenia. Zmianę mierzymy na prototypie, wobec grupy częściowo innych
  osób. **To nie jest dowód wpływu na produkcję i nie zostanie tak nazwane**
- Projektuję zmianę w cudzym produkcie bez dostępu do jego ograniczeń technicznych,
  biznesowych i prawnych. Część proponowanych rozwiązań może być z tych powodów niewykonalna

---

## 8. Etyka

- Zgoda obejmuje **od razu** publikację w portfolio online: anonimizowane cytaty i klipy
- Nie prosimy uczestnika o logowanie do konta ani o dane osobowe wykraczające poza screener
- Nie zbieramy danych kontaktowych z oglądanych ogłoszeń
- W materiałach publikowanych zamazujemy adresy, telefony, nazwiska i nazwy biur
- Surowe nagrania, transkrypcje i kontakty do uczestników **nie trafiają do repozytorium**
- Uczestnik może przerwać w dowolnym momencie bez podania powodu i wycofać zgodę do 14 dni

## 9. Co dalej

Etap 2: rekrutacja i teren. Dokumenty gotowe do użycia:
`02-research-plan.md` · `03-screener-pl.md` · `04-consent-pl.md` ·
`05-moderation-script-pl.md` · `06-observation-sheet.md`
