import { SocialMedia } from '@/components/social-media'
import { User } from '@/models'
import { QUERIES, TABLES } from '@/utils/supabase/db-constants'
import { createServerClient } from '@/utils/supabase/server'
import { IconJetpack, IconLink } from '@tabler/icons-react'

export default async function Page({
  params: { user_id },
}: {
  params: { user_id: string }
}) {
  const supabase = createServerClient()

  const fullData = await supabase
    .from(TABLES.USERS)
    .select(QUERIES.USERS)
    .eq('id', user_id)

  if (!fullData.data) return null

  const { avatar_url, name, social_media, description, website, username } =
    fullData.data[0] as unknown as User

  const parsedWebsite = website?.includes('http')
    ? website
    : `https://${website}`

  return (
    <div className="flex flex-col items-center justify-between w-[800px] mx-auto">
      <div className="flex flex-col gap-4 align-center mb-5 w-full">
        <div className="flex gap-4">
          <img
            className="w-[120px] h-[120px] rounded"
            src={avatar_url}
            alt={name}
          />
          <div className="flex flex-col gap-1 justify-center">
            <h1 className="text-3xl">{username ?? name}</h1>
            {username && <h2 className="text-lg font-semibold">{name}</h2>}
            <SocialMedia socialMedia={social_media} />
          </div>
        </div>
        {website && (
          <a
            className="flex items-center gap-2"
            href={parsedWebsite}
            target="_blank"
          >
            <IconLink /> {website}
          </a>
        )}
        {description && <p className="w-full text-start mb-3">{description}</p>}
      </div>

      <h2 className="text-xl mt-5 flex gap-2 items-center">
        Próximos lanzamientos <IconJetpack />
      </h2>
      <p className="p-5">Muy pronto</p>
    </div>
  )
}
