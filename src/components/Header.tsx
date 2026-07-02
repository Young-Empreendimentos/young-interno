import { LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'
import { Logo } from './Logo'

export function Header() {
  const { user, signOut } = useAuth()

  const nome =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split('@')[0] ??
    'usuário'

  const iniciais = nome
    .split(/[.\s]+/)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join('')

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-young-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <span className="hidden text-sm font-medium text-young-gray-light/50 sm:inline">
            / Portal Interno
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-young-gray-lighter capitalize">{nome}</p>
            <p className="text-xs text-young-gray-light/50">{user?.email}</p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-full bg-young-orange/15 font-display text-sm font-semibold text-young-orange">
            {iniciais}
          </div>
          <button
            onClick={() => void signOut()}
            title="Sair"
            className="flex size-9 items-center justify-center rounded-full border border-border text-young-gray-light/70 transition hover:border-young-orange/50 hover:text-young-orange"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
