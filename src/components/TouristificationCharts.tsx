import React, { useState, useMemo } from 'react'
import costData from '../data/thesis/cost-items.json'
import registersData from '../data/thesis/registers.json'
import modelsData from '../data/thesis/models.json'
import typologyData from '../data/thesis/typology.json'
import themesData from '../data/thesis/themes.json'
import jointData from '../data/thesis/joint-display.json'
import { useLanguage } from '../context/LanguageContext'

// ==========================================
// 1. HERO: THREE DISTRICTS, ONE PROCESS
// ==========================================

const HERO_X0 = 110
const HERO_X1 = 900
const HERO_DOMAIN: [number, number] = [3.1, 3.95]
const HERO_AXIS_Y = 300

function xHero(value: number) {
  const [lo, hi] = HERO_DOMAIN
  return HERO_X0 + ((value - lo) / (hi - lo)) * (HERO_X1 - HERO_X0)
}

const DISTRICTS_EN = [
  {
    id: 'podgorze',
    name: 'Podgórze',
    phase: 'Being drawn in',
    costs: 3.21,
    n: 144,
    direction: 'up' as const,
    stem: 200,
    accent: true,
    quote: 'Short-term rentals started appearing on our staircases two years ago, but daily life still exists.',
  },
  {
    id: 'old-town',
    name: 'Old Town',
    phase: 'Mature touristification',
    costs: 3.84,
    n: 156,
    direction: 'up' as const,
    stem: 150,
    accent: false,
    quote: 'Every grocer and baker became a souvenir shop or pub. You cannot live here without feeling like a museum exhibit.',
  },
  {
    id: 'kazimierz',
    name: 'Kazimierz',
    phase: 'Rapid, rental- and nightlife-driven',
    costs: 3.86,
    n: 146,
    direction: 'down' as const,
    stem: 380,
    accent: false,
    quote: 'The noise at 3 AM from party crawl groups makes normal sleep impossible Thursday through Sunday.',
  },
]

const DISTRICTS_PL = [
  {
    id: 'podgorze',
    name: 'Podgórze',
    phase: 'Wciągane w proces',
    costs: 3.21,
    n: 144,
    direction: 'up' as const,
    stem: 200,
    accent: true,
    quote: 'Krótkoterminowy najem pojawił się na naszych klatkach dwa lata temu, ale codzienne życie wciąż tu istnieje.',
  },
  {
    id: 'old-town',
    name: 'Stare Miasto',
    phase: 'Dojrzała turystyfikacja',
    costs: 3.84,
    n: 156,
    direction: 'up' as const,
    stem: 150,
    accent: false,
    quote: 'Każdy warzywniak i piekarnia zamieniły się w sklep z pamiątkami albo pub. Nie da się tu mieszkać bez poczucia bycia eksponatem w muzeum.',
  },
  {
    id: 'kazimierz',
    name: 'Kazimierz',
    phase: 'Gwałtowna, napędzana najmem i nocnym życiem',
    costs: 3.86,
    n: 146,
    direction: 'down' as const,
    stem: 380,
    accent: false,
    quote: 'Hałas o 3 nad ranem wywoływany przez grupy party crawl uniemożliwia normalny sen od czwartku do niedzieli.',
  },
]

export const DistrictPhasesHero: React.FC<{ caption?: string }> = ({
  caption,
}) => {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null)
  const { language } = useLanguage()
  const districts = language === 'pl' ? DISTRICTS_PL : DISTRICTS_EN
  const defaultCaption =
    language === 'pl'
      ? 'Trzy dzielnice wybrane jako trzy fazy jednego procesu, uszeregowane według wskaźnika uciążliwości wskazanego przez mieszkańców. Stare Miasto i Kazimierz nakładają się na siebie; Podgórze znajduje się w innym punkcie i spodziewa się podążyć tą samą drogą.'
      : 'Three districts chosen as three phases of one process, positioned here by the cost index their residents actually reported. Old Town and Kazimierz land on top of each other; Podgórze sits apart, and expects to follow.'
  const displayCaption = caption || defaultCaption

  return (
    <figure className="w-full m-0 flex flex-col">
      <div className="w-full bg-zinc-100/80 border border-zinc-200/90 rounded-2xl overflow-x-auto shadow-xs">
        <div className="min-w-[680px] w-full">
          <svg
            viewBox="0 0 1000 470"
            className="w-full h-auto block select-none"
            role="img"
            aria-labelledby="district-phases-title district-phases-desc"
          >
            <title id="district-phases-title">
              {language === 'pl'
                ? 'Trzy krakowskie dzielnice uszeregowane według postrzeganych kosztów turystyki'
                : 'Three Kraków districts positioned by perceived cost of tourism'}
            </title>
            <desc id="district-phases-desc">
              {language === 'pl'
                ? 'Podgórze znajduje się na poziomie 3.21 wskaźnika kosztów po lewej stronie. Stare Miasto (3.84) i Kazimierz (3.86) nakładają się na siebie po prawej stronie. Przerywana strzałka prowadzi z Podgórza w ich kierunku, oznaczając przewidywaną trajektorię rozwoju.'
                : 'Podgórze sits at 3.21 on the cost index, well to the left. Old Town at 3.84 and Kazimierz at 3.86 sit almost on top of each other at the right. A dashed arrow runs from Podgórze towards them, marking the trajectory its residents expect to follow.'}
            </desc>

            <rect width="1000" height="470" fill="#ededed" />

            {/* Headline */}
            <text
              x={HERO_X0}
              y={68}
              className="font-sans font-bold text-[28px] tracking-tight fill-[#191714]"
            >
              {language === 'pl' ? 'Trzy dzielnice, jeden proces' : 'Three districts, one process'}
            </text>

            {/* Anticipation Vector */}
            <g className="transition-opacity duration-200">
              <path
                d={`M ${xHero(3.26)} 258 L ${xHero(3.76)} 258`}
                stroke="#2352c5"
                strokeWidth="1.5"
                strokeDasharray="4 7"
                markerEnd="url(#phase-arrow-accent)"
                fill="none"
              />
              <text
                x={(xHero(3.26) + xHero(3.76)) / 2}
                y={242}
                textAnchor="middle"
                className="font-sans text-[13px] font-bold tracking-[0.14em] fill-[#2352c5]"
              >
                {language === 'pl' ? 'PRZEWIDYWANA TRAJEKTORIA' : 'ANTICIPATED TRAJECTORY'}
              </text>
            </g>

            {/* Axis Line */}
            <line
              x1={HERO_X0}
              y1={HERO_AXIS_Y}
              x2={HERO_X1}
              y2={HERO_AXIS_Y}
              stroke="#191714"
              strokeWidth="1.5"
              markerEnd="url(#phase-arrow)"
            />
            <text
              x={HERO_X1}
              y={HERO_AXIS_Y + 34}
              textAnchor="end"
              className="font-sans text-[13px] font-semibold tracking-[0.12em] fill-[#595653]"
            >
              {language === 'pl'
                ? 'POSTRZEGANE KOSZTY TURYSTYKI (SKALA 1-5)'
                : 'PERCEIVED COST OF TOURISM (INDEX 1-5)'}
            </text>

            {/* Districts Data Nodes */}
            {districts.map((d) => {
              const cx = xHero(d.costs)
              const up = d.direction === 'up'
              const nameY = up ? d.stem - 40 : d.stem + 30
              const phaseY = up ? d.stem - 14 : d.stem + 56
              const isSelected = activeDistrict === d.id
              const nodeColor = d.accent ? '#2352c5' : '#191714'

              return (
                <g
                  key={d.name}
                  className="cursor-pointer transition-opacity duration-200"
                  onMouseEnter={() => setActiveDistrict(d.id)}
                  onMouseLeave={() => setActiveDistrict(null)}
                  onClick={() => setActiveDistrict(activeDistrict === d.id ? null : d.id)}
                >
                  <line
                    x1={cx}
                    y1={HERO_AXIS_Y}
                    x2={cx}
                    y2={d.stem}
                    stroke="#d4d4d4"
                    strokeWidth="1"
                  />

                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={HERO_AXIS_Y}
                      r="13"
                      fill="none"
                      stroke={nodeColor}
                      strokeWidth="2"
                      opacity="0.4"
                    />
                  )}

                  <circle
                    cx={cx}
                    cy={HERO_AXIS_Y}
                    r={isSelected ? 8.5 : 7}
                    fill={nodeColor}
                    className="transition-all duration-200"
                  />

                  <text
                    x={cx}
                    y={nameY}
                    textAnchor="middle"
                    className="font-sans text-[26px] font-extrabold tracking-[-0.01em]"
                    fill={nodeColor}
                  >
                    {d.name}
                  </text>

                  <text
                    x={cx}
                    y={phaseY}
                    textAnchor="middle"
                    className="font-sans text-[14.5px] tracking-[0.04em] fill-[#595653]"
                  >
                    {d.phase} · n = {d.n} · {d.costs.toFixed(2)}
                  </text>
                </g>
              )
            })}

            {/* Marker Definitions */}
            <defs>
              <marker
                id="phase-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9" stroke="#191714" strokeWidth="1.5" fill="none" />
              </marker>
              <marker
                id="phase-arrow-accent"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9" stroke="#2352c5" strokeWidth="1.5" fill="none" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs md:text-sm">
        <figcaption className="max-w-[46rem] text-zinc-600 leading-relaxed text-pretty">
          {displayCaption}
        </figcaption>

        {activeDistrict && (
          <div className="bg-zinc-100/90 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs text-zinc-700 italic max-w-sm shrink-0">
            "{districts.find((d) => d.id === activeDistrict)?.quote}"
          </div>
        )}
      </div>
    </figure>
  )
}

