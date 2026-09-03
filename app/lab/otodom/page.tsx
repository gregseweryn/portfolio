/**
 * /lab/otodom — a design proposal, on an unlisted page.
 *
 * Not in the navigation, not in any sitemap, noindex and nofollow. It is reached
 * by having the link. That is deliberate twice over.
 *
 * The rental case study argues from measurement and holds the visual design
 * still on purpose; this page does the opposite — it proposes a visual language
 * nobody has tested. Published beside the study, the two claims would blur.
 *
 * And the study itself is currently held back from the published set (see
 * docs/HANDOFF-rental-study.md): the write-up needs revising and the evaluative
 * sessions have not been run, so /work/krakow-rental-search is not built. This
 * page names it in prose rather than linking to it for that reason, and it must
 * stay unlisted at least until the study is back.
 */

import type { Metadata } from "next";
import s from "./otodom.module.css";
import {
  BudgetScreen,
  CompareScreen,
  EmptyScreen,
  ErrorScreen,
  GapScreen,
  ListingScreen,
  LoadingScreen,
  ResultsScreen,
} from "./screens";
import { SEARCH_A, byMonthly, monthly, zl } from "./listings";

export const metadata: Metadata = {
  title: "Lab — koszt najmu, propozycja projektowa",
  description:
    "Niepublikowana propozycja interfejsu dla wyszukiwania mieszkań na wynajem: rachunek zamiast plakatu.",
  robots: { index: false, follow: false, nocache: true },
};

const cheapest = monthly([...SEARCH_A].sort(byMonthly)[0])!;

