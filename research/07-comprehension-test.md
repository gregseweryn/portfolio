# Test rozumienia kosztu — plan eksperymentu

Metoda B z etapu 2. Randomizowany test międzygrupowy, prowadzony asynchronicznie
w Google Forms. Zero umawiania się, zero moderowania.

Wersja: 1.0 · 4 sierpnia 2026

---

## 1. Po co, skoro jest audyt

Audyt 423 ofert pokazuje, że **interfejs** rozmija się z kosztem. Nie pokazuje, że
**człowiek** się na tym przewraca. Doświadczony najemca może dodawać czynsz odruchowo
i nie mieć problemu.

Ten test rozstrzyga dokładnie to jedno pytanie, i robi to na próbie, która pozwala
mówić o różnicy między grupami, a nie o wrażeniach z sześciu obserwacji.

---

## 2. Dlaczego dwa zadania, a nie jedno

Gdyby jedynym zadaniem było „ile zapłacisz miesięcznie", wynik byłby **tautologiczny**:
przeprojektowana karta podaje tę kwotę wprost, więc wygrałaby z definicji. To nie byłby
eksperyment, tylko sprawdzenie, czy respondent umie przepisać liczbę.

Dlatego zadania są dwa i mierzą różne rzeczy.

| | Zadanie | Co naprawdę mierzy |
|---|---|---|
| **Z1** | Jedna karta: „ile zapłacisz miesięcznie?" | **Odsetek błędów w grupie kontrolnej.** Informacja jest na ekranie w obu wersjach; pytanie brzmi, czy ktoś jej użyje. Grupa z redesignem jest tu sufitem, nie przeciwnikiem |
| **Z2** | Dwie karty: „która tańsza?" | **Prawdziwe porównanie.** W obu wersjach trzeba zestawić dwie oferty, więc redesign nie ma przewagi z samego odczytu. To testuje defekt odwróconego porządku |

**Z2 jest zadaniem głównym.** Z1 raportujemy jako odsetek błędów w grupie kontrolnej,
z jawnym zastrzeżeniem o asymetrii.

---

## 3. Randomizacja w Google Forms

Formularze Google nie losują wariantów. Obejście, które nie psuje randomizacji:

> **Pytanie R:** „Czy dzień Twoich urodzin wypada na liczbę parzystą czy nieparzystą?"
> → parzysta: sekcja A · nieparzysta: sekcja B

Parzystość dnia urodzin jest niezwiązana z umiejętnością czytania ogłoszeń, więc przydział
jest efektywnie losowy. Nie jest to dana identyfikująca.

**Czego nie robić:** dwóch osobnych formularzy wrzucanych do różnych grup. To zamienia
randomizację w samodobór i unieważnia porównanie.

---

## 4. Bodźce

Cztery obrazy, wszystkie z tej samej oferty i tego samego zestawu danych.

**Gotowe.** `otodom-cost-mockup/stimuli/`, wszystkie w 2x, źródło na stronie `Stimuli`
w pliku Figmy.

| Bodziec | Grupa | Rozmiar | Zawartość |
|---|---|---|---|
| `stim-a1-current.png` | A | 750×700 | Jedna karta obecna: `2500 zł` + `czynsz: 1200 zł/miesiąc` |
| `stim-a1-redesign.png` | B | 750×680 | Ta sama oferta, karta przeprojektowana: `3700 zł/mies.` |
| `stim-a2-current.png` | A | 750×1208 | Para kart obecnych, ułożona pionowo |
| `stim-a2-redesign.png` | B | 750×1416 | Ta sama para, karty przeprojektowane |

### Para do Z2

Oferta o **wyższej** cenie ogłoszeniowej musi być realnie tańsza, inaczej zadanie
niczego nie testuje.

| | Cena ogłoszeniowa | Czynsz | Realnie |
|---|---|---|---|
| **Ogłoszenie 1** | 2500 zł | 1200 zł | **3700 zł** |
| **Ogłoszenie 2** | 3200 zł | 350 zł | **3550 zł** |

Poprawna odpowiedź: **Ogłoszenie 2**, mimo że wygląda drożej.

### Trzy decyzje przy budowie bodźców

**Bez mediów.** Prototyp dolicza szacowane 300 zł, bodźce nie. Szacunek czyniłby poprawną
odpowiedź sporną, a eksperyment potrzebuje dokładnej prawdy: 3700 zł to najem plus czynsz
i nic więcej.

**Ułożenie pionowe, nie obok siebie.** Respondenci będą na telefonach. Dwie karty obok
siebie na 375 px byłyby nieczytelne, a nieczytelny bodziec mierzy wzrok, nie rozumienie.
Stąd etykiety „Ogłoszenie 1 / 2" zamiast „lewa / prawa".

**Kolejność nie jest kontrbalansowana.** Oferta, która wygląda taniej, stoi zawsze pierwsza.
Tak wyglądałaby lista posortowana po cenie, więc jest to realistyczne, ale oznacza,
że efektu pierwszeństwa nie da się oddzielić od efektu projektu. **Do zaraportowania
w ograniczeniach.** Kontrbalansowanie wymagałoby czterech ramion zamiast dwóch i podwojenia
próby.

---

## 5. Kwestionariusz

### Wstęp
> **Dwie minuty, dwa pytania o ogłoszenia mieszkaniowe.**
>
> Pokażę Ci zrzuty ogłoszeń wynajmu i zapytam o kwoty. Nie sprawdzam Twojej wiedzy,
> tylko to, czy ogłoszenia da się zrozumieć. Nie ma tu podchwytliwych pytań.
>
> Ankieta jest anonimowa. Wyniki wykorzystam w projekcie do portfolio zawodowego.