export const DistrictTrajectoryChart = DistrictPhasesHero

// ==========================================
// 2. LIKERT BARS: PERCEIVED COSTS (C1-C9)
// ==========================================

const LIKERT_SHORT: Record<string, string> = {
  C4: 'Drives up rents',
  C3: 'Drives up service prices',
  C5: 'Displaces everyday shops',
  C7: 'District over-exploited',
  C6: 'Harder to get around',
  C8: 'An attraction, not a home',
  C2: 'Public space less accessible',
  C1: 'Noise disrupts sleep',
  C9: 'A stranger in my own area',
}

const LIKERT_SHORT_PL: Record<string, string> = {
  C4: 'Podbija czynsze',
  C3: 'Podbija ceny usług',
  C5: 'Wypiera codzienne sklepy',
  C7: 'Dzielnica nadmiernie eksploatowana',
  C6: 'Trudniej się przemieszczać',
  C8: 'Atrakcja, a nie dom',
  C2: 'Mniej dostępna przestrzeń',
  C1: 'Hałas zakłóca sen',
  C9: 'Obcy we własnej okolicy',
}

const LIKERT_DOMAIN: [number, number] = [-62, 98]
const LIKERT_LABEL_X = 300
const LIKERT_PLOT_X0 = 320
const LIKERT_PLOT_X1 = 880
const LIKERT_ROW_H = 48
const LIKERT_TOP = 110

const SEGMENT_NAMES = [
  'Strongly disagree',
  'Disagree',
  'Neither',
  'Agree',
  'Strongly agree',
]

const SEGMENT_NAMES_PL = [
  'Zdecydowanie nie',
  'Raczej nie',
  'Trudno powiedzieć',
  'Raczej tak',
  'Zdecydowanie tak',
]

const SEGMENT_COLORS = [
  '#71717a', // Strongly disagree
  '#a1a1aa', // Disagree
  '#ffffff', // Neither (outline)
  '#3f3f46', // Agree
  '#18181b', // Strongly agree
]

function xLikert(pct: number) {
  const [lo, hi] = LIKERT_DOMAIN
  return LIKERT_PLOT_X0 + ((pct - lo) / (hi - lo)) * (LIKERT_PLOT_X1 - LIKERT_PLOT_X0)
}

