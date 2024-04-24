import { UserCard } from '@/components/user-card'
import { QUERIES, TABLES } from '@/utils/supabase/db-constants'
import { createServerClient } from '@/utils/supabase/server'
import { User } from '../models'

export default async function Home() {
  const supabase = createServerClient()
  const fullData = await supabase.from(TABLES.USERS).select(QUERIES.USERS)

  const users = fullData.data as unknown as User[]

  return (
    <div className="flex flex-col items-center justify-between max-w-[800px] m-auto">
      <div className="flex flex-col gap-6">
        {users.map((user) => (
          <UserCard {...user} key={user.id} />
        ))}
      </div>
    </div>
  )
}
