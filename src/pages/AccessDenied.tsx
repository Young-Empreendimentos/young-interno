import { ShieldAlert, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'
import { Logo } from '../components/Logo'

export function AccessDenied() {
  const { user, signOut } = useAuth()

  return (
    <div className="bg-young-glow flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm text-center">
        <div className="mb-6 flex justify-center">
          <Logo size={40} />
        </div>
        <div className="rounded-2xl border border-border bg-surface/80 p-8 shadow-2xl backdrop-blur">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-young-orange/12 text-young-orange">
            <ShieldAlert className="size-6" />
          </div>
          <h1 className="font-display text-xl font-bold text-young-gray-lighter">
            Acesso restrito
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-young-gray-light/60">
            O portal é exclusivo para contas{' '}
            <span className="text-young-gray-lighter">@youngempreendimentos.com.br</span>.
          </p>
          {user?.email && (
            <p className="mt-3 rounded-lg border border-border bg-young-black/40 px-3 py-2 text-xs text-young-gray-light/50">
              Você entrou como <span className="text-young-gray-light">{user.email}</span>
            </p>
          )}
          <button
            onClick={() => void signOut()}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 font-display text-sm font-semibold text-young-gray-lighter transition hover:border-young-orange/50 hover:text-young-orange"
          >
            <LogOut className="size-4" />
            Sair e entrar com outra conta
          </button>
        </div>
      </div>
    </div>
  )
}
