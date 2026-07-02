import { Loader2 } from 'lucide-react'
import { useAuth } from './context/AuthProvider'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

export default function App() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-young-orange" />
      </div>
    )
  }

  return session ? <Dashboard /> : <Login />
}
