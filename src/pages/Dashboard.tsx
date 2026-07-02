import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { APPS, CATEGORIES, type AppEntry } from '../config/apps'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { AppCard } from '../components/AppCard'

function normalize(s: string) {
  // Remove acentos para busca "sem acento": normaliza e tira os
  // diacríticos combinantes (U+0300–U+036F).
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

export function Dashboard() {
  const [query, setQuery] = useState('')

  const filtered = useMemo<AppEntry[]>(() => {
    const q = normalize(query.trim())
    if (!q) return APPS
    return APPS.filter((app) =>
      normalize(`${app.name} ${app.description} ${app.tech ?? ''}`).includes(q),
    )
  }, [query])

  const grouped = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        ...cat,
        apps: filtered.filter((a) => a.category === cat.id),
      })).filter((g) => g.apps.length > 0),
    [filtered],
  )

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        {/* Busca */}
        <section className="bg-young-glow -mx-4 mb-8 rounded-2xl px-4 py-6 sm:mx-0 sm:px-8">
          <SearchBar value={query} onChange={setQuery} />
        </section>

        {/* Grupos */}
        {grouped.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <SearchX className="size-8 text-young-gray-light/30" />
            <p className="text-sm text-young-gray-light/50">
              Nenhuma aplicação encontrada para “{query}”.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {grouped.map((group) => (
              <section key={group.id}>
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: group.accent }}
                  />
                  <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-young-gray-light/70">
                    {group.label}
                  </h2>
                  <span className="text-xs text-young-gray-light/30">
                    {group.apps.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.apps.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border py-6 text-center">
        <p className="font-display text-xs tracking-wide text-young-gray-light/30">
          Young Empreendimentos · Valorizando sonhos, construindo o futuro.
        </p>
      </footer>
    </div>
  )
}
