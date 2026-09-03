/**
 * The proposed screens, built as markup rather than exported as pictures.
 *
 * Each frame is `inert` and hidden from assistive technology, and every one of
 * them is paired on the page with a caption and a text readout of the same
 * figures. A reproduction of an interface is not the interface: tabbing into a
 * screenshot that cannot be used would be worse than not reaching it at all,
 * and a screen reader should get the numbers as prose instead.
 */

import type { ReactNode } from "react";
import s from "./otodom.module.css";
import {
  SEARCH_A,
  SEARCH_B,
  UTILITIES,
  deposit,
  floorCost,
  monthly,
  zl,
  byMonthly,
  type Listing,
} from "./listings";

const find = (id: string) => [...SEARCH_A, ...SEARCH_B].find((l) => l.id === id)!;

/* ------------------------------------------------------------------ shell */

export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className={`${s.frame} ${s.app}`} inert>
      {children}
    </div>
  );
}

function Status() {
  // 23:41 is not decoration. The scenario this was designed for is the third
  // week of a search, on a phone, late, comparing figures nobody trusts.
  return (
    <div className={s.status}>
      <span>23:41</span>
      <span className={s.statusDots}>▮▮▮</span>
    </div>
  );
}

function Bar({ title, budget }: { title: string; budget?: number }) {
  return (
    <div className={s.bar}>
      <span className={s.back} aria-hidden="true">
        ←
      </span>
      <span className={s.barTitle}>{title}</span>
      {budget !== undefined && (
        <span className={s.budgetChip}>
          {zl(budget)} <span>/mies.</span>
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------- ledger row */

function Row({ l, showAdvertised = false }: { l: Listing; showAdvertised?: boolean }) {
  const total = monthly(l);
  const known = total !== null;

  return (
    <div className={s.row}>
      <div className={s.thumb} />
      <div className={s.rowMain}>
        <div className={s.rowTitle}>{l.title}</div>
        <div className={s.rowMeta}>
          {l.district} · {String(l.area).replace(".", ",")} m² · {l.floor}
        </div>
        {!known && (
          <div style={{ marginTop: 6 }}>
            <span className={`${s.badge} ${s.badgeGap}`}>Brak czynszu</span>
          </div>
        )}
      </div>
      <div className={s.rowCost}>
        {showAdvertised && <div className={s.wasPrice}>{zl(l.base)}</div>}
        <div className={`${s.rowTotal} ${known ? "" : s.rowTotalGap}`}>
          {known ? zl(total) : `od ${zl(floorCost(l))}`}
        </div>
        <div className={s.rowParts}>
          {known
            ? `${zl(l.base, false)} + ${zl(l.admin!, false)} + ${UTILITIES}`
            : `${zl(l.base, false)} + ? + ${UTILITIES}`}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 1. first run */

export function BudgetScreen() {
  return (
    <Frame>
      <Status />
      <Bar title="Wynajem · Kraków" />
      <div className={s.ask}>
        <h2 className={s.askTitle}>Ile możesz wydać miesięcznie?</h2>
        <p className={s.askBody}>
          Podaj kwotę, którą realnie możesz przeznaczyć na mieszkanie. Dopasujemy do niej wyniki.
        </p>

        <div className={`${s.field} ${s.fieldFocus}`}>
          <span className={s.fieldValue}>3 500</span>
          <span className={s.fieldUnit}>zł / mies.</span>
        </div>
        <p className={s.fieldHint}>Od 500 do 20 000 zł</p>

        <div className={s.includes}>
          <p className={s.tLabel} style={{ paddingBottom: 8 }}>
            Co się w tym mieści
          </p>
          <div className={s.includeRow}>
            <span className={s.includeLabel}>Najem</span>
            <span className={s.leader} />
            <span className={s.includeValue}>z ogłoszenia</span>
          </div>
          <div className={s.includeRow}>
            <span className={s.includeLabel}>Czynsz administracyjny</span>
            <span className={s.leader} />
            <span className={s.includeValue}>z ogłoszenia</span>
          </div>
          <div className={s.includeRow}>
            <span className={s.includeLabel}>Media</span>
            <span className={s.leader} />
            <span className={s.includeValue}>
              {zl(UTILITIES)}
              <span className={s.est}>szacunek</span>
            </span>
          </div>
          <p className={s.excluded}>
            Kaucja jest poza tą kwotą — pokazujemy ją osobno przy każdej ofercie, bo płacisz ją raz
            i wraca do Ciebie.
          </p>
        </div>
      </div>

      <div className={s.actions}>
        <span className={`${s.btn} ${s.btnGhost}`}>Pomiń</span>
        <span className={`${s.btn} ${s.btnPrimary}`}>Pokaż oferty</span>
      </div>
    </Frame>
  );
}

/* -------------------------------------------------------------- 2. results */

const BUDGET = 4100;

export function ResultsScreen() {
  const within = [...SEARCH_A].sort(byMonthly).filter((l) => (monthly(l) ?? 0) <= BUDGET);

  return (
    <Frame>
      <Status />
      <Bar title="Kraków · 2 pokoje" budget={BUDGET} />

      <div className={s.summary}>
        <p className={s.summaryLine}>
          <b>
            {within.length} z {SEARCH_A.length}
          </b>{" "}
          ofert mieści się w {zl(BUDGET)} miesięcznie.
        </p>
        <p className={s.summaryNote}>
          Liczymy najem, czynsz administracyjny i szacowane media. Kaucja osobno.
        </p>
      </div>

      <div className={s.rows}>
        {within.map((l) => (
          <Row key={l.id} l={l} showAdvertised={l.id === "a8"} />
        ))}
      </div>

      <div className={s.group}>
        <h3 className={s.tHead}>Nie można ustalić kosztu ({SEARCH_B.length})</h3>
        <p className={s.groupNote}>
          Te ogłoszenia nie podają czynszu administracyjnego. Pokazujemy je osobno, zamiast ukrywać
          przed filtrem albo liczyć za nie.
        </p>
      </div>

      <div className={s.rows}>
        {SEARCH_B.map((l) => (
          <Row key={l.id} l={l} />
        ))}
      </div>
    </Frame>
  );
}

/* --------------------------------------------------------------- 3. detail */

export function ListingScreen() {
  const l = find("a8");
  const total = monthly(l)!;
  const dep = deposit(l);

  return (
    <Frame>
      <Status />
      <Bar title="Oferta" />

      <div className={s.ask} style={{ paddingBottom: 16 }}>
        <p className={s.tSmall}>
          W ogłoszeniu: <span className={s.wasPrice}>{zl(l.base)}</span>
        </p>
        <div
          style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginTop: 4 }}
        >
          <span className={s.tTotal}>{zl(total)}</span>
          <span className={s.tSmall}>/ mies.</span>
          <span className={`${s.badge} ${s.badgeKnown}`}>Pełny koszt</span>
        </div>
        <p className={s.askBody} style={{ marginTop: 8 }}>
          {l.title}. {l.district}, {String(l.area).replace(".", ",")} m², {l.floor}.
        </p>
      </div>

      <div className={s.ledger}>
        <div className={s.ledgerHead}>
          <h3 className={s.tLabel}>Co miesiąc</h3>
        </div>
        <div className={s.ledgerRow}>
          <span className={s.ledgerLabel}>Najem</span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(l.base)}</span>
        </div>
        <div className={s.ledgerRow}>
          <span className={s.ledgerLabel}>Czynsz administracyjny</span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(l.admin!)}</span>
        </div>
        <div className={s.ledgerRow}>
          <span className={s.ledgerLabel}>
            Media<span className={s.est}>szacunek</span>
          </span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(UTILITIES)}</span>
        </div>
        <div className={`${s.ledgerRow} ${s.ledgerRowSum}`}>
          <span className={s.ledgerLabel}>Razem co miesiąc</span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(total)}</span>
        </div>
      </div>

      <div className={s.ledger} style={{ borderTop: 0 }}>
        <div className={s.ledgerHead}>
          <h3 className={s.tLabel}>Przy wprowadzeniu</h3>
        </div>
        <div className={s.ledgerRow}>
          <span className={s.ledgerLabel}>Pierwszy miesiąc</span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(total)}</span>
        </div>
        <div className={s.ledgerRow}>
          <span className={s.ledgerLabel}>
            Kaucja, zwrotna<span className={s.est}>szacunek</span>
          </span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(dep)}</span>
        </div>
        <div className={`${s.ledgerRow} ${s.ledgerRowSum}`}>
          <span className={s.ledgerLabel}>Razem przy wprowadzeniu</span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(total + dep)}</span>
        </div>
      </div>

      <p className={s.note}>
        Media szacujemy na {zl(UTILITIES)} dla mieszkania dwupokojowego, a kaucję na równowartość
        jednomiesięcznego najmu. Ogłoszenie nie podaje żadnej z tych kwot, więc obie są oznaczone
        jako szacunek.
      </p>

      {/* The photograph comes after the figures. On this screen that inversion is
          the argument: a picture cannot tell you what the flat costs. */}
      <div style={{ padding: "18px 20px 0" }}>
        <p className={s.tLabel} style={{ marginBottom: 8 }}>
          Zdjęcia (12)
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <div className={s.thumb} style={{ flex: 2, height: 88 }} />
          <div className={s.thumb} style={{ flex: 1, height: 88 }} />
          <div className={s.thumb} style={{ flex: 1, height: 88 }} />
        </div>
      </div>

      <div className={s.actions} style={{ marginTop: 20 }}>
        <span className={`${s.btn} ${s.btnGhost}`}>Zapisz</span>
        <span className={`${s.btn} ${s.btnPrimary}`}>Napisz do ogłoszeniodawcy</span>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------ 4. compare */

