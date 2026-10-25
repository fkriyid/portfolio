import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Rich from './components/Rich'
import Media from './components/Media'
import { profile as p } from './data/profile'
import { featured, more, type Project, type Kind } from './data/projects'
import { experience, education } from './data/experience'
import { skills } from './data/skills'

const kindColor: Record<Kind, string> = { 'Actual result': 'bg-emerald-50 text-emerald-800', Projected: 'bg-amber-50 text-amber-800', Simulated: 'bg-violet-50 text-violet-800', 'Proposed solution': 'bg-sky-50 text-sky-800', Prototype: 'bg-slate-100 text-slate-700' }
const btn = 'inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors'
const nav = ['About', 'Projects', 'Experience', 'Contact']

function useCv() {
  const [ok, setOk] = useState(false)
  useEffect(() => { fetch(p.cvFile, { method: 'HEAD' }).then(r => setOk(r.ok && (r.headers.get('content-type') || '').includes('pdf'))).catch(() => setOk(false)) }, [])
  return ok
}
const Tags = ({ t }: { t: string[] }) => <ul className="flex flex-wrap gap-1.5">{t.map(x => <li key={x} className="glass rounded-md px-2 py-0.5 text-xs text-mute">{x}</li>)}</ul>
const Row = ({ h, c }: { h: string; c?: string }) => c ? <div><h4 className="text-sm font-semibold">{h}</h4><p className="mt-1 text-sm leading-relaxed text-mute">{c}</p></div> : null

function Card({ pr, link = false }: { pr: Project; link?: boolean }) {
  return (
    <article className="glass flex flex-col gap-4 rounded-xl p-5">
      <Media {...pr.media} />
      <div>
        <p className="text-xs font-medium text-accent">{pr.category}</p>
        <h3 className="mt-1 text-lg font-semibold leading-snug">{link ? <Link to={`/projects/${pr.id}`} className="hover:text-accent">{pr.title}</Link> : pr.title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-mute">{pr.summary}</p>
      {pr.tags.length > 0 && <Tags t={pr.tags} />}
      {link && <Link to={`/projects/${pr.id}`} className="glass self-start rounded-md px-4 py-2 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:bg-none hover:text-white">View Case Study</Link>}
      {!link && pr.note && <p className="text-xs italic text-mute">{pr.note}</p>}
    </article>)
}

export default function App() {
  const cv = useCv()
  const [menu, setMenu] = useState(false)
  const c = p.contact
  const CvBtn = ({ cls }: { cls: string }) => cv ? <a href={p.cvFile} download className={`${btn} ${cls}`}>Download CV</a> : null
  return (<>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div className="pointer-events-auto relative">
        <nav aria-label="Primary" className="glass flex items-center gap-1 rounded-full p-1.5">
          <a href="#top" aria-label="Home" className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-bold tracking-wide text-white transition hover:bg-accent">SA</a>
          <div className="hidden items-center gap-1 md:flex">
            {nav.map(n => <a key={n} href={`#${n.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm font-medium text-mute transition hover:bg-ink/5 hover:text-ink">{n}</a>)}
            {cv && <a href={p.cvFile} download className="ml-1 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent">Download CV</a>}
          </div>
          <button className="rounded-full px-4 py-2 text-sm font-medium md:hidden" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? 'Close' : 'Menu'}</button>
        </nav>
        {menu && (
          <div className="glass absolute left-1/2 top-full mt-2 flex min-w-[14rem] -translate-x-1/2 flex-col gap-1 rounded-2xl p-2 md:hidden">
            {nav.map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenu(false)} className="rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-ink/5">{n}</a>)}
            {cv && <a href={p.cvFile} download className="rounded-xl bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white">Download CV</a>}
          </div>
        )}
      </div>
    </header>

    <main id="main">
      <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-28 pb-16 md:grid-cols-2 md:pt-36 md:pb-24">
        <div>
          <p className="text-xs font-medium tracking-wider text-accent">{p.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">{p.headline}</h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-mute">{p.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className={`${btn} bg-accent text-white hover:bg-ink`}>Explore Projects</a>
            <CvBtn cls="glass hover:border-accent" />
          </div>
        </div>
        <Media src={p.headshot} alt="Sayid Ali Nurfikri" ratio="4/5" className="mx-auto w-full max-w-sm" />
      </section>

      <section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-5">
        <div className="md:col-span-3"><h2 className="text-2xl font-bold">About</h2>{p.about.map(t => <p key={t} className="mt-4 max-w-prose leading-relaxed text-mute"> <Rich text={t} /></p>)}</div>
        <div className="space-y-4 md:col-span-2"><h3 className="text-sm font-semibold">Skills</h3>{skills.map(s => <div key={s.group}><p className="mb-1.5 text-xs text-mute">{s.group}</p><Tags t={s.items} /></div>)}</div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-2xl font-bold">Featured projects</h2>
        <div className="mt-8 grid items-start gap-6 md:grid-cols-2">{featured.map(x => <Card key={x.id} pr={x} link />)}</div>
        <h2 className="mt-20 text-2xl font-bold">More projects</h2>
        <div className="mt-8 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">{more.map(x => <Card key={x.id} pr={x} />)}</div>
      </section>

      <section id="experience" className="border-t border-line bg-white/30 backdrop-blur-sm">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
          {[['Experience', experience], ['Education', education]].map(([title, list]) => <div key={title as string}>
            <h2 className="text-2xl font-bold">{title as string}</h2>
            <ol className="mt-6 space-y-6 border-l border-line pl-5">{(list as typeof experience).map(e => <li key={e.org + e.role}><p className="font-semibold">{e.org}</p><p className="text-sm">{e.role}</p><p className="text-xs text-mute">{e.dates}</p></li>)}</ol>
          </div>)}
        </div>
      </section>
    </main>

    <footer id="contact" className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-bold">Let’s Work Together</h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <li><a className="underline underline-offset-4" href={`mailto:${c.email}`}>{c.email}</a></li>
          {c.linkedin && <li><a className="underline underline-offset-4" href={c.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
          <li><a className="underline underline-offset-4" href={c.github.url} target="_blank" rel="noopener noreferrer">GitHub: {c.github.handle}</a></li>
          <li><a className="underline underline-offset-4" href={c.instagram.url} target="_blank" rel="noopener noreferrer">Instagram: {c.instagram.handle}</a></li>
          {cv && <li><a className="underline underline-offset-4" href={p.cvFile} download>Download CV</a></li>}
        </ul>
        <p className="mt-12 text-xs text-white/60">© 2026 {p.name}</p>
      </div>
    </footer>
  </>)
}
