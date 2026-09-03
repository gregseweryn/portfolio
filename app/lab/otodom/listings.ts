/**
 * The listings these screens are drawn from.
 *
 * Measured on otodom.pl on 4 August 2026 and already published in the case
 * study; the same eleven rows drive the prototype in ../../../otodom-cost-mockup.
 * They are restated here rather than imported because that repository is not a
 * dependency of this site, and a design proposal that invented its own numbers
 * would be arguing against a product using figures nobody can check.
 *
 * Two redactions carried over from the study's anonymisation rule: addresses are
 * reduced to a district, agencies to "Biuro nieruchomości". Neither touches cost.
 *
 * Two researcher's conventions, stated in the interface wherever they are used
 * rather than in a footnote: utilities at 300 zl for a two-room flat, and a
 * deposit of one month's base rent. Neither figure was on any card.
 */

export type Listing = {
  id: string;
  /** Advertised rent — the number the current product puts in the headline. */
  base: number;
  /** Administrative rent, or null when the listing does not state it. */
  admin: number | null;
  area: number;
  floor: string;
  rooms: number;
  title: string;
  district: string;
  /**
   * The district in the locative case ("na Prądniku Czerwonym").
   *
   * Polish inflects, and a sentence built by dropping a nominative noun into a
   * template reads as machine translation — which is exactly what an interface
   * about trust cannot afford. Only the listings whose names appear inside a
   * sentence carry this; the rest never leave a label.
   */
  districtLoc?: string;
  seller: string;
};

export const UTILITIES = 300;

/** Search A: Kraków, 2 rooms, price filter "up to 3000". The whole first page. */
export const SEARCH_A: Listing[] = [
  { id: "a1", base: 2800, admin: 900, area: 32, floor: "3 piętro", rooms: 2,
    title: "Bez prowizji, 2 pokoje, Stare Podgórze",
    district: "Stare Podgórze", seller: "Oferta prywatna" },
  { id: "a2", base: 3000, admin: 941, area: 52.59, floor: "2 piętro", rooms: 2,
    title: "Do wynajęcia od zaraz, Osiedle Teatralne",
    district: "Krowodrza", seller: "Oferta prywatna" },
  { id: "a3", base: 2800, admin: 700, area: 40, floor: "2 piętro", rooms: 2,
    title: "2 pokoje z balkonem, bezpośrednio",
    district: "Prądnik Biały", districtLoc: "Prądniku Białym", seller: "Oferta prywatna" },
  { id: "a4", base: 2800, admin: 810, area: 43.04, floor: "5 piętro", rooms: 2,
    title: "Nowe 2-pokojowe mieszkanie, Siewna",
    district: "Prądnik Biały", seller: "Biuro nieruchomości" },
  { id: "a5", base: 3000, admin: 700, area: 40, floor: "parter", rooms: 2,
    title: "Nowoczesne 2 pokoje z prywatnym ogródkiem",
    district: "Podgórze Duchackie", seller: "Oferta prywatna" },
  { id: "a6", base: 2980, admin: 1070, area: 41.78, floor: "1 piętro", rooms: 2,
    title: "Bez prowizji, 2-pokojowe, Krowodrza",
    district: "Łobzów", seller: "Biuro nieruchomości" },
  { id: "a7", base: 2840, admin: 1010, area: 40.53, floor: "2 piętro", rooms: 2,
    title: "Funkcjonalne 2-pokojowe mieszkanie",
    district: "Płaszów", seller: "Biuro nieruchomości" },
  { id: "a8", base: 2500, admin: 1200, area: 51.62, floor: "1 piętro", rooms: 2,
    title: "Mieszkanie dwupokojowe z balkonem",
    district: "Prądnik Czerwony", districtLoc: "Prądniku Czerwonym", seller: "Oferta prywatna" },
];

/**
 * Search B: the same search without the price filter. On these cards the second
 * line carries a price per square metre instead of the administrative rent, so
 * the real monthly cost cannot be derived from the card at all. `admin: null` is
 * the finding, not a hole in the data.
 */
export const SEARCH_B: Listing[] = [
  { id: "b1", base: 5000, admin: null, area: 54, floor: "2 piętro", rooms: 3,
    title: "Stare Miasto, Rakowicka, 3 pokoje",
    district: "Stare Miasto", seller: "Biuro nieruchomości" },
  { id: "b2", base: 3700, admin: null, area: 74, floor: "1 piętro", rooms: 3,
    title: "Przestronne mieszkanie z balkonem i garażem",
    district: "Prądnik Czerwony", seller: "Biuro nieruchomości" },
  { id: "b3", base: 3800, admin: null, area: 59, floor: "4 piętro", rooms: 3,
    title: "Nowe mieszkanie, dwa miejsca postojowe",
    district: "Płaszów", seller: "Biuro nieruchomości" },
];

/** What the tenant pays each month, where it can be known at all. */
export const monthly = (l: Listing) => (l.admin === null ? null : l.base + l.admin + UTILITIES);

/** The floor a listing can prove when a component of its cost is missing. */
export const floorCost = (l: Listing) => l.base + UTILITIES;

/** Deposits are conventionally one month's base rent. Returnable, so it is never
 *  folded into the monthly figure. */
export const deposit = (l: Listing) => l.base;

/**
 * Polish money, grouped every three digits with a non-breaking space.
 *
 * Not `toLocaleString("pl-PL")`, which is what the prototype uses and what this
 * page cannot use: CLDR's Polish rules set minimumGroupingDigits to 2, so Node
 * renders 3800 ungrouped while Chrome groups it, and these figures are rendered
 * on the server. The published screenshots of the prototype show "3 800 zł", so
 * a server-rendered "3800 zł" beside them would be the same number written two
 * ways in one case study.
 */
export const zl = (n: number, unit = true) => {
  const s = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return unit ? `${s} zł` : s;
};

export const byMonthly = (a: Listing, b: Listing) => (monthly(a) ?? 0) - (monthly(b) ?? 0);
