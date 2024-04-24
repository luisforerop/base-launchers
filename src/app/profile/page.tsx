'use client'

import { ProfileData, SocialMediaManage } from '@/components/profile-components'
import { useUserProvider } from '@/providers/user-provider'
import { IconJetpack, IconLink } from '@tabler/icons-react'

const Website = () => {
  const {
    user: { website },
  } = useUserProvider()

  return (
    <div className="flex items-center">
      <IconLink />
      <ProfileData
        initialValue={website ?? ''}
        property="website"
        placeholder="Agrega tu sitio web"
      />
    </div>
  )
}

const Description = () => {
  const {
    user: { description },
  } = useUserProvider()

  return (
    <ProfileData
      initialValue={description ?? ''}
      property="description"
      placeholder="Agrega una descripción a tu perfil"
      container="textarea"
    />
  )
}

export default function MyProfile() {
  const { user } = useUserProvider()
  const { avatar_url, name } = user

  if (!user) return null

  return (
    <div className="flex flex-col items-center justify-between w-[800px] mx-auto">
      <div className="flex gap-4 align-center mb-5">
        <img src={avatar_url} alt={name} />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">{name}</h1>
          <Website />
          <SocialMediaManage />
        </div>
      </div>
      <Description />
      <h2 className="text-xl mt-5 flex gap-2 items-center">
        Próximos lanzamientos <IconJetpack />
      </h2>
      <p className="p-5">Muy pronto</p>
    </div>
  )
}
