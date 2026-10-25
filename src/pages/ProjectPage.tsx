import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Media from '../components/Media'
import { featured, type Kind } from '../data/projects'
import { profile as p } from '../data/profile'

const kindColor: Record<Kind, string> = { 'Actual result': 'bg-emerald-50 text-emerald-800', Projected: 'bg-amber-50 text-amber-800', Simulated: 'bg-violet-50 text-violet-800', 'Proposed solution': 'bg-sky-50 text-sky-800', Prototype: 'bg-slate-100 text-slate-700' }
const Block = ({ title, text }: { title: string; text?: string }) =>
  text ? <section><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 max-w-prose leading-relaxed text-mute">{text}</p></section> : null

export default function ProjectPage() {
  const { id } = useParams()
  const i = featured.findIndex(x => x.id === id)
  const pr = featured[i]
  useEffect(() => { if (pr) document.title = `${pr.title} — ${p.name}` }, [pr])
  if (!pr) return (
    <main className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="text-2xl font-bold">Project not found</h1>
      <Link to="/#projects" className="mt-6 inline-block font-semibold text-accent">Back to projects</Link>
    </main>)
  const next = featured[(i + 1) % featured.length]
  return (<>
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <nav aria-label="Primary" className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1.5">
        <Link to="/" aria-label="Home" className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-bold tracking-wide text-white transition hover:bg-accent">SA</Link>
        <Link to="/#projects" className="rounded-full px-4 py-2 text-sm font-medium text-mute transition hover:bg-ink/5 hover:text-ink">All projects</Link>
      </nav>
    </header>
    <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 md:pt-32 md:pb-16">
      <p className="text-sm font-medium text-accent">{pr.category}</p>
      <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">{pr.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mute">{pr.summary}</p>
      {pr.tags.length > 0 && <ul className="mt-5 flex flex-wrap gap-1.5">{pr.tags.map(t => <li key={t} className="glass rounded-md px-2 py-0.5 text-xs text-mute">{t}</li>)}</ul>}
      <Media {...pr.media} className="mt-10 w-full shadow-sm" />
      <div className="mt-14 space-y-12">
        <Block title="Background and problem" text={pr.problem} />
        <Block title="My role" text={pr.role} />
        <Block title="Approach and solution" text={pr.approach} />
        <Block title="Tools and methods" text={pr.tools} />
        {pr.sections?.map(s => <Block key={s.title} title={s.title} text={s.body} />)}
        {pr.results && <section>
          <h2 className="text-xl font-bold">Results and impact</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {pr.results.map(r => <li key={r.text} className="glass rounded-xl p-4 text-sm leading-relaxed text-mute">
              <span className={`mb-2 inline-block rounded px-1.5 py-0.5 text-xs font-medium ${kindColor[r.kind]}`}>{r.kind}</span><br />{r.text}
            </li>)}
          </ul>
        </section>}
        {pr.gallery && pr.gallery.length > 0 && <section>
          <h2 className="text-xl font-bold">Project visuals</h2>
          <div className="mt-4 grid items-start gap-5 md:grid-cols-2">
            {pr.gallery.map(g => <figure key={g.src}><Media src={g.src} alt={g.alt} ratio={g.ratio} />{g.caption && <figcaption className="mt-2 text-xs text-mute">{g.caption}</figcaption>}</figure>)}
          </div>
        </section>}
        {pr.note && <p className="text-xs italic text-mute">{pr.note}</p>}
      </div>
      <nav aria-label="Project navigation" className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <Link to="/#projects" className="glass rounded-md px-4 py-2 text-sm font-semibold transition duration-300 hover:border-accent hover:bg-accent hover:bg-none hover:text-white">Back to all projects</Link>
        {next.id !== pr.id && <Link to={`/projects/${next.id}`} className="group text-right text-sm"><span className="block text-xs text-mute">Next project</span><span className="font-semibold group-hover:text-accent">{next.title}</span></Link>}
      </nav>
    </main>
  </>)
}
