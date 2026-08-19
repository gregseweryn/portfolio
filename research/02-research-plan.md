# Etap 2 — Plan badań

Projekt: przepływ ustalania realnego kosztu najmu w Otodom
Wersja: 1.0 · 3 sierpnia 2026

---

## 1. Co badamy i czego nie badamy

**Badamy:** czy i jak użytkownik ustala realny miesięczny koszt oferty najmu, oraz co się
dzieje z jego decyzją, gdy koszt okazuje się inny, niż zakładał.

**Nie badamy:** wiarygodności ogłoszeń, duplikatów, jakości zdjęć, procesu kontaktu
z ogłoszeniodawcą, podpisania umowy. Wszystko to jest realnym problemem tego rynku
i wszystko to jest **świadomie poza zakresem**. Trafi do sekcji „czego nie zbadałem".

Powód zawężenia: mamy jeden twardy, mierzalny punkt porażki i jedną liczbową metrykę.
Projekt, który próbuje pokazać wszystko, nie pokazuje niczego.

---

## 2. Metody

| Metoda | n | Odpowiada na | Kiedy |
|---|---|---|---|
| Ankieta online | 30–50 | RQ5, rekrutacja | Dzień 1–3, w tle |
| Moderowany test użyteczności | 6 | RQ1–RQ4 | Dzień 2–3 |
| Retest na prototypie | 4–5 | Zmiana metryki | Dzień 7 |

Ankieta i testy biegną **równolegle**, nie sekwencyjnie. Ankieta nie steruje scenariuszem
testów. To ten sam układ co w badaniu magisterskim i z tego samego powodu: rozbieżność
między strandami jest wynikiem, a nie kłopotem.

---

## 3. Dobór uczestników

**Kryterium wejścia:** szukał mieszkania na wynajem długoterminowy w Krakowie w ciągu
ostatnich 12 miesięcy i korzystał przy tym z Otodom.

**Dobór celowy przez kontrast** (ta sama logika co dobór rozmówców w magisterce):

| Wymiar | Chcemy po obu stronach |
|---|---|
| Doświadczenie | pierwszy najem w życiu ↔ trzeci lub kolejny |
| Sytuacja | student / pierwsza praca ↔ osoba pracująca, wyższy budżet |
| Kanał | szukał sam ↔ korzystał z pośrednika |
| Rezultat | wynajął ↔ zrezygnował lub wciąż szuka |

**6 osób.** Nie 5, bo cztery wymiary kontrastu wymagają minimum sześciu obsadzeń.
Nie 10, bo przy powtarzalnym zadaniu nasycenie przychodzi wcześniej, a różnica
w wykrywalności problemów nie uzasadnia czterech dodatkowych dni.

**Rekrutacja:** krakowskie grupy na Facebooku (najem, dzielnicowe, studenckie),
przez ankietę z pytaniem o gotowość do udziału. Bez wynagrodzenia; jeśli rekrutacja
utknie, rozważyć drobną rekompensatę i **odnotować to w case study**.

---

## 4. Scenariusz testu

**Czas:** 45–60 min. **Urządzenie:** telefon uczestnika, przeglądarka, otodom.pl.
**Nagranie:** ekran telefonu + głos, za zgodą.
**Forma:** zdalnie (udostępnienie ekranu) lub na żywo.

### Przygotowanie moderatora przed każdą sesją (10 min)

Rynek jest żywy, więc oferty trzeba dobrać na świeżo i **zapisać ich identyfikatory**,
żeby sesje dały się porównać i odtworzyć.

Wybierz i zanotuj w arkuszu:
- **Oferta A** — niższa cena bazowa, wysoki czynsz (np. 2500 + 1200 = 3700)
- **Oferta B** — wyższa cena bazowa, niski czynsz (np. 3200 + 350 = 3550)
  → **B musi być realnie tańsza od A, mimo wyższej ceny bazowej.** To jest test H3.
- **Oferta C** — karta bez podanego czynszu (drugi wiersz pokazuje zł/m²). Test H4.

### Scenariusz budżetowy (stały dla wszystkich uczestników)

> „Masz **3500 zł miesięcznie na mieszkanie. Na wszystko**: czynsz dla właściciela,
> czynsz administracyjny, prąd, gaz, internet. Szukasz dwupokojowego w Krakowie."

Kwota jest stała celowo. Gdyby każdy używał własnego budżetu, błąd oszacowania
przestałby być porównywalny między uczestnikami.

### Zadania