### R. Randomizacja
**R1.** Dzień Twoich urodzin to liczba parzysta czy nieparzysta?
- Parzysta → sekcja A
- Nieparzysta → sekcja B

### Sekcja A lub B, zadanie Z1
*(obraz: `stim-a1-current.png` albo `stim-a1-redesign.png`)*

**Z1.** Ile zapłacisz za to mieszkanie **co miesiąc**? Podaj kwotę w złotych.
*(odpowiedź liczbowa, wymagana)*

**Z1b.** Na ile jesteś pewien tej kwoty?
*(1–5: zupełnie niepewny → całkowicie pewny)*

### Zadanie Z2
*(obraz: `stim-a2-current.png` albo `stim-a2-redesign.png`)*

**Z2.** Które z tych dwóch mieszkań będzie Cię **kosztować mniej miesięcznie**?
- Ogłoszenie 1
- Ogłoszenie 2
- Nie da się tego ustalić z tych ogłoszeń

*(Poprawna: Ogłoszenie 2. Opcja „nie da się" jest tu celowo — w wersji obecnej da się,
tylko wymaga dodawania, więc jej wybór jest osobną i ciekawą odpowiedzią.)*

**Z2b.** Skąd to wiesz? *(otwarte, nieobowiązkowe)*

### Sekcja wspólna
**D1.** Czy w ciągu ostatnich 24 miesięcy szukałeś mieszkania na wynajem?
- Tak, w Krakowie · Tak, w innym mieście · Nie

**D2.** Ile razy w życiu wynajmowałeś mieszkanie?
- Nigdy · Raz · Dwa razy · Trzy lub więcej

**D3.** Wiek: do 24 · 25–34 · 35–44 · 45+ · wolę nie podawać

### Debriefing *(ostatnia strona, po wysłaniu)*
> Dzięki. Jedno z tych ogłoszeń było w wersji obecnej, drugie w mojej przeprojektowanej.
> Sprawdzam, czy da się z nich odczytać realny koszt. Kwota, która pojawia się na karcie
> jako pierwsza, to zwykle sam czynsz dla właściciela; do tego dochodzi czynsz
> administracyjny, który potrafi być o 20% wyższy od tej kwoty.

Debriefing jest **po** wysłaniu, żeby nie skazić odpowiedzi.

---

## 6. Próba i analiza

**n ≈ 80**, po około 40 na grupę. Kanał: krakowskie grupy na Facebooku, ten sam co
w magisterce, z tą samą jawnie nazwaną słabością.

Przy tak dużym spodziewanym efekcie 40 na grupę spokojnie wystarcza. **Nie przerywaj
zbierania, kiedy zobaczysz ładny wynik** — ustal próg z góry i trzymaj się go, inaczej
liczba przestaje cokolwiek znaczyć.

### Zmienne
| Zmienna | Jak liczona |
|---|---|
| `blad_z1_zl` | \|odpowiedź − 3700\| — najem 2500 plus czynsz 1200, bez mediów |
| `trafny_z1` | błąd ≤ 100 zł |
| `trafny_z2` | wskazał ofertę Y |
| `pewnosc_z1` | 1–5 |
| `grupa` | A (obecna) / B (redesign) |

### Co raportujemy
- **Z2: odsetek trafnych wskazań w grupie A vs B.** To jest wynik główny
- **Z1: odsetek błędnych kwot w grupie A.** Podany osobno, z zastrzeżeniem o asymetrii
- Mediana i rozstęp błędu w złotych, osobno dla grup
- Zależność między pewnością a trafnością. Jeśli w grupie A pewność jest wysoka przy
  błędnych odpowiedziach, to jest wynik mocniejszy niż sam błąd

### Czego nie robimy
Nie dzielimy próby na podgrupy po fakcie w poszukiwaniu istotności. Zmienne D1–D3
służą do opisu próby, nie do fabrykowania efektów.

---

## 7. Etyka

- Ankieta anonimowa, bez danych kontaktowych
- Bodźce zanonimizowane: bez adresów, telefonów i nazw biur
- Debriefing wyjaśnia cel po wysłaniu
- Publikacja tylko zbiorcza, żadnych pojedynczych odpowiedzi z możliwością identyfikacji

---

## 8. Ograniczenia, do zaraportowania razem z wynikiem

- **Kolejność w Z2 nie jest kontrbalansowana.** Efektu pierwszeństwa nie da się oddzielić
  od efektu projektu
- **Z1 jest asymetryczne z konstrukcji.** Redesign podaje kwotę wprost, więc porównanie
  grup w tym zadaniu nie jest testem projektu, tylko sufitem. Wynikiem jest odsetek błędów
  w grupie kontrolnej
- **Próba nieprobabilistyczna** z krakowskich grup na Facebooku, ten sam kanał i ta sama
  słabość co w magisterce
- **Jedna para ofert.** Wynik dotyczy tej konkretnej różnicy kwot, a nie każdej możliwej
- **Bodziec to obraz, nie działający interfejs.** Nikt nie może kliknąć, przewinąć ani
  wejść w szczegóły oferty, więc test mierzy odczyt karty, nie proces szukania mieszkania

## 9. Następne kroki

1. ~~Przygotować cztery bodźce~~ **zrobione**, `otodom-cost-mockup/stimuli/`
2. Zbudować formularz w Google Forms z rozgałęzieniem na R1
3. Opublikować, zebrać około 80 odpowiedzi, mniej więcej dwa dni
4. Eksport CSV, analiza, dopisanie sekcji z wynikami do case study
