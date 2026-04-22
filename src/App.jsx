import { useState } from 'react'
import { Toaster } from './components/Toast'
import { RolePicker } from './RolePicker'
import { LoginScreen } from './LoginScreen'
import { AppShell } from './AppShell'
import { ClienteShell } from './cliente/ClienteShell'

export default function App() {
  const [screen, setScreen] = useState('role') // role | login | app
  const [role, setRole] = useState(null)

  const selectRole = (r) => { setRole(r); setScreen('login') }
  const doLogin = () => setScreen('app')
  const goBack = () => { setScreen('role'); setRole(null) }

  return (
    <>
      {screen === 'role' && <RolePicker onSelect={selectRole} />}
      {screen === 'login' && role && <LoginScreen role={role} onLogin={doLogin} onBack={goBack} />}
      {screen === 'app' && role === 'cliente' && <ClienteShell onLogout={goBack} />}
      {screen === 'app' && role !== 'cliente' && <AppShell role={role} onLogout={goBack} />}
      <Toaster />
    </>
  )
}