export const LikertBarsChart: React.FC = () => {
  const [hoveredCode, setHoveredCode] = useState<string | null>(null)
  const { language } = useLanguage()
  const shortMap = language === 'pl' ? LIKERT_SHORT_PL : LIKERT_SHORT
  const segmentNames = language === 'pl' ? SEGMENT_NAMES_PL : SEGMENT_NAMES

  const items = costData.items
  const height = LIKERT_TOP + items.length * LIKERT_ROW_H + 40
  const zeroX = xLikert(0)

  const hoveredItem = useMemo(
    () => items.find((it) => it.code === hoveredCode),
    [hoveredCode, items]
  )

  return (
    <figure className="w-full m-0 flex flex-col">
      <div className="w-full bg-zinc-100/80 border border-zinc-200/90 rounded-2xl overflow-x-auto shadow-xs">
        <div className="min-w-[720px] w-full">
          <svg
            viewBox={`0 0 1000 ${height}`}
            className="w-full h-auto block select-none"
            role="img"
            aria-label={language === 'pl' ? 'Wykres rozbieżny postrzeganych uciążliwości turystyki' : 'Perceived costs of tourism diverging Likert bars'}
          >
            <rect width="1000" height={height} fill="#ededed" />

            {/* Legend */}
            <g>
              {segmentNames.map((name, i) => {
                const lx = 30 + i * 190
                return (
                  <g key={name}>
                    <rect
                      x={lx}
                      y={26}
                      width={13}
                      height={13}
                      fill={SEGMENT_COLORS[i]}
                      stroke="#71717a"
                      strokeWidth={i === 2 ? 1 : 0}
                      rx={1.5}
                    />
                    <text
                      x={lx + 20}
                      y={37}
                      className="font-sans text-[12px] font-bold tracking-[0.08em] fill-[#595653]"
                    >
                      {name.toUpperCase()}
                    </text>
                  </g>
                )
              })}
            </g>

            {/* Baseline / Midpoint */}
            <line
              x1={zeroX}
              y1={LIKERT_TOP - 20}
              x2={zeroX}
              y2={LIKERT_TOP + items.length * LIKERT_ROW_H - 12}
              stroke="#191714"
              strokeWidth="1.5"
            />
            <text
              x={zeroX}
              y={height - 12}
              textAnchor="middle"
              className="font-sans text-[12px] font-bold tracking-[0.1em] fill-[#595653]"
            >
              NEUTRAL MIDPOINT
            </text>

            <text
              x={955}
              y={LIKERT_TOP - 24}
              textAnchor="end"
              className="font-sans text-[13px] font-bold tracking-[0.1em] fill-[#595653]"
            >
              {language === 'pl' ? 'ŚREDNIA' : 'MEAN'}
            </text>

            {/* Rows */}
            {items.map((item, rowIdx) => {
              const y = LIKERT_TOP + rowIdx * LIKERT_ROW_H
              const d = item.distribution
              let cursor = -(d[0] + d[1] + d[2] / 2)
              const isAccent = item.code === 'C4'
              const isHovered = hoveredCode === item.code

              return (
                <g
                  key={item.code}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredCode(item.code)}
                  onMouseLeave={() => setHoveredCode(null)}
                >
                  {/* Subtle row highlight */}
                  {isHovered && (
                    <rect
                      x={10}
                      y={y - 20}
                      width={980}
                      height={LIKERT_ROW_H}
                      fill="#e4e4e7"
                      rx={6}
                      opacity={0.7}
                    />
                  )}

                  {/* Row Label */}
                  <text
                    x={LIKERT_LABEL_X}
                    y={y + 5}
                    textAnchor="end"
                    className={`font-sans text-[16px] transition-colors duration-150 ${
                      isAccent
                        ? 'font-bold fill-[#2352c5]'
                        : isHovered
                        ? 'font-bold fill-[#111111]'
                        : 'font-medium fill-[#191714]'
                    }`}
                  >
                    {shortMap[item.code] ?? item.label}
                  </text>

                  {/* Segments */}
                  {d.map((pct, i) => {
                    const from = cursor
                    cursor += pct
                    if (pct <= 0) return null
                    const w = Math.max(xLikert(cursor) - xLikert(from) - 2, 0.5)

                    return (
                      <rect
                        key={i}
                        x={xLikert(from)}
                        y={y - 12}
                        width={w}
                        height={24}
                        fill={isAccent && (i === 3 || i === 4) ? (i === 4 ? '#2352c5' : '#4f72db') : SEGMENT_COLORS[i]}
                        stroke={i === 2 ? '#a1a1aa' : isHovered ? '#111111' : 'none'}
                        strokeWidth={i === 2 ? 1 : isHovered ? 1 : 0}
                        rx={2}
                        className="transition-all duration-150"
                      />
                    )
                  })}

                  {/* Mean Score */}
                  <text
                    x={955}
                    y={y + 5}
                    textAnchor="end"
                    className={`font-sans tabular-nums text-[16px] transition-colors duration-150 ${
                      isAccent
                        ? 'font-extrabold fill-[#2352c5]'
                        : isHovered
                        ? 'font-extrabold fill-[#111111]'
                        : 'font-bold fill-[#191714]'
                    }`}
                  >
                    {item.mean.toFixed(2)}
                  </text>

                  {/* Item Code */}
                  <text
                    x={992}
                    y={y + 5}
                    textAnchor="end"
                    className="font-sans text-[13px] font-semibold tracking-wider fill-[#71717a]"
                  >
                    {item.code}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs md:text-sm">
        <figcaption className="max-w-[46rem] text-zinc-600 leading-relaxed text-pretty">
          {language === 'pl'
            ? 'W postrzeganiu uciążliwości dominują koszty materialne, a nie zakłócenia spokoju. Zgoda z twierdzeniem, że turystyka podbija czynsze, sięga 88.1%: jest to najwyżej ocenione stwierdzenie w kwestionariuszu o najmniejszej wariancji.'
            : 'Costs are led by money, not by nuisance. Agreement that tourism drives up rents reaches 88.1%, the highest-scoring statement in the questionnaire and the one with the smallest variance.'}
        </figcaption>

        {hoveredItem && (
          <div className="bg-zinc-100/90 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs text-zinc-700 max-w-sm shrink-0">
            <span className="font-semibold text-zinc-900">
              {hoveredItem.code}: {shortMap[hoveredItem.code] ?? hoveredItem.label}
            </span>
            <div className="mt-1 flex gap-2 tabular-nums">
              <span>{language === 'pl' ? 'Zgoda' : 'Agree'}: {hoveredItem.agreePct}%</span>
              <span>·</span>
              <span>{language === 'pl' ? 'Brak zgody' : 'Disagree'}: {hoveredItem.disagreePct}%</span>
              <span>·</span>
              <span>{language === 'pl' ? 'Średnia' : 'Mean'}: {hoveredItem.mean}</span>
            </div>
          </div>
        )}
      </div>
    </figure>
  )
}

// ==========================================
// 3. TWO REGISTERS CLEVELAND DOT PLOT
// ==========================================

const REGISTERS_SHORT: Record<string, string> = {
  C4: 'Tourism drives up rents',
  E2: 'Short-term rental is a problem',
  F1: 'The city manages tourism well',
  C8: 'An attraction, not a home',
  C1: 'Noise disrupts sleep',
}

const REGISTERS_SHORT_PL: Record<string, string> = {
  C4: 'Turystyka podbija czynsze',
  E2: 'Najem krótkoterminowy to problem',
  F1: 'Miasto dobrze zarządza turystyką',
  C8: 'Atrakcja, a nie dom',
  C1: 'Hałas zakłóca sen',
}

const REGISTERS_LABEL_X = 330
const REGISTERS_PLOT_X0 = 360
const REGISTERS_PLOT_X1 = 880
const REGISTERS_ROW_H = 54

const REGISTERS_MARKS = [
  { district: 'Old Town', shape: 'circle' as const },
  { district: 'Kazimierz', shape: 'square' as const },
  { district: 'Podgórze', shape: 'triangle' as const },
]

function xGradient(v: number) {
  return REGISTERS_PLOT_X0 + ((v - 1) / (5 - 1)) * (REGISTERS_PLOT_X1 - REGISTERS_PLOT_X0)
}

function Mark({
  shape,
  cx,
  cy,
  accent,
  isHovered,
}: {
  shape: 'circle' | 'square' | 'triangle'
  cx: number
  cy: number
  accent?: boolean
  isHovered?: boolean
}) {
  const fill = accent ? '#2352c5' : isHovered ? '#000000' : '#191714'
  const scale = isHovered ? 1.3 : 1
  if (shape === 'circle') {
    return <circle cx={cx} cy={cy} r={7 * scale} fill={fill} className="transition-all duration-150" />
  }
  if (shape === 'square') {
    const s = 13 * scale
    return <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} fill={fill} className="transition-all duration-150" />
  }
  const h = 14 * scale
  return (
    <path
      d={`M ${cx} ${cy - h / 2} L ${cx + h / 1.7} ${cy + h / 2} L ${cx - h / 1.7} ${cy + h / 2} Z`}
      fill={fill}
      className="transition-all duration-150"
    />
  )
}

export const TwoRegistersDotPlot: React.FC = () => {
  const [hoveredRowCode, setHoveredRowCode] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null)
  const { language } = useLanguage()
  const shortMap = language === 'pl' ? REGISTERS_SHORT_PL : REGISTERS_SHORT

  const cityWide = registersData.rows.filter((r) => r.register === 'city-wide')
  const graded = registersData.rows.filter((r) => r.register === 'graded')

  const bands = [
    {
      title: language === 'pl' ? 'JEDEN REJESTR OBEJMUJE CAŁE MIASTO' : 'ONE REGISTER REACHES THE WHOLE CITY',
      note: language === 'pl' ? 'Identyczny bez względu na dzielnicę (p > 0.04)' : 'Identical wherever you live (p > 0.04)',
      rows: cityWide,
    },
    {
      title: language === 'pl' ? "DRUGI ODZWIERCIEDLA FAZĘ DZIELNICY" : "ONE TRACKS THE DISTRICT'S PHASE",
      note: language === 'pl' ? 'Zróżnicowany zależnie od zaawansowania turystyfikacji (p < 0.001)' : 'Graded by how far touristification has gone (p < 0.001)',
      rows: graded,
    },
  ]

  let y = 130
  const layout = bands.map((band) => {
    const head = y
    y += 62
    const rows = band.rows.map((row) => {
      const at = y
      y += REGISTERS_ROW_H
      return { row, y: at }
    })
    y += 28
    return { band, head, rows }
  })
  const height = y + 20

  const activeRow = registersData.rows.find((r) => r.code === hoveredRowCode)

  const formatDistrictLabel = (d: string) => {
    if (language === 'pl') {
      if (d === 'Old Town') return 'STARE MIASTO'
      if (d === 'Kazimierz') return 'KAZIMIERZ'
      if (d === 'Podgórze') return 'PODGÓRZE'
    }
    return d.toUpperCase()
  }

  return (
    <figure className="w-full m-0 flex flex-col">
      <div className="w-full bg-zinc-100/80 border border-zinc-200/90 rounded-2xl overflow-x-auto shadow-xs">
        <div className="min-w-[720px] w-full">
          <svg
            viewBox={`0 0 1000 ${height}`}
            className="w-full h-auto block select-none"
            role="img"
            aria-label={
              language === 'pl'
                ? 'Dwa rejestry, jeden proces. Średnie dla dzielnic według wskaźników.'
                : 'Two registers, one process. District means by item, with effect size and significance.'
            }
          >
            <rect width="1000" height={height} fill="#ededed" />

            {/* Legend */}
            {REGISTERS_MARKS.map((m, i) => {
              const lx = REGISTERS_PLOT_X0 + i * 175
              const isSel = selectedDistrict === i
              return (
                <g
                  key={m.district}
                  className="cursor-pointer"
                  onMouseEnter={() => setSelectedDistrict(i)}
                  onMouseLeave={() => setSelectedDistrict(null)}
                  onClick={() => setSelectedDistrict(selectedDistrict === i ? null : i)}
                >
                  <Mark shape={m.shape} cx={lx + 7} cy={32} accent={isSel} isHovered={isSel} />
                  <text
                    x={lx + 24}
                    y={38}
                    className={`font-sans text-[14px] font-bold tracking-[0.1em] transition-colors ${
                      isSel ? 'fill-[#2352c5]' : 'fill-[#595653]'
                    }`}
                  >
                    {formatDistrictLabel(m.district)}
                  </text>
                </g>
              )
            })}

            {/* Scale Gridlines */}
            {[1, 2, 3, 4, 5].map((v) => (
              <g key={v}>
                <line
                  x1={xGradient(v)}
                  y1={76}
                  x2={xGradient(v)}
                  y2={height - 44}
                  stroke="#d4d4d4"
                  strokeWidth="1"
                />
                <text
                  x={xGradient(v)}
                  y={68}
                  textAnchor="middle"
                  className="font-sans text-[15px] font-semibold tracking-[0.1em] fill-[#595653]"
                >
                  {v}
                </text>
              </g>
            ))}

            <text
              x={REGISTERS_PLOT_X1}
              y={height - 20}
              textAnchor="end"
              className="font-sans text-[14px] font-semibold tracking-[0.1em] fill-[#595653]"
            >
              {language === 'pl' ? 'ŚREDNIA ZGODA (1-5)' : 'MEAN AGREEMENT (1-5)'}
            </text>

            <text
              x={990}
              y={68}
              textAnchor="end"
              className="font-sans text-[15px] font-semibold fill-[#595653]"
            >
              ε²
            </text>

            {/* Bands and Rows */}
            {layout.map(({ band, head, rows }) => (
              <g key={band.title}>
                <text
                  x={40}
                  y={head}
                  className="font-sans text-[15px] font-extrabold tracking-[0.14em] fill-[#191714]"
                >
                  {band.title}
                </text>
                <text
                  x={40}
                  y={head + 22}
                  className="font-sans text-[14px] tracking-[0.04em] fill-[#595653]"
                >
                  {band.note}
                </text>

                {rows.map(({ row, y: ry }) => {
                  const xs = row.means.map(xGradient)
                  const isLargeEffect = row.epsilonSq >= 0.1
                  const isRowHovered = hoveredRowCode === row.code

                  return (
                    <g
                      key={row.code}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredRowCode(row.code)}
                      onMouseLeave={() => setHoveredRowCode(null)}
                    >
                      {isRowHovered && (
                        <rect
                          x={20}
                          y={ry - 22}
                          width={970}
                          height={REGISTERS_ROW_H - 4}
                          fill="#e4e4e7"
                          rx={6}
                          opacity={0.7}
                        />
                      )}

                      <text
                        x={REGISTERS_LABEL_X}
                        y={ry + 5}
                        textAnchor="end"
                        className={`font-sans text-[16.5px] transition-colors ${
                          isRowHovered ? 'font-bold fill-[#111111]' : 'font-medium fill-[#191714]'
                        }`}
                      >
                        {shortMap[row.code] ?? row.label}
                      </text>

                      {/* Connector Line */}
                      <line
                        x1={Math.min(...xs)}
                        y1={ry}
                        x2={Math.max(...xs)}
                        y2={ry}
                        stroke={isRowHovered ? '#111111' : '#d4d4d4'}
                        strokeWidth={isRowHovered ? '2' : '1.5'}
                      />

                      {/* District Marks */}
                      {row.means.map((v, i) => (
                        <Mark
                          key={i}
                          shape={REGISTERS_MARKS[i].shape}
                          cx={xGradient(v)}
                          cy={ry}
                          accent={selectedDistrict === i}
                          isHovered={selectedDistrict === i || isRowHovered}
                        />
                      ))}

                      {/* Epsilon Squared Metric */}
                      <text
                        x={990}
                        y={ry + 5}
                        textAnchor="end"
                        className={`font-sans tabular-nums ${
                          isLargeEffect
                            ? 'text-[17px] font-extrabold fill-[#2352c5]'
                            : 'text-[15px] font-medium fill-[#595653]'
                        }`}
                      >
                        {row.epsilonSq.toFixed(3)}
                      </text>
                    </g>
                  )
                })}
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs md:text-sm">
        <figcaption className="max-w-[46rem] text-zinc-600 leading-relaxed text-pretty">
          {language === 'pl'
            ? 'Dwa rejestry, jeden proces. Presja czynszowa, najem krótkoterminowy i brak zaufania do miasta plasują się na jednakowym poziomie we wszystkich trzech dzielnicach. Hałas oraz poczucie utraty domowego charakteru wyraźnie różnicują badane obszary: Kazimierz na jednym biegunie, Podgórze na drugim.'
            : 'Two registers, one process. Rent pressure, short-term rental and distrust of the city sit at the same level in all three districts. Noise and the sense of losing a home fan out sharply: Kazimierz at one end, Podgórze at the other.'}
        </figcaption>

        {activeRow && (
          <div className="bg-zinc-100/90 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs text-zinc-700 max-w-sm shrink-0">
            <span className="font-semibold text-zinc-900">{activeRow.code} · ε² = {activeRow.epsilonSq.toFixed(3)} (p = {activeRow.p})</span>
            <div className="mt-1 flex gap-2 tabular-nums">
              <span>{language === 'pl' ? 'Stare Miasto' : 'Old Town'}: {activeRow.means[0]}</span>
              <span>·</span>
              <span>Kazimierz: {activeRow.means[1]}</span>
              <span>·</span>
              <span>Podgórze: {activeRow.means[2]}</span>
            </div>
          </div>
        )}
      </div>
    </figure>
  )
}

// ==========================================
// 4. FOREST PLOT: REGRESSION MODELS
// ==========================================

type ModelVariant = 'attitude' | 'move-out'

const FOREST_CONFIG = {
  attitude: {
    model: modelsData.ols,
    log: false,
    domain: [-0.72, 0.72] as [number, number],
    ticks: [-0.6, -0.3, 0, 0.3, 0.6],
    origin: 0,
    axis: 'STANDARDISED β',
    format: (v: number) => v.toFixed(2),
    caption:
      'Attitude is a balance sheet, not a demographic. Perceived costs and benefits carry the whole model; age, gender, tenure, occupation and ownership sit flat on zero.',
    valueHead: 'β',
  },
  'move-out': {
    model: modelsData.logit,
    log: true,
    domain: [0.28, 9] as [number, number],
    ticks: [0.5, 1, 2, 4, 8],
    origin: 1,
    axis: 'ODDS RATIO (LOG SCALE)',
    format: (v: number) => v.toFixed(2),
    caption:
      'Costs push far harder than benefits hold. A standard deviation more perceived cost multiplies the odds of seriously considering leaving by 5.5; owning your home roughly halves them.',
    valueHead: 'Odds ratio',
  },
} as const

const TERMS_PL: Record<string, string> = {
  'Perceived costs': 'Postrzegane koszty',
  'Perceived benefits': 'Postrzegane korzyści',
  'Age': 'Wiek',
  'Gender (female)': 'Płeć (kobieta)',
  'Tenure in district': 'Staż zamieszkania w dzielnicy',
  'Employed in tourism': 'Praca w branży turystycznej',
  'Homeowner': 'Własność lokalu (właściciel)',
  'Intercept': 'Stała (wyraz wolny)',
}

export const ForestPlotChart: React.FC<{ initialVariant?: ModelVariant }> = ({
  initialVariant = 'attitude',
}) => {
  const [variant, setVariant] = useState<ModelVariant>(initialVariant)
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null)
  const { language } = useLanguage()

  const cfg = FOREST_CONFIG[variant]
  const { model } = cfg
  const terms = model.terms

  const [lo, hi] = cfg.domain
  const x = (v: number) => {
    const t = cfg.log
      ? (Math.log(Math.min(Math.max(v, lo), hi)) - Math.log(lo)) / (Math.log(hi) - Math.log(lo))
      : (Math.min(Math.max(v, lo), hi) - lo) / (hi - lo)
    return 330 + t * (900 - 330)
  }

  const height = 92 + terms.length * 42 + 56
  const originX = x(cfg.origin)

  const fit =
    'r2' in model
      ? `N = ${model.n} · R² = ${model.r2.toFixed(2)}`
      : `N = ${model.n} · ${model.events} events · pseudo-R² = ${model.pseudoR2.toFixed(2)}`

  const activeTermData = terms.find((t) => t.term === hoveredTerm)

  const axisLabel =
    variant === 'attitude'
      ? language === 'pl'
        ? 'STANDARYZOWANE β'
        : 'STANDARDISED β'
      : language === 'pl'
      ? 'ILORAZ SZANS (SKALA LOGARYTMICZNA)'
      : 'ODDS RATIO (LOG SCALE)'

  const valueHead =
    variant === 'attitude'
      ? 'β'
      : language === 'pl'
      ? 'ILORAZ SZANS'
      : 'ODDS RATIO'

  const resolvedCaption =
    variant === 'attitude'
      ? language === 'pl'
        ? 'Stosunek do turystyki jest bilansem zysków i strat, a nie cechą demograficzną. Postrzegane koszty i korzyści niosą cały model; wiek, płeć, staż, zawód i własność lokalu oscylują wokół zera.'
        : cfg.caption
      : language === 'pl'
      ? 'Koszty wypychają znacznie silniej, niż korzyści zatrzymują. Wzrost postrzeganych kosztów o jedno odchylenie standardowe zwiększa szanse rozważania wyprowadzki 5.5-krotnie; posiadanie mieszkania na własność zmniejsza je o połowę.'
      : cfg.caption

  return (
    <figure className="w-full m-0 flex flex-col">
      {/* Model Selector Tabs */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setVariant('attitude')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            variant === 'attitude'
              ? 'bg-[#111111] text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          {language === 'pl' ? 'Ogólny stosunek do turystyki (OLS, R² = 0.80)' : 'General Attitude (OLS, R² = 0.80)'}
        </button>
        <button
          onClick={() => setVariant('move-out')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            variant === 'move-out'
              ? 'bg-[#111111] text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          {language === 'pl' ? 'Rozważanie wyprowadzki (Logistyczna, OR)' : 'Considering Moving Out (Logistic, OR)'}
        </button>
      </div>

      <div className="w-full bg-zinc-100/80 border border-zinc-200/90 rounded-2xl overflow-x-auto shadow-xs">
        <div className="min-w-[720px] w-full">
          <svg
            viewBox={`0 0 1000 ${height}`}
            className="w-full h-auto block select-none"
            role="img"
            aria-label={`${model.outcome} regression coefficients`}
          >
            <rect width="1000" height={height} fill="#ededed" />

            <text
              x={30}
              y={36}
              className="font-sans text-[15px] font-extrabold tracking-[0.14em] fill-[#191714]"
            >
              {model.outcome.toUpperCase()}
            </text>
            <text
              x={30}
              y={58}
              className="font-sans text-[13px] font-semibold tracking-[0.08em] fill-[#595653]"
            >
              {fit}
            </text>

            {/* Scale Ticks */}
            {cfg.ticks.map((t) => (
              <g key={t}>
                <line
                  x1={x(t)}
                  y1={92 - 26}
                  x2={x(t)}
                  y2={92 + terms.length * 42 - 18}
                  stroke="#d4d4d4"
                  strokeWidth="1"
                />
                <text
                  x={x(t)}
                  y={92 - 34}
                  className="font-sans text-[14px] font-semibold fill-[#595653]"
                  textAnchor="middle"
                >
                  {t}
                </text>
              </g>
            ))}

            <line
              x1={originX}
              y1={92 - 26}
              x2={originX}
              y2={92 + terms.length * 42 - 18}
              stroke="#191714"
              strokeWidth="1.5"
            />
            <text
              x={900}
              y={height - 16}
              className="font-sans text-[13px] font-semibold tracking-[0.1em] fill-[#595653]"
              textAnchor="end"
            >
              {axisLabel}
            </text>

            <text
              x={990}
              y={92 - 34}
              textAnchor="end"
              className="font-sans text-[13px] font-bold tracking-[0.1em] fill-[#595653]"
            >
              {valueHead}
            </text>

            {/* Terms Rows */}
            {terms.map((t, rowIdx) => {
              const yPos = 92 + rowIdx * 42
              const sig = t.significant
              const isHovered = hoveredTerm === t.term

              return (
                <g
                  key={t.term}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredTerm(t.term)}
                  onMouseLeave={() => setHoveredTerm(null)}
                >
                  {isHovered && (
                    <rect
                      x={20}
                      y={yPos - 18}
                      width={970}
                      height={38}
                      fill="#e4e4e7"
                      rx={6}
                      opacity={0.7}
                    />
                  )}

                  <text
                    x={300}
                    y={yPos + 5}
                    textAnchor="end"
                    className={`font-sans text-[15px] transition-colors ${
                      sig
                        ? isHovered
                          ? 'font-bold fill-[#111111]'
                          : 'font-medium fill-[#191714]'
                        : 'font-normal fill-[#8c8882]'
                    }`}
                  >
                    {language === 'pl' ? (TERMS_PL[t.term] ?? t.term) : t.term}
                  </text>

                  {/* 95% CI Bar */}
                  <line
                    x1={x(t.ciLow)}
                    y1={yPos}
                    x2={x(t.ciHigh)}
                    y2={yPos}
                    stroke={sig ? (isHovered ? '#2352c5' : '#191714') : '#a8a29e'}
                    strokeWidth={sig ? (isHovered ? 2.5 : 1.5) : 1}
                  />

                  {/* Point Estimate */}
                  <circle
                    cx={x(t.estimate)}
                    cy={yPos}
                    r={sig ? (isHovered ? 8 : 6.5) : 4}
                    fill={sig ? (isHovered ? '#2352c5' : '#191714') : '#a8a29e'}
                    className="transition-all duration-150"
                  />

                  {/* Number Readout */}
                  <text
                    x={990}
                    y={yPos + 5}
                    textAnchor="end"
                    className={`font-sans tabular-nums text-[15px] ${
                      sig
                        ? isHovered
                          ? 'font-bold fill-[#2352c5]'
                          : 'font-bold fill-[#191714]'
                        : 'font-normal fill-[#8c8882]'
                    }`}
                  >
                    {cfg.format(t.estimate)}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs md:text-sm">
        <figcaption className="max-w-[46rem] text-zinc-600 leading-relaxed text-pretty">
          {resolvedCaption}
        </figcaption>

        {activeTermData && (
          <div className="bg-zinc-100/90 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs text-zinc-700 max-w-sm shrink-0">
            <span className="font-semibold text-zinc-900">
              {language === 'pl' ? (TERMS_PL[activeTermData.term] ?? activeTermData.term) : activeTermData.term}
            </span>
            <div className="mt-1 flex gap-2 tabular-nums">
              <span>{language === 'pl' ? 'Oszacowanie' : 'Est'}: {cfg.format(activeTermData.estimate)}</span>
              <span>·</span>
              <span>95% CI: [{cfg.format(activeTermData.ciLow)}, {cfg.format(activeTermData.ciHigh)}]</span>
              <span>·</span>
              <span>p = {activeTermData.p.toFixed(3)}</span>
            </div>
          </div>
        )}
      </div>
    </figure>
  )
}

// ==========================================
// 5. TYPOLOGY SCATTER PLOT
// ==========================================

const TYP_X0 = 120
const TYP_X1 = 620
const TYP_Y0 = 70
const TYP_Y1 = 570
const TYP_DOMAIN: [number, number] = [1, 5]

const xTyp = (v: number) =>
  TYP_X0 + ((v - TYP_DOMAIN[0]) / (TYP_DOMAIN[1] - TYP_DOMAIN[0])) * (TYP_X1 - TYP_X0)
const yTyp = (v: number) =>
  TYP_Y1 - ((v - TYP_DOMAIN[0]) / (TYP_DOMAIN[1] - TYP_DOMAIN[0])) * (TYP_Y1 - TYP_Y0)

export const TypologyScatterChart: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)
  const [hoveredCentroid, setHoveredCentroid] = useState<string | null>(null)
  const { language } = useLanguage()

  const conflict = typologyData.clusters.find((c) => c.name === 'In conflict')!
  const reconciled = typologyData.clusters.find((c) => c.name === 'Reconciled')!

  return (
    <figure className="w-full m-0 flex flex-col">
      {/* Cluster Filter Buttons */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setSelectedCluster(null)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedCluster === null
              ? 'bg-[#111111] text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          {language === 'pl' ? 'Wszyscy respondenci (N = 446)' : 'All Respondents (N = 446)'}
        </button>
        <button
          onClick={() => setSelectedCluster('In conflict')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedCluster === 'In conflict'
              ? 'bg-[#111111] text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          {language === 'pl' ? 'Tylko w konflikcie (57.3%)' : 'In Conflict Only (57.3%)'}
        </button>
        <button
          onClick={() => setSelectedCluster('Reconciled')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedCluster === 'Reconciled'
              ? 'bg-[#111111] text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          {language === 'pl' ? 'Tylko pogodzeni (42.7%)' : 'Reconciled Only (42.7%)'}
        </button>
      </div>

      <div className="w-full bg-zinc-100/80 border border-zinc-200/90 rounded-2xl overflow-x-auto shadow-xs">
        <div className="min-w-[720px] w-full">
          <svg
            viewBox="0 0 1000 660"
            className="w-full h-auto block select-none"
            role="img"
            aria-label={
              language === 'pl'
                ? 'Wykres rozrzutu typologii mieszkańców: koszty i korzyści'
                : 'Resident typology scatter plot of costs vs benefits'
            }
          >
            <rect width="1000" height={660} fill="#ededed" />

            {/* Scale Gridlines */}
            {[1, 2, 3, 4, 5].map((v) => (
              <g key={v}>
                <line
                  x1={xTyp(v)}
                  y1={TYP_Y0}
                  x2={xTyp(v)}
                  y2={TYP_Y1}
                  stroke="#d4d4d4"
                  strokeWidth="1"
                />
                <line
                  x1={TYP_X0}
                  y1={yTyp(v)}
                  x2={TYP_X1}
                  y2={yTyp(v)}
                  stroke="#d4d4d4"
                  strokeWidth="1"
                />
                <text
                  x={xTyp(v)}
                  y={TYP_Y1 + 26}
                  className="font-sans text-[14px] font-semibold fill-[#595653]"
                  textAnchor="middle"
                >
                  {v}
                </text>
                <text
                  x={TYP_X0 - 14}
                  y={yTyp(v)}
                  className="font-sans text-[14px] font-semibold fill-[#595653] dominant-baseline-central"
                  textAnchor="end"
                >
                  {v}
                </text>
              </g>
            ))}

            <text
              x={TYP_X1}
              y={TYP_Y1 + 54}
              className="font-sans text-[13px] font-bold tracking-[0.1em] fill-[#595653]"
              textAnchor="end"
            >
              {language === 'pl' ? 'POSTRZEGANE KOSZTY →' : 'PERCEIVED COSTS →'}
            </text>
            <text
              x={0}
              y={0}
              transform={`translate(${TYP_X0 - 52} ${TYP_Y0 + 20}) rotate(-90)`}
              className="font-sans text-[13px] font-bold tracking-[0.1em] fill-[#595653]"
              textAnchor="end"
            >
              {language === 'pl' ? '← POSTRZEGANE KORZYŚCI' : '← PERCEIVED BENEFITS'}
            </text>

            {/* The Correlation Caveat Diagonal (-0.73) */}
            <line
              x1={xTyp(1.2)}
              y1={yTyp(4.6)}
              x2={xTyp(4.9)}
              y2={yTyp(1.6)}
              stroke="#2352c5"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              opacity="0.8"
            />
            <text
              x={xTyp(3.3)}
              y={yTyp(2.9) - 14}
              className="font-sans text-[12px] font-bold tracking-wider fill-[#2352c5]"
              textAnchor="middle"
            >
              {language === 'pl' ? 'OŚ KORELACJI (r = -0.73)' : 'CORRELATION AXIS (r = -0.73)'}
            </text>

            {/* Scatter Points */}
            <g>
              {typologyData.points.map((p, i) => {
                const isConflict = p.c === 'In conflict'
                const isDimmed = selectedCluster && selectedCluster !== p.c

                return (
                  <circle
                    key={i}
                    cx={xTyp(p.x)}
                    cy={yTyp(p.y)}
                    r={4}
                    fill={isConflict ? '#191714' : '#ffffff'}
                    stroke="#191714"
                    strokeWidth={isConflict ? 0 : 1.5}
                    opacity={isDimmed ? 0.08 : isConflict ? 0.5 : 0.85}
                    className="transition-opacity duration-200"
                  />
                )
              })}
            </g>

            {/* Centroids */}
            {typologyData.clusters.map((c) => {
              const cx = xTyp(c.costs)
              const cy = yTyp(c.benefits)
              const isHovered = hoveredCentroid === c.name

              return (
                <g
                  key={c.name}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCentroid(c.name)}
                  onMouseLeave={() => setHoveredCentroid(null)}
                  onClick={() => setSelectedCluster(selectedCluster === c.name ? null : c.name)}
                >
                  <path
                    d={`M ${cx - 12} ${cy} H ${cx + 12} M ${cx} ${cy - 12} V ${cy + 12}`}
                    stroke="#2352c5"
                    strokeWidth={isHovered ? 4.5 : 3}
                    className="transition-all duration-150"
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 18 : 14}
                    fill="none"
                    stroke="#2352c5"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity={0.6}
                  />
                </g>
              )
            })}

            {/* Side Cluster Read-out */}
            <g transform="translate(680 96)">
              <text
                x={0}
                y={0}
                className="font-sans text-[16px] font-extrabold tracking-[0.14em] fill-[#191714]"
              >
                {language === 'pl' ? 'W KONFLIKCIE' : 'IN CONFLICT'}
              </text>
              <text x={0} y={30} className="font-sans text-[18px] font-bold fill-[#191714]">
                {language === 'pl'
                  ? `${conflict.sharePct}% próby (n = ${conflict.n})`
                  : `${conflict.sharePct}% of the sample (n = ${conflict.n})`}
              </text>
              <text x={0} y={58} className="font-sans text-[15px] font-medium fill-[#595653]">
                {language === 'pl'
                  ? `koszty ${conflict.costs.toFixed(2)} · korzyści ${conflict.benefits.toFixed(2)}`
                  : `costs ${conflict.costs.toFixed(2)} · benefits ${conflict.benefits.toFixed(2)}`}
              </text>
              <text x={0} y={82} className="font-sans text-[15px] font-bold fill-[#2352c5]">
                {language === 'pl'
                  ? `${conflict.consideringMovePct}% rozważa wyprowadzkę`
                  : `${conflict.consideringMovePct}% considering leaving`}
              </text>

              <text
                x={0}
                y={170}
                className="font-sans text-[16px] font-extrabold tracking-[0.14em] fill-[#191714]"
              >
                {language === 'pl' ? 'POGODZENI' : 'RECONCILED'}
              </text>
              <text x={0} y={200} className="font-sans text-[18px] font-bold fill-[#191714]">
                {language === 'pl'
                  ? `${reconciled.sharePct}% próby (n = ${reconciled.n})`
                  : `${reconciled.sharePct}% of the sample (n = ${reconciled.n})`}
              </text>
              <text x={0} y={228} className="font-sans text-[15px] font-medium fill-[#595653]">
                {language === 'pl'
                  ? `koszty ${reconciled.costs.toFixed(2)} · korzyści ${reconciled.benefits.toFixed(2)}`
                  : `costs ${reconciled.costs.toFixed(2)} · benefits ${reconciled.benefits.toFixed(2)}`}
              </text>
              <text x={0} y={252} className="font-sans text-[15px] font-bold fill-[#2352c5]">
                {language === 'pl'
                  ? `${reconciled.consideringMovePct}% rozważa wyprowadzkę`
                  : `${reconciled.consideringMovePct}% considering leaving`}
              </text>

              {/* Mini Legend */}
              <g transform="translate(0 310)">
                <circle cx={6} cy={-4} r={5} fill="#191714" opacity={0.6} />
                <text
                  x={24}
                  y={0}
                  className="font-sans text-[13px] font-bold tracking-[0.08em] fill-[#595653]"
                >
                  {language === 'pl' ? 'W KONFLIKCIE (PEŁNE)' : 'IN CONFLICT (SOLID)'}
                </text>

                <circle cx={6} cy={26} r={5} fill="#ffffff" stroke="#191714" strokeWidth={1.5} />
                <text
                  x={24}
                  y={30}
                  className="font-sans text-[13px] font-bold tracking-[0.08em] fill-[#595653]"
                >
                  {language === 'pl' ? 'POGODZENI (KONTUR)' : 'RECONCILED (HOLLOW)'}
                </text>

                <path d="M 0 54 H 12 M 6 48 V 60" stroke="#2352c5" strokeWidth={3} />
                <text
                  x={24}
                  y={58}
                  className="font-sans text-[13px] font-bold tracking-[0.08em] fill-[#2352c5]"
                >
                  {language === 'pl' ? 'ŚRODEK SKUPIENIA' : 'CLUSTER CENTROID'}
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <figcaption className="mt-3.5 max-w-[46rem] text-xs md:text-sm text-zinc-600 leading-relaxed text-pretty">
        {language === 'pl'
          ? 'Dwa typy, jedna oś. 57.3% badanych znajduje się w konflikcie, a 42.7% to pogodzeni, lecz oba indeksy korelują na poziomie -0.73, więc skupienia układają się wzdłuż jednej przekątnej. Typologia wyznacza bieguny kontinuum, a nie dwie odrębne populacje.'
          : 'Two types, one axis. 57.3% sit in conflict and 42.7% reconciled, but the indices correlate at -0.73, so the clusters lie along a single diagonal. The typology names the poles of a continuum; it does not prove two separate populations exist.'}
      </figcaption>
    </figure>
  )
}

// ==========================================
// 6. THEME MATRIX: QUALITATIVE CORPUS
// ==========================================

const MATRIX_LABEL_X = 330
const MATRIX_GRID_X0 = 356
const MATRIX_CELL_W = 60
const MATRIX_ROW_H = 44
const MATRIX_TOP = 150

export const ThemeMatrixChart: React.FC = () => {
  const [hoveredResp, setHoveredResp] = useState<number | null>(null)
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null)
  const { language } = useLanguage()

  const { respondents, themes } = themesData
  const height = MATRIX_TOP + themes.length * MATRIX_ROW_H + 70

  const activeThemeObj = themes.find((t) => t.code === hoveredTheme)
  const activeRespObj = hoveredResp !== null ? respondents[hoveredResp] : null

  return (
    <figure className="w-full m-0 flex flex-col">
      <div className="w-full bg-zinc-100/80 border border-zinc-200/90 rounded-2xl overflow-x-auto shadow-xs">
        <div className="min-w-[760px] w-full">
          <svg
            viewBox={`0 0 1000 ${height}`}
            className="w-full h-auto block select-none"
            role="img"
            aria-label={
              language === 'pl'
                ? 'Matryca kodowania tematycznego: 11 motywów w 10 wywiadach pogłębionych'
                : 'Thematic coding matrix: 11 themes across 10 in-depth qualitative interviewees'
            }
          >
            <rect width="1000" height={height} fill="#ededed" />

            {/* Column Highlight */}
            {hoveredResp !== null && (
              <rect
                x={MATRIX_GRID_X0 + hoveredResp * MATRIX_CELL_W}
                y={MATRIX_TOP - 60}
                width={MATRIX_CELL_W}
                height={themes.length * MATRIX_ROW_H + 50}
                fill="#e4e4e7"
                opacity={0.6}
                rx={4}
              />
            )}

            {/* Interviewee Column Headers */}
            {respondents.map((r, i) => {
              const cx = MATRIX_GRID_X0 + i * MATRIX_CELL_W + MATRIX_CELL_W / 2
              const isHovered = hoveredResp === i
              return (
                <g
                  key={r.name}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredResp(i)}
                  onMouseLeave={() => setHoveredResp(null)}
                >
                  <text
                    transform={`translate(${cx} ${MATRIX_TOP - 26}) rotate(-52)`}
                    className={`font-sans text-[13px] font-bold tracking-wider transition-colors ${
                      isHovered ? 'fill-[#2352c5]' : 'fill-[#595653]'
                    }`}
                  >
                    {r.name.toUpperCase()}
                  </text>
                </g>
              )
            })}

            {/* Theme Rows */}
            {themes.map((theme, rowIdx) => {
              const y = MATRIX_TOP + rowIdx * MATRIX_ROW_H
              const inductive = theme.origin === 'inductive'
              const isHovered = hoveredTheme === theme.code

              return (
                <g
                  key={theme.code}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredTheme(theme.code)}
                  onMouseLeave={() => setHoveredTheme(null)}
                >
                  {isHovered && (
                    <rect
                      x={20}
                      y={y - 20}
                      width={970}
                      height={MATRIX_ROW_H - 4}
                      fill="#e4e4e7"
                      opacity={0.6}
                      rx={4}
                    />
                  )}

                  <text
                    x={MATRIX_LABEL_X}
                    y={y + 5}
                    textAnchor="end"
                    className={`font-sans text-[15.5px] transition-colors ${
                      isHovered ? 'font-bold fill-[#111111]' : 'font-medium fill-[#191714]'
                    }`}
                  >
                    {theme.label}
                  </text>
                  <text
                    x={MATRIX_LABEL_X}
                    y={y + 22}
                    textAnchor="end"
                    className="font-sans text-[12.5px] font-semibold tracking-wider fill-[#71717a]"
                  >
                    {theme.code} · {language === 'pl' ? (inductive ? 'INDUKCYJNY' : 'DEDUKCYJNY') : (inductive ? 'INDUCTIVE' : 'DEDUCTIVE')}
                  </text>

                  {/* Dots Grid */}
                  {theme.intensity.map((level, i) => {
                    const cx = MATRIX_GRID_X0 + i * MATRIX_CELL_W + MATRIX_CELL_W / 2
                    const isCellHovered = hoveredResp === i || isHovered

                    if (level === 0) {
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy={y}
                          r={2}
                          fill="#a1a1aa"
                          opacity={isCellHovered ? 0.8 : 0.45}
                        />
                      )
                    }
                    if (level === 1) {
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy={y}
                          r={isCellHovered ? 9 : 7.5}
                          fill="#ffffff"
                          stroke="#191714"
                          strokeWidth={isCellHovered ? 2 : 1.5}
                          className="transition-all duration-150"
                        />
                      )
                    }
                    return (
                      <circle
                        key={i}
                        cx={cx}
                        cy={y}
                        r={isCellHovered ? 12 : 10.5}
                        fill={isCellHovered ? '#2352c5' : '#191714'}
                        className="transition-all duration-150"
                      />
                    )
                  })}
                </g>
              )
            })}

            {/* Legend */}
            <g transform={`translate(${MATRIX_GRID_X0} ${height - 34})`}>
              <circle cx={6} cy={-4} r={2.5} fill="#a1a1aa" />
              <text
                x={18}
                y={0}
                className="font-sans text-[12px] font-bold tracking-[0.08em] fill-[#595653]"
              >
                {language === 'pl' ? 'BRAK (0)' : 'ABSENT (0)'}
              </text>
              <circle cx={130} cy={-4} r={7.5} fill="#ffffff" stroke="#191714" strokeWidth={1.5} />
              <text
                x={146}
                y={0}
                className="font-sans text-[12px] font-bold tracking-[0.08em] fill-[#595653]"
              >
                {language === 'pl' ? 'OBECNY (1)' : 'PRESENT (1)'}
              </text>
              <circle cx={270} cy={-4} r={10.5} fill="#191714" />
              <text
                x={290}
                y={0}
                className="font-sans text-[12px] font-bold tracking-[0.08em] fill-[#595653]"
              >
                {language === 'pl' ? 'KLUCZOWY (2)' : 'CENTRAL (2)'}
              </text>
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs md:text-sm">
        <figcaption className="max-w-[46rem] text-zinc-600 leading-relaxed text-pretty">
          {language === 'pl'
            ? 'Ścieżka kodowania, a nie tylko wnioski. Każdy motyw został zestawiony z każdym rozmówcą, dzięki czemu liczebności przytoczone w tekście można bezpośrednio zweryfikować: w tym jeden motyw podniesiony przez wszystkich dziesięciu rozmówców oraz postulat regulacji najmu krótkoterminowego zgłoszony spontanicznie przez dziewięciu z nich.'
            : 'The coding trail, not just the conclusion. Every theme is shown against every interviewee, so the counts quoted in the text can be verified: including the one theme all ten raised and the demand for short-term rental regulation that nine brought up unprompted.'}
        </figcaption>

        {activeRespObj && (
          <div className="bg-zinc-100/90 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs text-zinc-700 max-w-sm shrink-0">
            <span className="font-semibold text-zinc-900">{activeRespObj.name} ({activeRespObj.district})</span>
            <p className="mt-0.5 text-zinc-600">{activeRespObj.note}</p>
          </div>
        )}

        {activeThemeObj && !activeRespObj && (
          <div className="bg-zinc-100/90 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs text-zinc-700 max-w-sm shrink-0">
            <span className="font-semibold text-zinc-900">{activeThemeObj.code}: {activeThemeObj.label}</span>
            <p className="mt-0.5 text-zinc-600">{activeThemeObj.gloss}</p>
          </div>
        )}
      </div>
    </figure>
  )
}

// ==========================================
// 7. JOINT DISPLAY INTEGRATION MATRIX
// ==========================================

const DIMENSION_PL: Record<
  string,
  { dimension: string; quantitative: string; qualitative: string; convergenceNote: string; verdict: string }
> = {
  'Housing and short-term rental': {
    dimension: 'Mieszkalnictwo i najem krótkoterminowy',
    quantitative: 'C4 czynsze 4.39, 88.1% zgody, najwyżej oceniona pozycja w ankiecie, jednolita we wszystkich dzielnicach (p = 0.193)',
    qualitative: 'T1: budynek bez sąsiadów',
    convergenceNote: 'Zbieżność i wyjaśnienie mechanizmu: wywiady wyjaśniają, jak dochodzi do tego zjawiska',
    verdict: 'Pełna zbieżność',
  },
  'Noise and the night economy': {
    dimension: 'Hałas i gospodarka nocna',
    quantitative: 'C1 zróżnicowany: Kazimierz 3.77 / Stare Miasto 3.31 / Podgórze 2.47 (ε² = 0.177)',
    qualitative: 'T2: noc, która nie należy do nas',
    convergenceNote: 'Identyczny gradient w obu nurtach badania',
    verdict: 'Pełna zbieżność',
  },
  'Everyday infrastructure': {
    dimension: 'Infrastruktura codzienna',
    quantitative: 'C3 usługi 4.15 (76.8%); C5 wypieranie sklepów 3.81 (65.7%)',
    qualitative: 'T3: infrastruktura codziennego życia',
    convergenceNote: '',
    verdict: 'Pełna zbieżność',
  },
  'Domesticity and identity': {
    dimension: 'Domowość i tożsamość',
    quantitative: 'C8 atrakcja zamiast domu: 3.93 / 3.79 / 2.79 (ε² = 0.148)',
    qualitative: 'T4: od domu do scenografii',
    convergenceNote: 'Zbieżność i pogłębienie: metafory nazywają to, co mierzy skala',
    verdict: 'Pełna zbieżność',
  },
  Benefits: {
    dimension: 'Korzyści',
    quantitative: 'Indeks korzyści 2.87; najwyższa pozycja D4 miejsca pracy 3.41 (48.7%)',
    qualitative: 'T5: korzyści są pozycjonalne',
    convergenceNote: 'Ankieta pokazuje skalę; wywiady pokazują kogo dotyczą i dlaczego',
    verdict: 'Częściowa',
  },
  'Institutions and agency': {
    dimension: 'Instytucje i sprawczość',
    quantitative: 'F1 zaufanie 1.99–2.24, jednolicie niskie (p = 0.189); tylko 8.5% uważa, że miasto sprawnie zarządza turystyką',
    qualitative: 'T6: 9 na 10 osób spontanicznie postuluje regulację najmu krótkoterminowego',
    convergenceNote: '',
    verdict: 'Pełna zbieżność',
  },
  'Intention to leave': {
    dimension: 'Zamiar wyprowadzki',
    quantitative: 'G1 13.9–17.8%, brak istotnych różnic między dzielnicami; model logit: koszty OR 5.54, staż OR 1.45, własność OR 0.44',
    qualitative: 'T8: kontinuum od zdecydowanych do zakorzenionych; zakorzenieni to emeryci-właściciele i rodziny od pokoleń',
    convergenceNote: 'Rozbieżność w kwestii stażu: ankieta wiąże staż z odejściem, wywiady z zakorzenieniem. Własność nieruchomości rozstrzyga tę sprzeczność',
    verdict: 'Napięcie',
  },
  'Future outlook': {
    dimension: 'Perspektywa przyszłości',
    quantitative: 'F4 obawy 3.72, wysokie we wszystkich dzielnicach (71.1%)',
    qualitative: 'T9: nieodwracalność zmian',
    convergenceNote: 'Zbieżność pesymizmu: obie metody rejestrują przekonanie o nieodwracalności procesu',
    verdict: 'Pełna zbieżność',
  },
}

export const JointDisplayTable: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [filterMode, setFilterMode] = useState<'all' | 'tension'>('all')
  const { language } = useLanguage()

  const rows = filterMode === 'tension'
    ? jointData.rows.filter((r) => r.convergence === 'tension')
    : jointData.rows

  return (
    <figure className="w-full m-0 flex flex-col">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-[#111111] text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {language === 'pl' ? 'Wszystkie 8 wymiarów' : 'All 8 Dimensions'}
          </button>
          <button
            onClick={() => setFilterMode('tension')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterMode === 'tension'
                ? 'bg-rose-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {language === 'pl' ? 'Wyróżnij rozbieżności (Napięcie)' : 'Highlight Disagreement (Tension)'}
          </button>
        </div>
        <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
          {language === 'pl' ? 'Ankieta (N = 446) + Wywiady (N = 10)' : 'Survey (N = 446) + Interviews (N = 10)'}
        </span>
      </div>

      <div className="w-full bg-white border border-zinc-200 rounded-2xl overflow-x-auto shadow-2xs">
        <table className="w-full text-left text-sm border-collapse min-w-[740px]">
          <caption className="sr-only">
            {language === 'pl'
              ? 'Tabela integracji wyników ankiety (N = 446) z motywami wywiadów (N = 10)'
              : 'Joint display integrating survey results (N = 446) with interview themes (N = 10)'}
          </caption>
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              <th scope="col" className="py-3.5 px-4 font-semibold w-[20%]">
                {language === 'pl' ? 'Wymiar' : 'Dimension'}
              </th>
              <th scope="col" className="py-3.5 px-4 font-semibold w-[32%]">
                {language === 'pl' ? 'Ankieta (ilościowa, N = 446)' : 'Survey (Quantitative, N = 446)'}
              </th>
              <th scope="col" className="py-3.5 px-4 font-semibold w-[24%]">
                {language === 'pl' ? 'Wywiady (jakościowe, N = 10)' : 'Interviews (Qualitative, N = 10)'}
              </th>
              <th scope="col" className="py-3.5 px-4 font-semibold w-[24%]">
                {language === 'pl' ? 'Werdykt integracji' : 'Integration Verdict'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-zinc-700">
            {rows.map((row, idx) => {
              const isTension = row.convergence === 'tension'
              const isHovered = hoveredIdx === idx
              const plRow = DIMENSION_PL[row.dimension]

              const dim = language === 'pl' && plRow ? plRow.dimension : row.dimension
              const quant = language === 'pl' && plRow ? plRow.quantitative : row.quantitative
              const qual = language === 'pl' && plRow ? plRow.qualitative : row.qualitative
              const note = language === 'pl' && plRow ? plRow.convergenceNote : row.convergenceNote
              const verdict =
                language === 'pl'
                  ? isTension
                    ? 'Napięcie'
                    : row.convergence === 'partial'
                    ? 'Częściowa'
                    : 'Zbieżność'
                  : isTension
                  ? 'Tension'
                  : row.convergence === 'partial'
                  ? 'Partial'
                  : 'Convergent'

              return (
                <tr
                  key={row.dimension}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`transition-colors ${
                    isTension
                      ? 'bg-rose-50/70 hover:bg-rose-100/60'
                      : isHovered
                      ? 'bg-zinc-50'
                      : 'bg-white'
                  }`}
                >
                  <th
                    scope="row"
                    className={`py-3.5 px-4 font-medium align-top ${
                      isTension
                        ? 'text-rose-950 font-bold'
                        : 'text-[#111111]'
                    }`}
                  >
                    {dim}
                  </th>
                  <td className="py-3.5 px-4 text-xs text-zinc-600 align-top leading-relaxed">
                    {quant}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-zinc-800 font-medium align-top leading-relaxed">
                    {qual}
                  </td>
                  <td className="py-3.5 px-4 align-top">
                    <span
                      className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isTension
                          ? 'bg-rose-200 text-rose-900'
                          : row.convergence === 'partial'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-zinc-200 text-zinc-800'
                      }`}
                    >
                      {verdict}
                    </span>
                    {note && (
                      <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed">
                        {note}
                      </p>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <figcaption className="mt-3.5 max-w-[46rem] text-xs md:text-sm text-zinc-600 leading-relaxed text-pretty">
        {language === 'pl'
          ? 'W zbieżnym schemacie badawczym oba nurty są analizowane niezależnie i zestawiane na końcu. Matryca integracji stanowi miejsce ich spotkania: w tym tam, gdzie wyniki różnią się w kwestii stażu i zakorzenienia.'
          : 'In a convergent design the two strands are analysed separately and compared at the end. The display is where they meet: including where they disagree on tenure and anchoring.'}
      </figcaption>
    </figure>
  )
}

// ==========================================
// 8. LANDING PAGE THUMBNAIL (GEIST FONT DIRECT INJECTION)
// ==========================================

export const DistrictPhasesThumbnail: React.FC = () => {
  const { language } = useLanguage()

  return (
    <svg
      viewBox="0 0 1000 470"
      className="w-full h-full object-cover select-none"
      role="img"
      aria-label="Three districts, one process diagram"
    >
      <rect width="1000" height="470" fill="#f4f4f5" />
      <text x="110" y="68" className="font-sans font-bold text-[28px] tracking-tight fill-[#111111]">
        {language === 'pl' ? 'Trzy dzielnice, jeden proces' : 'Three districts, one process'}
      </text>

      {/* Trajectory */}
      <g>
        <path
          d="M 258.7 258 L 723.4 258"
          stroke="#2352c5"
          strokeWidth="1.5"
          strokeDasharray="4 7"
          markerEnd="url(#thumb-arrow-accent)"
          fill="none"
        />
        <text
          x="491"
          y="242"
          className="font-sans text-[13px] font-bold tracking-[0.14em] fill-[#2352c5]"
          textAnchor="middle"
        >
          {language === 'pl' ? 'PRZEWIDYWANA TRAJEKTORIA' : 'ANTICIPATED TRAJECTORY'}
        </text>
      </g>

      {/* Axis */}
      <line
        x1="110"
        y1="300"
        x2="900"
        y2="300"
        stroke="#111111"
        strokeWidth="1.5"
        markerEnd="url(#thumb-arrow)"
      />
      <text
        x="900"
        y="334"
        textAnchor="end"
        className="font-sans text-[13px] font-semibold tracking-[0.1em] fill-[#71717a]"
      >
        {language === 'pl' ? 'POSTRZEGANE KOSZTY TURYSTYKI (SKALA 1-5)' : 'PERCEIVED COST OF TOURISM (INDEX 1-5)'}
      </text>

      {/* Podgórze */}
      <g>
        <line x1="212.2" y1="300" x2="212.2" y2="200" stroke="#d4d4d8" strokeWidth="1" />
        <circle cx="212.2" cy="300" r="7" fill="#2352c5" />
        <text
          x="212.2"
          y="160"
          textAnchor="middle"
          className="font-sans font-bold text-[26px] tracking-tight fill-[#2352c5]"
        >
          Podgórze
        </text>
        <text
          x="212.2"
          y="186"
          textAnchor="middle"
          className="font-sans font-medium text-[14.5px] fill-[#71717a]"
        >
          {language === 'pl' ? 'Wciągane w proces · n = 144 · 3.21' : 'Being drawn in · n = 144 · 3.21'}
        </text>
      </g>

      {/* Old Town */}
      <g>
        <line x1="797.8" y1="300" x2="797.8" y2="150" stroke="#d4d4d8" strokeWidth="1" />
        <circle cx="797.8" cy="300" r="7" fill="#111111" />
        <text
          x="797.8"
          y="110"
          textAnchor="middle"
          className="font-sans font-bold text-[26px] tracking-tight fill-[#111111]"
        >
          {language === 'pl' ? 'Stare Miasto' : 'Old Town'}
        </text>
      <text
        x="797.8"
        y="136"
        textAnchor="middle"
        className="font-sans font-medium text-[14.5px] fill-[#71717a]"
      >
        {language === 'pl' ? 'Dojrzała turystyfikacja · n = 156 · 3.84' : 'Mature touristification · n = 156 · 3.84'}
      </text>
    </g>

    {/* Kazimierz */}
    <g>
      <line x1="816.4" y1="300" x2="816.4" y2="380" stroke="#d4d4d8" strokeWidth="1" />
      <circle cx="816.4" cy="300" r="7" fill="#111111" />
      <text
        x="816.4"
        y="410"
        textAnchor="middle"
        className="font-sans font-bold text-[26px] tracking-tight fill-[#111111]"
      >
        Kazimierz
      </text>
      <text
        x="816.4"
        y="436"
        textAnchor="middle"
        className="font-sans font-medium text-[14.5px] fill-[#71717a]"
      >
        {language === 'pl' ? 'Gwałtowna, najem i życie nocne · n = 146 · 3.86' : 'Rapid, rental- and nightlife-driven · n = 146 · 3.86'}
      </text>
    </g>

    <defs>
      <marker
        id="thumb-arrow"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 9 5 L 0 9" stroke="#111111" strokeWidth="1.5" fill="none" />
      </marker>
      <marker
        id="thumb-arrow-accent"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#2352c5" strokeWidth="1.5" />
      </marker>
    </defs>
  </svg>
  )
}
