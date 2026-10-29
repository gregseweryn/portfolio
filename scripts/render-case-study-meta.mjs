import { readFile, writeFile, mkdir } from 'node:fs/promises'

const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

function renderCaseStudyHtml(baseHtml, config) {
  let html = baseHtml

  function replace(pattern, replacement) {
    if (!pattern.test(html)) throw new Error(`Missing metadata target: ${pattern}`)
    html = html.replace(pattern, replacement)
  }

  replace(/<title>[^<]*<\/title>/, `<title>${escape(config.title)}</title>`)
  replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${config.url}" />`)

  for (const [attribute, name, value] of [
    ['name', 'description', config.description],
    ['property', 'og:title', config.title],
    ['property', 'og:description', config.description],
    ['property', 'og:url', config.url],
    ['property', 'og:image', config.image],
    ['property', 'og:type', 'article'],
    ['name', 'twitter:title', config.title],
    ['name', 'twitter:description', config.description],
    ['name', 'twitter:url', config.url],
    ['name', 'twitter:image', config.image],
  ]) {
    replace(new RegExp(`<meta ${attribute}="${name}"[^>]*>`), `<meta ${attribute}="${name}" content="${escape(value)}" />`)
  }

  replace(/<noscript>[\s\S]*?<\/noscript>/, config.noscript)
  return html
}

const baseHtml = await readFile('dist/index.html', 'utf8')

// 1. Render PetCare
const petcareConfig = {
  title: 'PetCare Case Study | Grzegorz Seweryn',
  description: 'Designing a shared pet-care record through discovery interviews, prototype testing and explicit reporting, uncertainty and recovery states.',
  url: 'https://grzegorzseweryn.pl/work/petcare',
  image: 'https://grzegorzseweryn.pl/work/petcare/cover.png',
  noscript: `<noscript>
  <main><h1>PetCare</h1><p>A shared record for the people caring for your pet.</p>
  <p>Self-initiated UX/UI concept by Grzegorz Seweryn, 2026. Four discovery interviews informed the concept. An earlier prototype was evaluated with five participants. Later revisions and shared-care setup were checked separately and have not been participant-retested.</p>
  <p>The interactive prototype distinguishes a planned dose, a caregiver report and uncertainty. It uses preset inputs and simulated saves and invitations, not production authentication or live synchronisation.</p>
  <p><a href="/work">All projects</a>. Enable JavaScript to explore the full bilingual case study.</p></main>
</noscript>`
}

const petcareHtml = renderCaseStudyHtml(baseHtml, petcareConfig)
await mkdir('dist/work/petcare', { recursive: true })
await writeFile('dist/work/petcare/index.html', petcareHtml)
console.log('PetCare static route metadata generated')

// 2. Render Motion Tokens Studio
const motionTokensConfig = {
  title: 'Motion Tokens Studio | Grzegorz Seweryn',
  description: 'Authoritative motion token design system with typed mathematical bounds, dark devtools studio, and multi-format CSS, Tailwind, Framer and W3C exports.',
  url: 'https://grzegorzseweryn.pl/work/motion-tokens',
  image: 'https://grzegorzseweryn.pl/work/motion-tokens/cover.png',
  noscript: `<noscript>
  <main><h1>Motion Tokens Studio</h1><p>Systematizing UI motion into typed tokens, live dark devtools, and multi-format code exports.</p>
  <p>By Grzegorz Seweryn, 2026. Interactive devtools studio evaluated against Jakob Nielsen’s 10 usability heuristics with WAI-ARIA accessible components.</p>
  <p><a href="/work">All projects</a>. Enable JavaScript to explore the full interactive motion studio.</p></main>
</noscript>`
}

const motionTokensHtml = renderCaseStudyHtml(baseHtml, motionTokensConfig)
await mkdir('dist/work/motion-tokens', { recursive: true })
await writeFile('dist/work/motion-tokens/index.html', motionTokensHtml)
console.log('Motion Tokens static route metadata generated')
