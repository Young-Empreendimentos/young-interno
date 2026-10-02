// Cliente Supabase do Portal interno.
// ⚠️ SSO da Young (02/10/2026): a sessão é guardada em COOKIE no domínio pai
// `.youngempreendimentos.com.br` (via @supabase/ssr), e não mais no localStorage.
// Logar em qualquer sistema da Young no mesmo navegador já deixa este app logado, e vice-versa.
// Em localhost (dev) o cookie fica só no host local.
// Regra pra TODOS os apps: `signOut({ scope: 'local' })` — nunca o global, que apaga a
// sessão da pessoa em todos os sistemas e dispositivos.
import { createBrowserClient } from '@supabase/ssr'

// Credenciais vêm do .env (ver .env.example).
// Projeto Supabase da Young: young-workspace (vvtympzatclvjaqucebr)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  // Aviso claro em dev caso o .env não esteja configurado.
  console.warn(
    '[Young Interno] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY não configuradas. ' +
      'Copie .env.example para .env e preencha as credenciais.',
  )
}

const YOUNG_DOMAIN = 'youngempreendimentos.com.br'
const host = typeof window !== 'undefined' ? window.location.hostname : ''
const cookieDomain =
  host === YOUNG_DOMAIN || host.endsWith('.' + YOUNG_DOMAIN) ? '.' + YOUNG_DOMAIN : undefined

// createBrowserClient exige URL/chave; sem .env usa placeholders só pra não quebrar o build.
export const supabase = createBrowserClient(
  supabaseUrl ?? 'https://vvtympzatclvjaqucebr.supabase.co',
  supabaseAnonKey ?? 'sem-chave',
  {
    cookieOptions: {
      domain: cookieDomain,
      path: '/',
      sameSite: 'lax',
      secure: typeof window !== 'undefined' ? window.location.protocol === 'https:' : true,
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
)

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
