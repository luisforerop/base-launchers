import { User } from '@/models'
import { UserProvider } from '@/providers/user-provider'
import { QUERIES, TABLES } from '@/utils/supabase/db-constants'
import { createServerClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Mi cuenta',
  description: 'Configura tu perfil',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const fulldata = await supabase
    .from(TABLES.USERS)
    .select(QUERIES.USERS)
    .eq('id', session?.user.id ?? '')

  const user = fulldata.data?.[0] as unknown as User

  if (session === null) {
    redirect('/')
  }

  return <UserProvider user={user}>{children}</UserProvider>
}
