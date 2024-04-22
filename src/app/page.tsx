import { UserCard } from '@/components/user-card'
import { tables } from '@/utils/supabase/db-constants'
import { createServerClient } from '@/utils/supabase/server'
import { User } from '../models'

export default async function Home() {
  const supabase = createServerClient()
  const fullData = await supabase
    .from(tables.users)
    .select(`*, ${tables.socialMedia}(*)`)

  const users = fullData.data as unknown as User[]

  return (
    <div className="flex flex-col items-center justify-between ">
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <UserCard {...user} key={user.id} />
        ))}
      </div>
    </div>
  )
}
