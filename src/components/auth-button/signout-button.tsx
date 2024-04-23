'use client'

import { createBrowserClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export const SignoutButton = () => {
  const supabase = createBrowserClient()
  const { refresh } = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    refresh()
  }
  return <button onClick={handleSignOut}>Cerrar sesión</button>
}