| # | Zadanie | Hipoteza | Co mierzę |
|---|---|---|---|
| **Z1** | „Ustaw wyszukiwanie tak, żeby pokazywało mieszkania, na które Cię stać." | H2 | Jaką liczbę wpisuje w filtr ceny. Czy odejmuje cokolwiek. Werbalizacja |
| **Z2** | „Wybierz z wyników ofertę, którą byś obejrzał." | — | Kryteria wyboru, na co patrzy na karcie |
| **Z3** | „Ile zapłacisz za to mieszkanie w pierwszym miesiącu, a ile w drugim?" | H1 | **Błąd oszacowania w zł.** Czy uwzględnia kaucję, czynsz, media. Czas do odpowiedzi |
| **Z4** | Pokazuję ofertę A i B: „Która jest dla Ciebie tańsza?" | H3 | Trafność wskazania. Czy sięga po czynsz bez podpowiedzi |
| **Z5** | Pokazuję ofertę C: „Ile będzie kosztować ta?" | H4 | Czy zauważa brak danych. Co robi dalej |
| **Z6** | Retro: „Kiedy ostatnio szukałeś mieszkania, co Cię zaskoczyło w kosztach?" | — | Materiał jakościowy, cytaty |

**Kolejność jest istotna:** Z1–Z3 przed Z4–Z5. Po zadaniu porównawczym uczestnik
jest już uczulony na czynsz i naturalne zachowanie znika.

### Po każdym zadaniu
**SEQ** (Single Ease Question): *„Jak łatwe było to zadanie?"* 1 = bardzo trudne,
7 = bardzo łatwe. Jedno pytanie, bez komentarza moderatora.

---

## 5. Dane zbierane

| Dane | Typ | Do czego |
|---|---|---|
| Kwota wpisana w filtr ceny | liczba | H2 |
| Oszacowanie kosztu pierwszego i drugiego miesiąca | liczba | **H1, metryka główna** |
| Koszt rzeczywisty wybranej oferty | liczba | mianownik dla błędu |
| **Błąd oszacowania = |oszacowanie − rzeczywisty|** | liczba (zł i %) | **metryka przed/po** |
| Trafność wskazania tańszej oferty (Z4) | tak/nie | H3 |
| Zauważenie braku czynszu (Z5) | tak/nie | H4 |
| Ukończenie zadania | tak/z pomocą/nie | standard |
| Czas do ustalenia pełnego kosztu | sekundy | wsparcie |
| SEQ po zadaniu | 1–7 | wsparcie |
| Cytaty dosłowne | tekst | case study |

**Metryka główna projektu: błąd oszacowania kosztu w złotych.**
Jedna liczba, zrozumiała bez tłumaczenia, mierzalna przed i po. To ona zamyka pętlę.

---

## 6. Analiza

**Jakościowa.** Kodowanie otwarte notatek i transkrypcji, grupowanie w tematy.
Przy sześciu sesjach analiza tematyczna, bez CAQDAS. Ta sama argumentacja co
w magisterce: przy tej wielkości korpusu zanurzenie bije narzędzie.

**Ilościowa.** Statystyka opisowa: mediana i zakres błędu oszacowania, liczba
uczestników na zachowanie. **Bez testów istotności.** Przy n = 6 wartość p
byłaby ozdobą udającą dowód, a to jest dokładnie ten rodzaj nadinterpretacji,
przeciwko któremu argumentuje pierwszy case study.

**Priorytetyzacja.** Macierz: częstość wystąpienia × dotkliwość (skala Nielsena 1–4)
× szacowany koszt naprawy. Projektujemy tylko górną połowę.

**Progi raportowania.** Zachowanie wystąpiło u:
1–2 osób → sygnał, wymaga dalszego badania ·
3–4 → wzór wart projektowania ·
5–6 → ustalenie mocne jak na tę próbę.
Ustalone **przed** zebraniem danych, żeby próg nie dopasował się do wyniku.

---

## 7. Retest (dzień 7)

4–5 osób, **te same zadania Z1, Z3, Z4** na prototypie. Ta sama metryka.

**Uczciwość porównania — co trzeba powiedzieć wprost w case study:**
- Częściowo inne osoby niż w pierwszej rundzie
- Prototyp nie ma pełnej bazy ofert, więc zadanie jest łatwiejsze z przyczyn
  niezwiązanych z projektem
- Efekt nowości i chęć sprawiania przyjemności badaczowi działają na korzyść prototypu

Wniosek będzie brzmiał „w tym teście, na tej próbie, błąd spadł z X na Y zł",
a nie „poprawiłem zrozumienie kosztu o Z%".

---

## 8. Harmonogram

| Dzień | Działanie |
|---|---|
| 1 | Publikacja ankiety w grupach, start rekrutacji |
| 2–3 | 6 sesji testowych, 2–3 dziennie |
| 4 | Analiza i synteza |
| 5 | IA, user flow, wireframe'y |
| 6 | Hi-fi UI, prototyp |
| 7 | Retest, 4–5 osób |
| 8 | Iteracja, materiał przed/po |
| 9–10 | Case study na stronie, audyt |

## 9. Artefakty

Research plan · screener · scenariusz moderacji · formularz zgody · arkusz obserwacji ·
macierz problemów · journey map · user flow · IA · wireframe'y · hi-fi UI · prototyp ·
raport przed/po · case study
