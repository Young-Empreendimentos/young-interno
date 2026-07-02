import { Loader2 } from 'lucide-react'
import { useAuth } from './context/AuthProvider'
import { isAllowedEmail } from './config/access'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { AccessDenied } from './pages/AccessDenied'

export default function App() {
  const { session, user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-young-orange" />
      </div>
    )
  }

  // Sem sessão → login
  if (!session) return <Login />

  // Logado, mas fora do domínio permitido → acesso restrito (validação no código)
  if (!isAllowedEmail(user?.email)) return <AccessDenied />

  return <Dashboard />
}