export function CompareScreen() {
  const left = find("a8");
  const right = find("a3");
  const lTotal = monthly(left)!;
  const rTotal = monthly(right)!;

  const cell = (value: string, rank?: "best" | "worse") => (
    <div className={s.compareCol}>
      <span className={s.compareValue}>{value}</span>
      {rank && (
        <span className={`${s.rank} ${rank === "best" ? s.rankBest : s.rankWorse}`}>
          {rank === "best" ? "tańsza" : "droższa"}
        </span>
      )}
    </div>
  );

  return (
    <Frame>
      <Status />
      <Bar title="Porównanie · 2 oferty" />

      <div className={s.compare}>
        <div className={s.compareHead}>
          <span className={s.tLabel}>Oferta</span>
          <div className={s.compareCol}>
            <div className={s.compareName}>{left.district}</div>
            <div className={s.compareMeta}>
              {String(left.area).replace(".", ",")} m² · {left.floor}
            </div>
          </div>
          <div className={s.compareCol}>
            <div className={s.compareName}>{right.district}</div>
            <div className={s.compareMeta}>
              {String(right.area).replace(".", ",")} m² · {right.floor}
            </div>
          </div>
        </div>

        <div className={s.compareRow}>
          <span className={s.compareRowLabel}>W ogłoszeniu</span>
          {cell(zl(left.base), "best")}
          {cell(zl(right.base), "worse")}
        </div>
        <div className={s.compareRow}>
          <span className={s.compareRowLabel}>Czynsz administracyjny</span>
          {cell(zl(left.admin!))}
          {cell(zl(right.admin!))}
        </div>
        <div className={s.compareRow}>
          <span className={s.compareRowLabel}>
            Media<span className={s.est}>szac.</span>
          </span>
          {cell(zl(UTILITIES))}
          {cell(zl(UTILITIES))}
        </div>
        <div className={`${s.compareRow} ${s.compareRowSum}`}>
          <span className={s.compareRowLabel}>Realny koszt</span>
          {cell(zl(lTotal), "worse")}
          {cell(zl(rTotal), "best")}
        </div>

        <p className={s.reversal}>
          Kolejność się odwraca. W ogłoszeniach tańsza jest oferta na {left.districtLoc}; po
          doliczeniu czynszu tańsza jest ta na {right.districtLoc}, o {zl(lTotal - rTotal)}{" "}
          miesięcznie.
        </p>
      </div>

      <div className={s.ledger} style={{ borderTop: 0 }}>
        <div className={s.ledgerHead}>
          <h3 className={s.tLabel}>Przy wprowadzeniu</h3>
        </div>
        <div className={s.ledgerRow}>
          <span className={s.ledgerLabel}>{left.district}</span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(lTotal + deposit(left))}</span>
        </div>
        <div className={s.ledgerRow}>
          <span className={s.ledgerLabel}>{right.district}</span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(rTotal + deposit(right))}</span>
        </div>
      </div>
    </Frame>
  );
}