export default function LabOtodomPage() {
  return (
    <main className={s.page}>
      <div className={s.wrap}>
        <p className={s.kicker}>Lab · strona nielinkowana</p>
        <h1 className={s.title}>Rachunek, nie plakat</h1>

        <div className={s.intro}>
          <p>
            Propozycja interfejsu dla wyszukiwania mieszkań na wynajem, zbudowana na tych samych
            jedenastu ofertach, które zmierzyłem 4 sierpnia 2026. Case study pokazuje, że produkt
            prowadzi ceną, której nikt nie płaci. Te ekrany są odpowiedzią na pytanie, jak
            wyglądałby serwis, który prowadzi kwotą, którą płacisz naprawdę.
          </p>
          <p>
            Nie jest to część badania. Badanie trzyma wygląd nieruchomo, żeby porównywać strukturę
            informacji; tutaj wygląd jest właśnie tym, co się zmienia — i nikt tego jeszcze nie
            testował z użytkownikami.
          </p>
        </div>

        <p className={s.disclaimer}>
          Koncepcja niezależna. Nie jest produktem Otodom ani nie jest z nim powiązana, nie używa
          ich logo ani nazwy jako marki. Wszystkie kwoty pochodzą z ofert zmierzonych na otodom.pl
          4 sierpnia 2026; adresy skrócone do dzielnicy, nazwy biur zastąpione. Media (300 zł) i
          kaucja (równowartość najmu) to założenia badacza, oznaczone w interfejsie jako szacunek.
          Materiał towarzyszący studium przypadku o koszcie najmu w Krakowie, które jest w tej
          chwili zdjęte z publikacji — opis wymaga poprawek, a sesje ewaluacyjne nie zostały
          przeprowadzone. Dlatego to zdanie nie jest linkiem: strona studium nie jest budowana,
          więc odsyłacz prowadziłby do 404.
        </p>

        <div className={s.rules}>
          <div className={s.rule}>
            <h3>Kwota jest nagłówkiem</h3>
            <p>
              Pierwszą rzeczą w każdym wierszu jest suma, którą wypłacisz z konta. Cena z ogłoszenia
              zostaje, ale przekreślona — czytelnik przyszedł z listy, na której ją widział, i
              podmiana bez słowa niczego by go nie nauczyła.
            </p>
          </div>
          <div className={s.rule}>
            <h3>Zdjęcie schodzi do miniatury</h3>
            <p>
              Fotografia mówi o mieszkaniu, nie o cenie. Na liście ma 56 px, a na stronie oferty
              stoi <em>pod</em> rozliczeniem. To najbardziej widoczna rzecz, którą ta propozycja
              robi, i najtrudniejsza do sprzedania właścicielowi produktu.
            </p>
          </div>
          <div className={s.rule}>
            <h3>Linie zamiast kart</h3>
            <p>
              Karty dzielą listę na dwanaście pudełek konkurujących o uwagę. Wyciąg z konta tego nie
              robi: włoskowate linie, wiodące kropki od etykiety do kwoty, cyfry tabularne, żadnych
              cieni.
            </p>
          </div>
          <div className={s.rule}>
            <h3>Dwa atramenty na niepewność</h3>
            <p>
              Zielony znaczy „to jest pełny koszt”. Bursztynowy znaczy „ogłoszenie czegoś nie
              podaje”. Nie ma trzeciego koloru i nie ma koloru dekoracyjnego — akcentem działania
              jest sam atrament, czyli najciemniejszy element ekranu.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}

        <section className={s.screen}>
          <BudgetScreen />
          <div className={s.caption}>
            <h2>Pytanie zadane raz, na wejściu</h2>
            <p>
              Obecny filtr pyta o cenę z ogłoszenia i nigdzie tego nie mówi. Ten pyta o budżet — i
              od razu pokazuje, z czego się składa kwota, którą będzie porównywał.
            </p>
            <p>
              Kaucja jest świadomie poza budżetem: płaci się ją raz i wraca. Wrzucenie jej do kwoty
              miesięcznej dałoby liczbę, której nie da się zinterpretować.
            </p>
            <ul className={s.decisions}>
              <li>
                <b>Jedno pole</b>
                <span>Wpisywana kwota, nie widełki do klikania — badanie ewaluacyjne prosi o własny budżet.</span>
              </li>
              <li>
                <b>Szacunek widoczny</b>
                <span>Media 300 zł są oznaczone jako szacunek już tutaj, zanim wpłyną na wynik.</span>
              </li>
              <li>
                <b>„Pomiń” zostaje</b>
                <span>Ekran wejściowy, którego nie da się ominąć, to podatek od kogoś, kto tylko ogląda.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className={s.screen}>
          <ResultsScreen />
          <div className={s.caption}>
            <h2>Lista, która odpowiada, zanim się ją przewinie</h2>
            <p>
              Nagłówek mówi <b>5 z 8</b> — ile ofert mieści się w budżecie, a nie ile ich znaleziono.
              Każdy wiersz prowadzi sumą, pod nią rozbicie na trzy składniki. Sortowanie idzie po
              kwocie realnej, bo to ona jest porównywana.
            </p>
            <p>
              Oferty, których kosztu nie da się ustalić, mają własną grupę pod listą. Nie znikają z
              filtra i nie dostają wyliczonej kwoty, której nikt nie zmierzył — dostają widełki od
              dołu i etykietę.
            </p>
            <ul className={s.decisions}>
              <li>
                <b>4 100 zł</b>
                <span>Budżet z tego ekranu. Przy 3 500 zł, czyli kwocie ze scenariusza badania, lista jest pusta.</span>
              </li>
              <li>
                <b>Przekreślenie</b>
                <span>Cena z ogłoszenia zostaje przy ofercie a8 — 2 500 zł obok realnych 4 000 zł.</span>
              </li>
              <li>
                <b>Miniatura 56 px</b>
                <span>Zdjęcie jest w wierszu, ale nie jest jego bohaterem.</span>
              </li>
            </ul>
            <details className={s.readout}>
              <summary>Kwoty na tym ekranie</summary>
              <ul>
                {[...SEARCH_A]
                  .sort(byMonthly)
                  .filter((l) => (monthly(l) ?? 0) <= 4100)
                  .map((l) => (
                    <li key={l.id}>
                      {l.district}: ogłoszenie {zl(l.base)}, czynsz {zl(l.admin!)}, media 300 zł —
                      razem {zl(monthly(l)!)} miesięcznie.
                    </li>
                  ))}
              </ul>
            </details>
          </div>
        </section>

        <section className={s.screen}>
          <ListingScreen />
          <div className={s.caption}>
            <h2>Oferta jako rozliczenie</h2>
            <p>
              Ta oferta wygląda na najtańszą na liście — 2 500 zł — i jest najdroższym miejscem, w
              jakim można wylądować: 4 000 zł miesięcznie i 6 500 zł przy wprowadzeniu. Ekran
              rozdziela te dwa pytania na dwa rozliczenia, bo są to dwa różne pytania.
            </p>
            <p>
              Zdjęcia są pod rozliczeniem. Odwrócenie kolejności jest tu całą tezą: fotografia nie
              odpowie na pytanie, ile to kosztuje.
            </p>
            <ul className={s.decisions}>
              <li>
                <b>Kaucja osobno</b>
                <span>Nazwana zwrotną i policzona tylko w „przy wprowadzeniu”.</span>
              </li>
              <li>
                <b>Wiodące kropki</b>
                <span>Wiersz rozliczenia czyta się od etykiety do kwoty, jak na wyciągu.</span>
              </li>
              <li>
                <b>Znacznik szacunku</b>
                <span>Przy mediach i kaucji, w treści wiersza — nie w przypisie pod ekranem.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className={s.screen}>
          <CompareScreen />
          <div className={s.caption}>
            <h2>Porównanie, w którym kolejność się odwraca</h2>
            <p>
              Dwie zmierzone oferty. W ogłoszeniach tańsza jest ta z Prądnika Czerwonego (2 500 zł
              wobec 2 800 zł). Po doliczeniu czynszu jest droższa o 200 zł miesięcznie. To nie jest
              przykład dobrany pod tezę — w audycie 423 ofert taka zamiana dotyczy 6,8% wszystkich
              porównywalnych par, czyli mniej więcej co piętnastej.
            </p>
            <p>
              Kolumny są dwie, nie cztery. Porównanie na telefonie, które trzeba przewijać w poziomie,
              przestaje być porównaniem.
            </p>
            <ul className={s.decisions}>
              <li>
                <b>Etykiety słowne</b>
                <span>„tańsza” i „droższa” stoją przy kwotach, więc odwrócenie widać bez czytania liczb.</span>
              </li>
              <li>
                <b>Pasek odwrócenia</b>
                <span>Bursztynowy, bo to ta sama niepewność, o której mówi reszta systemu.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className={s.screen}>
          <div>
            <p className={s.frameLabel}>Cztery stany, które zwykle nie trafiają do portfolio</p>
            <div className={s.frameRow}>
              <EmptyScreen />
              <ErrorScreen />
              <LoadingScreen />
              <GapScreen />
            </div>
          </div>
          <div className={s.caption}>
            <h2>Stany brzegowe</h2>
            <p>
              Audyt obecnego systemu wykazał, że nie ma on słownika stanów: ani błędu, ani ładowania,
              ani zablokowanej akcji. Pole budżetu przyjmowało 0 zł i odpowiadało „0 z 8 ofert mieści
              się w 0 zł”, co brzmi jak wynik, a jest artefaktem. Te cztery ekrany to brakująca
              część systemu.
            </p>
            <ul className={s.decisions}>
              <li>
                <b>Pusty</b>
                <span>
                  Podaje kwotę najtańszej oferty ({zl(cheapest)}) i różnicę do budżetu, a przycisk
                  ustawia dokładnie tę kwotę. „Brak wyników” nie mówi nikomu, co robić dalej.
                </span>
              </li>
              <li>
                <b>Błąd</b>
                <span>
                  Zakres 500–20 000 zł powiedziany słowami, akcja główna zablokowana, komunikat
                  wskazuje najbliższą sensowną kwotę.
                </span>
              </li>
              <li>
                <b>Ładowanie</b>
                <span>
                  Szkielet wierszy w kształcie wyniku, nie spinner. Puls jest jedyną animacją w całej
                  propozycji i wyłącza się przy prefers-reduced-motion.
                </span>
              </li>
              <li>
                <b>Bez czynszu</b>
                <span>
                  Kwota od dołu, brakujący wiersz nazwany słowami, a akcja główna to „Zapytaj o
                  czynsz” — czyli jedyna rzecz, która naprawdę domyka koszt.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}

        <section className={s.tokens}>
          <h2 className={s.sectionTitle}>Paleta</h2>
          <p className={s.sectionLede}>
            Papier chłodny, nie kremowy: ciepła biel to domyślny wygląd każdego portalu z
            nieruchomościami, a to jest wyciąg z konta. Kontrast każdej pary tekst/tło zmierzony w
            przeglądarce; najsłabsza z nich to tekst drugorzędny na papierze.
          </p>
          <ul className={s.swatches}>
            {[
              ["Atrament", "oklch(0.19 0.014 262)", "tekst, akcja główna"],
              ["Atrament 2", "oklch(0.455 0.012 262)", "tekst drugorzędny"],
              ["Papier", "oklch(0.979 0.003 255)", "tło aplikacji"],
              ["Powierzchnia", "oklch(1 0 0)", "listy i rozliczenia"],
              ["Linia", "oklch(0.885 0.006 262)", "podziały"],
              ["Pełny koszt", "oklch(0.42 0.1 156)", "kwota kompletna"],
              ["Brak składnika", "oklch(0.46 0.12 62)", "kwota niepełna"],
            ].map(([name, value, use]) => (
              <li className={s.swatch} key={name}>
                <div className={s.swatchChip} style={{ background: value }} />
                <div className={s.swatchMeta}>
                  <b>{name}</b>
                  <span>{use}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
