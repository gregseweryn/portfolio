<!-- REKONSTRUKCJA (29.07.2026). Oryginalny PRODUCT.md przepadł, gdy z katalogu
     głównego zniknęły pliki, a repozytorium git się uszkodziło — nie było go ani
     na dysku, ani w obiektach gita, ani w koszu, ani w OneDrive.

     Ten plik odtworzono z: (a) zasad, które były cytowane w tej sesji podczas
     audytu, (b) treści DESIGN.md, który powołuje się na „strategię projektu",
     (c) samego kodu — lib/site.ts, PRODUCT-owe reguły widoczne w komponentach.

     Pewne: rejestr `brand`, odbiorca, reguła „respect the skim", zobowiązanie do
     WCAG AA, trzy odrzucone estetyki, pozycjonowanie.
     Odtworzone swobodnie: sformułowania, kryteria sukcesu, sekcja o zakresie.

     Przejrzyj i popraw wszystko, co rozminęło się z Twoim oryginałem. -->

---
name: Grzegorz Seweryn — Portfolio
description: Portfolio badacza UX szukającego pierwszej roli — jedna głęboka praca zamiast wielu płytkich.
register: brand
---

# Product: Grzegorz Seweryn — Portfolio

## 1. Po co ta strona istnieje

Ma doprowadzić do rozmowy o pracę. Nie do zbudowania marki osobistej, nie do ruchu
z wyszukiwarki, nie do zapisów na newsletter. Jedno zadanie: sprawić, żeby osoba
decydująca o zaproszeniu na rozmowę uznała, że warto.

To jest rejestr **brand** — design *jest* produktem. Strona nie opisuje warsztatu,
tylko go demonstruje. Jeśli układ, typografia, wykresy i dostępność są zrobione
starannie, są dowodem. Jeśli są niechlujne, żadne zdanie o „dbałości o szczegóły"
tego nie odratuje.

## 2. Dla kogo

**Główny odbiorca: rekruter lub hiring manager rekrutujący na role badawcze w produkcie.**

Jak realnie czyta:

- **Pierwsze ~10 sekund to skanowanie**, nie czytanie. Nagłówki, liczby, wykresy.
  Decyzja „czytam dalej czy zamykam" zapada, zanim przeczyta pierwszy akapit.
- **Często na telefonie**, między innymi rzeczami. Układ musi znieść wąski ekran.
- **Jest sceptyczny.** Widział dziesiątki portfolio z wymyślonymi projektami
  i okrągłymi metrykami bez pokrycia.
- **Ma jedno pytanie z tyłu głowy:** czy ta osoba poradzi sobie w zespole
  produktowym, na terminie, z interesariuszami.

**Odbiorca drugorzędny: badacz albo projektant**, który zagląda głębiej — sprawdza
metodę, pyta o próbę, szuka miejsca, w którym coś zostało naciągnięte.

### Reguła „Respect the skim"

Strona musi działać na dwóch poziomach naraz. Same nagłówki, liczby i wykresy mają
opowiedzieć całość. Głębia — noty metodologiczne, ograniczenia, aparat statystyczny —
jest dostępna, ale nie zastawia drogi. Skanujący ją mija, badacz ją otwiera.
Nie zmuszamy nikogo do czytania wszystkiego, żeby zrozumieć cokolwiek.

## 3. Pozycjonowanie

**Badacz UX** — badania generatywne i ewaluacyjne, ilościowe i jakościowe. Z warstwą
projektową, ale środek ciężkości jest w badaniu.

Wyróżnik to **rygor i uczciwość wobec granic wniosków**. Nie „zwiększyłem konwersję
o 30%", tylko: to zbadałem, tak, tego nie dowodzi, a tu jest argument przeciwko
mojej własnej interpretacji. Przy pierwszej pracy jest to mocniejsza karta niż
udawane doświadczenie komercyjne.

## 4. Zasady treści

- **Prawdziwe albo żadne.** Żadnych fikcyjnych case studies, wymyślonych liczb ani
  placeholderów udających artefakty. Jedna prawdziwa praca bije cztery zmyślone.
- **Każda liczba ma pokrycie.** Jeśli pada na stronie, musi dać się sprawdzić
  w źródle. Dotyczy to również liczb w podpisach wykresów.
- **Ograniczenia są częścią wyniku**, nie aneksem. Sekcja o tym, czego badanie
  nie dowodzi, zostaje — to najmocniejszy sygnał wiarygodności, jaki mamy.
- **Głębokość ponad liczbę.** Dwie dopracowane prace zamiast pięciu pobieżnych.

## 5. Czego ta strona nie robi

Świadome wykluczenia — jeśli któreś wróci, ma wrócić jako decyzja, nie z rozpędu:

- Bez bloga, newslettera i „przemyśleń".
- Bez wersji językowej innej niż angielska (cytaty z badań zostają w oryginale).
- Bez formularza kontaktowego — e-mail i LinkedIn wystarczą i nie wymagają backendu.
- Bez CMS-a. Treść żyje w repozytorium, bo autorem jest jedna osoba.

## 6. Kryteria jakości

Twarde, sprawdzalne, nie do negocjacji:

- **WCAG 2.2 AA.** Kontrast tekstu ≥4,5:1, cele dotykowe ≥24 px, obsługa klawiaturą,
  widoczny focus. Każdy wykres ma dostępną alternatywę tekstową z danymi.
- **Zero przewijania w poziomie** na dowolnej szerokości od 320 px w górę.
- **Pełna treść bez JavaScriptu.** Animacje wzbogacają stan już widoczny; nigdy nie
  warunkują widoczności treści.
- **`prefers-reduced-motion` obsługiwane wszędzie**, nie w wybranych miejscach.
- **Statyczna generacja.** Bez backendu, bez bazy, bez runtime'u do utrzymania.

## 7. Trzy estetyki, których nie robimy

Przeniesione do DESIGN.md i tam rozwinięte, ale decyzja jest strategiczna:

1. **Generyczny szablon** — kupiony motyw bez punktu widzenia.
2. **Korporacyjny SaaS** — identyczne siatki kart, gradientowe metryki, wszystko zaokrąglone.
3. **Ciemny terminal dewelopera** — monospace, neon na czerni. To nie jest rola,
   o którą się staramy.

## 8. Jak poznamy, że działa

- Rekruter po 10 sekundach wie, kim jesteś i co potrafisz.
- Ktoś, kto zna się na metodologii, nie znajduje miejsca, w którym coś naciągnięto.
- Odezwie się ktoś, kto przeczytał case study, a nie tylko CV.