/* --------------------------------------------------------- 5. edge states */

export function EmptyScreen() {
  const cheapest = [...SEARCH_A].sort(byMonthly)[0];
  const cheapestTotal = monthly(cheapest)!;

  return (
    <Frame>
      <Bar title="Kraków · 2 pokoje" budget={3500} />
      <div className={s.summary}>
        <p className={s.summaryLine}>
          <b>0 z {SEARCH_A.length}</b> ofert mieści się w {zl(3500)} miesięcznie.
        </p>
      </div>
      <div className={s.empty}>
        <h3 className={s.emptyTitle}>Najtańsza kosztuje {zl(cheapestTotal)}</h3>
        <p className={s.emptyBody}>
          To {zl(cheapestTotal - 3500)} ponad Twój budżet. Filtr ceny pokazałby tu osiem ofert —
          żadna z nich nie mieści się w {zl(3500)} po doliczeniu czynszu.
        </p>
        <div className={s.emptyActions}>
          <span className={`${s.btn} ${s.btnPrimary}`}>Ustaw {zl(cheapestTotal)}</span>
          <span className={`${s.btn} ${s.btnGhost}`}>Zmień dzielnicę</span>
        </div>
      </div>
    </Frame>
  );
}

export function ErrorScreen() {
  return (
    <Frame>
      <Bar title="Wynajem · Kraków" />
      <div className={s.ask}>
        <h2 className={s.askTitle}>Ile możesz wydać miesięcznie?</h2>
        <div className={`${s.field} ${s.fieldError}`}>
          <span className={s.fieldValue}>100</span>
          <span className={s.fieldUnit}>zł / mies.</span>
        </div>
        <p className={s.fieldMessage}>
          Wpisz kwotę od 500 do 20 000 zł. Najtańsza oferta w Krakowie kosztuje dziś 3 800 zł
          miesięcznie.
        </p>
      </div>
      <div className={s.actions}>
        <span className={`${s.btn} ${s.btnGhost}`}>Pomiń</span>
        <span className={`${s.btn} ${s.btnPrimary}`} aria-disabled="true" data-disabled>
          Pokaż oferty
        </span>
      </div>
    </Frame>
  );
}

