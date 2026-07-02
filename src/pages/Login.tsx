import { useState, type FormEvent } from 'react'
import { Loader2, Lock, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'
import { isSupabaseConfigured } from '../lib/supabase'
import { Logo } from '../components/Logo'

export function Login() {
  const { signIn, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

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

  async function handleGoogle() {
    setError(null)
    setGoogleLoading(true)
    const { error } = await signInWithGoogle()
    if (error) {
      setError(traduzErro(error))
      setGoogleLoading(false)
    }
    // Em caso de sucesso, o navegador é redirecionado para o Google.
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
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="mb-5 flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white py-2.5 font-display text-sm font-semibold text-[#1f1f1f] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <svg className="size-4" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
            )}
            {googleLoading ? 'Redirecionando…' : 'Entrar com Google'}
          </button>

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-young-gray-light/40">ou</span>
            <span className="h-px flex-1 bg-border" />
          </div>

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
