// TODO: si detectamos que no hay data del username, hacemos que se vaya al profile para que lo agregue

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
  console.log({ user_id })

  const fullData = await supabase
    .from(TABLES.USERS)
    .select(QUERIES.USERS)
    .eq('id', user_id)

  if (!fullData.data) return null

  const { avatar_url, name, social_media, description, website } = fullData
    .data[0] as unknown as User

  const parsedWebsite = website?.includes('http')
    ? website
    : `https://${website}`

  return (
    <div className="flex flex-col items-center justify-between w-[800px] mx-auto">
      <div className="flex gap-4 align-center mb-5 w-full">
        <img src={avatar_url} alt={name} />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">{name}</h1>
          {website && (
            <a
              className="flex items-center gap-2"
              href={parsedWebsite}
              target="_blank"
            >
              <IconLink /> {website}
            </a>
          )}
          <SocialMedia socialMedia={social_media} />
        </div>
      </div>
      {description && (
        <p className="w-full text-start py-1 px-2">{description}</p>
      )}
      <h2 className="text-xl mt-5 flex gap-2 items-center">
        Próximos lanzamientos <IconJetpack />
      </h2>
      <p className="p-5">Muy pronto</p>
    </div>
  )
}
