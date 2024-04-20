import { createServerClient } from '@/utils/supabase/server'
import React from 'react'
import AuthButton from './auth-button-client'

const AuthButtonServer = async () => {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <AuthButton session={session} />
}

export default AuthButtonServer