export function LoadingScreen() {
  return (
    <Frame>
      <Bar title="Kraków · 2 pokoje" budget={4100} />
      <div className={s.summary}>
        <div className={`${s.sk} ${s.skLine}`} style={{ width: "78%" }} />
        <div className={`${s.sk} ${s.skLineShort}`} />
      </div>
      <div className={s.rows}>
        {[0, 1, 2].map((i) => (
          <div className={s.skeletonRow} key={i}>
            <div className={`${s.sk} ${s.skThumb}`} />
            <div>
              <div className={`${s.sk} ${s.skLine}`} />
              <div className={`${s.sk} ${s.skLineShort}`} />
            </div>
            <div className={`${s.sk} ${s.skFigure}`} />
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function GapScreen() {
  const l = find("b1");
  return (
    <Frame>
      <Bar title="Oferta" />
      <div className={s.ask} style={{ paddingBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span className={`${s.tTotal} ${s.rowTotalGap}`}>od {zl(floorCost(l))}</span>
          <span className={s.tSmall}>/ mies.</span>
          <span className={`${s.badge} ${s.badgeGap}`}>Brak czynszu</span>
        </div>
        <p className={s.askBody} style={{ marginTop: 8 }}>
          {l.title}. {l.district}, {l.area} m².
        </p>
      </div>
      <div className={s.ledger}>
        <div className={s.ledgerRow}>
          <span className={s.ledgerLabel}>Najem</span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(l.base)}</span>
        </div>
        <div className={`${s.ledgerRow} ${s.ledgerRowGap}`}>
          <span className={s.ledgerLabel}>Czynsz administracyjny</span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>nie podano</span>
        </div>
        <div className={s.ledgerRow}>
          <span className={s.ledgerLabel}>
            Media<span className={s.est}>szacunek</span>
          </span>
          <span className={s.leader} />
          <span className={s.ledgerValue}>{zl(UTILITIES)}</span>
        </div>
        <div className={`${s.ledgerRow} ${s.ledgerRowSum}`}>
          <span className={s.ledgerLabel}>Razem co miesiąc</span>
          <span className={s.leader} />
          <span className={`${s.ledgerValue} ${s.rowTotalGap}`}>od {zl(floorCost(l))}</span>
        </div>
      </div>
      <p className={s.note}>
        Wśród ofert, które podają czynsz, sięga on 1 200 zł miesięcznie. Nie doliczamy go za
        ogłoszeniodawcę — poprosimy o tę kwotę w wiadomości.
      </p>
      <div className={s.actions} style={{ marginTop: 18 }}>
        <span className={`${s.btn} ${s.btnPrimary}`}>Zapytaj o czynsz</span>
      </div>
    </Frame>
  );
}
