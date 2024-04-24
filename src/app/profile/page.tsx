'use client'

import { ProfileData, SocialMediaManage } from '@/components/profile-components'
import { useUserProvider } from '@/providers/user-provider'
import { IconJetpack, IconLink } from '@tabler/icons-react'

const Website = () => {
  const {
    user: { website },
  } = useUserProvider()

  return (
    <ProfileData
      initialValue={website ?? ''}
      property="website"
      placeholder="Agrega tu sitio web"
      description="El link de tu página web"
    />
  )
}

const Description = () => {
  const {
    user: { description },
  } = useUserProvider()

  return (
    <div>
      <h2 className="text-xl mb-2">Descripción</h2>
      <ProfileData
        initialValue={description ?? ''}
        property="description"
        placeholder="Agrega una descripción a tu perfil"
        container="textarea"
      />
    </div>
  )
}

const Username = () => {
  const {
    user: { username },
  } = useUserProvider()

  return (
    <ProfileData
      initialValue={username ?? ''}
      property="username"
      placeholder="Crea tu username"
      description="El alias que verán los otros usuarios"
    />
  )
}

export default function MyProfile() {
  const { user } = useUserProvider()
  const { avatar_url, name } = user

  if (!user) return null

  return (
    <div className="flex flex-col items-center justify-between w-[800px] mx-auto">
      <div className="flex gap-2 align-center mb-4 w-full">
        <img className="w-[150px] h-[150px]" src={avatar_url} alt={name} />
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl ml-2">{name}</h1>
          <Username />
          <Website />
        </div>
      </div>
      <SocialMediaManage />
      <Description />
      <h2 className="text-xl mt-5 flex gap-2 items-center">
        Próximos lanzamientos <IconJetpack />
      </h2>
      <p className="p-5">Muy pronto</p>
    </div>
  )
}
