import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthProvider'
import { isSupabaseConfigured } from '../lib/supabase'
import { Logo } from '../components/Logo'

export function Login() {
  const { signInWithGoogle } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [googleLoading, setGoogleLoading] = useState(false)

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
            Acesse todos os sistemas da Young com sua conta Google
            <span className="text-young-gray-light"> @youngempreendimentos.com.br</span>.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface/80 p-6 shadow-2xl backdrop-blur">
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white py-3 font-display text-sm font-semibold text-[#1f1f1f] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <svg className="size-5" viewBox="0 0 48 48" aria-hidden="true">
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

          {error && (
            <p className="mt-4 rounded-lg border border-young-orange/40 bg-young-orange/10 px-3 py-2 text-sm text-young-orange">
              {error}
            </p>
          )}

          {!isSupabaseConfigured && (
            <p className="mt-4 rounded-lg border border-young-blue-bright/40 bg-young-blue-bright/10 px-3 py-2 text-xs text-young-blue-bright">
              Supabase não configurado. Verifique as variáveis de ambiente.
            </p>
          )}
        </div>

        <p className="mt-8 text-center font-display text-xs tracking-wide text-young-gray-light/40">
          Valorizando sonhos, construindo o futuro.
        </p>
      </div>
    </div>
  )
}

function traduzErro(msg: string): string {
  if (/popup|cancel/i.test(msg)) return 'Login cancelado. Tente novamente.'
  if (/rate limit/i.test(msg)) return 'Muitas tentativas. Aguarde um instante.'
  if (/redirect/i.test(msg)) return 'URL de redirecionamento não autorizada no Supabase.'
  return msg
}
