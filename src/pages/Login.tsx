import { useState, type FormEvent } from 'react'
import { Loader2, Lock, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'
import { isSupabaseConfigured } from '../lib/supabase'
import { Logo } from '../components/Logo'

export function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error } = await signIn(email.trim(), password)
    if (error) {
      setError(traduzErro(error))
      setSubmitting(false)
    }
    // Em caso de sucesso, o AuthProvider troca a tela automaticamente.
  }

  return (
    <div className="bg-young-glow flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo size={44} />
          <h1 className="font-display mt-6 text-2xl font-bold text-young-gray-lighter">
            Portal Interno
          </h1>
          <p className="mt-1 text-sm text-young-gray-light/70">
            Acesse todos os sistemas da Young com seu login único.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-surface/80 p-6 shadow-2xl backdrop-blur"
        >
          <label className="mb-4 block">
            <span className="mb-1.5 block text-xs font-medium text-young-gray-light/80">
              E-mail
            </span>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-young-gray-light/50" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@youngempreendimentos.com.br"
                className="w-full rounded-lg border border-border bg-young-black/60 py-2.5 pl-9 pr-3 text-sm text-young-gray-lighter placeholder:text-young-gray-light/30 focus:border-young-orange focus:outline-none"
              />
            </div>
          </label>

          <label className="mb-5 block">
            <span className="mb-1.5 block text-xs font-medium text-young-gray-light/80">
              Senha
            </span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-young-gray-light/50" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-young-black/60 py-2.5 pl-9 pr-3 text-sm text-young-gray-lighter placeholder:text-young-gray-light/30 focus:border-young-orange focus:outline-none"
              />
            </div>
          </label>

          {error && (
            <p className="mb-4 rounded-lg border border-young-orange/40 bg-young-orange/10 px-3 py-2 text-sm text-young-orange">
              {error}
            </p>
          )}

          {!isSupabaseConfigured && (
            <p className="mb-4 rounded-lg border border-young-blue-bright/40 bg-young-blue-bright/10 px-3 py-2 text-xs text-young-blue-bright">
              Supabase não configurado. Copie <code>.env.example</code> para{' '}
              <code>.env</code> e preencha as credenciais.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-young-orange py-2.5 font-display text-sm font-semibold text-young-black transition hover:bg-young-orange/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            {submitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="mt-8 text-center font-display text-xs tracking-wide text-young-gray-light/40">
          Valorizando sonhos, construindo o futuro.
        </p>
      </div>
    </div>
  )
}

function traduzErro(msg: string): string {
  if (/invalid login credentials/i.test(msg)) return 'E-mail ou senha inválidos.'
  if (/email not confirmed/i.test(msg)) return 'E-mail ainda não confirmado.'
  if (/rate limit/i.test(msg)) return 'Muitas tentativas. Aguarde um instante.'
  return msg
}
