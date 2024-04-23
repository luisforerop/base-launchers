import { createServerClient } from '@/utils/supabase/server'
import React from 'react'
import AuthButton from './auth-button-client'
import { TABLES } from '@/utils/supabase/db-constants'

export const AuthButtonServer = async () => {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const fulldata = await supabase
    .from(TABLES.USERS)
    .select('*')
    .eq('id', session?.user.id ?? '')

  const user = fulldata.data?.[0]

  return <AuthButton session={session} user={user} />
}
