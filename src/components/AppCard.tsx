import { ArrowUpRight } from 'lucide-react'
import type { AppEntry } from '../config/apps'

const STATUS_LABEL: Record<AppEntry['status'], string | null> = {
  ativo: null,
  legado: 'Legado',
  'em-breve': 'Em breve',
}

export function AppCard({ app }: { app: AppEntry }) {
  const Icon = app.icon
  const disabled = app.url === '#' || app.status === 'em-breve'
  const statusLabel = STATUS_LABEL[app.status]

  return (
    <a
      href={disabled ? undefined : app.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={disabled}
      onClick={(e) => disabled && e.preventDefault()}
      className={[
        'group relative flex flex-col gap-3 rounded-xl border border-border bg-surface p-4',
        'transition duration-200',
        disabled
          ? 'cursor-not-allowed opacity-55'
          : 'hover:-translate-y-0.5 hover:border-young-orange/60 hover:bg-surface-hover hover:shadow-[0_0_0_1px_rgba(254,80,9,0.25),0_12px_30px_-12px_rgba(254,80,9,0.35)]',
      ].join(' ')}
    >
      <div className="flex items-start justify-between">
        <div className="flex size-11 items-center justify-center rounded-lg bg-young-orange/12 text-young-orange transition group-hover:bg-young-orange group-hover:text-young-black">
          <Icon className="size-5" strokeWidth={2} />
        </div>
        {!disabled && (
          <ArrowUpRight className="size-4 text-young-gray-light/30 transition group-hover:text-young-orange" />
        )}
        {statusLabel && (
          <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-young-gray-light/60">
            {statusLabel}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-display text-base font-semibold text-young-gray-lighter">
          {app.name}
        </h3>
        <p className="mt-1 text-sm leading-snug text-young-gray-light/60">{app.description}</p>
      </div>

      {app.url === '#' && (
        <span className="absolute bottom-3 right-4 text-[10px] italic text-young-gray-light/40">
          URL pendente
        </span>
      )}
    </a>
  )
}
