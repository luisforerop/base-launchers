import AuthButtonServer from '@/components/auth-button-server'
import { tables } from '@/utils/supabase/db-constants'
import { createServerClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from(tables.users)
    .select(`*, ${tables.socialMedia}(*)`)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
      {JSON.stringify(data)}
    </main>
  )
}
