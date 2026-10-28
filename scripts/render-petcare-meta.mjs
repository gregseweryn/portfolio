import { readFile, writeFile, mkdir } from 'node:fs/promises'

// Social crawlers need the case-study metadata before the React app runs.
const title = 'PetCare Case Study | Grzegorz Seweryn'
const description = 'Designing a shared pet-care record through discovery interviews, prototype testing and explicit reporting, uncertainty and recovery states.'
const url = 'https://grzegorzseweryn.pl/work/petcare'
const image = `${url}/cover.png`
let html = await readFile('dist/index.html', 'utf8')
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
function replace(pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Missing metadata target: ${pattern}`)
  html = html.replace(pattern, replacement)
}
replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
for (const [attribute, name, value] of [
  ['name', 'description', description],
  ['property', 'og:title', title], ['property', 'og:description', description],
  ['property', 'og:url', url], ['property', 'og:image', image], ['property', 'og:type', 'article'],
  ['name', 'twitter:title', title], ['name', 'twitter:description', description],
  ['name', 'twitter:url', url], ['name', 'twitter:image', image],
]) replace(new RegExp(`<meta ${attribute}="${name}"[^>]*>`), `<meta ${attribute}="${name}" content="${escape(value)}" />`)
replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>
  <main><h1>PetCare</h1><p>A shared record for the people caring for your pet.</p>
  <p>Self-initiated UX/UI concept by Grzegorz Seweryn, 2026. Four discovery interviews informed the concept. An earlier prototype was evaluated with five participants. Later revisions and shared-care setup were checked separately and have not been participant-retested.</p>
  <p>The interactive prototype distinguishes a planned dose, a caregiver report and uncertainty. It uses preset inputs and simulated saves and invitations, not production authentication or live synchronisation.</p>
  <p><a href="/work">All projects</a>. Enable JavaScript to explore the full bilingual case study.</p></main>
</noscript>`)
await mkdir('dist/work/petcare', { recursive: true })
await writeFile('dist/work/petcare/index.html', html)
console.log('PetCare static route metadata generated')
