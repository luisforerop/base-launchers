'use client'
import { Socialmedia, User } from '@/models'
import { createBrowserClient } from '@/utils/supabase/client'
import { QUERIES, TABLES } from '@/utils/supabase/db-constants'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'

type UserProviderProps = {
  user: User
}

type SocialMediaParams = {
  social_media: string
  username: string
}

export interface UserProviderContextType extends UserProviderProps {
  updateUserData: (property: string, value: string) => Promise<void>
  updateSocialMedia: (
    newSocialMediaData: Partial<SocialMediaParams>,
    socialMediaId: string
  ) => Promise<void>
  createSocialMedia: (newSocialMediaData: SocialMediaParams) => Promise<void>
}

const UserProviderContext = createContext({} as UserProviderContextType)

export const useUserProvider = () => useContext(UserProviderContext)

export const UserProvider: FC<PropsWithChildren<UserProviderProps>> = ({
  children,
  user: userFromProps,
}) => {
  const { Provider } = UserProviderContext

  const [user, setUser] = useState<User>(userFromProps)

  const supabase = createBrowserClient()

  const updateUserData = async (property: string, value: string) => {
    const updatedData = await supabase
      .from(TABLES.USERS)
      .update({ [property]: value })
      .eq('id', user.id)
      .select(QUERIES.USERS)

    const updatedUser = (updatedData.data?.[0] as unknown as User) ?? user

    setUser(updatedUser)
  }

  const updateSocialMedia = async (
    newSocialMediaData: Partial<SocialMediaParams>,
    socialMediaId: string
  ) => {
    const updatedData = await supabase
      .from(TABLES.SOCIAL_MEDIA)
      .update(newSocialMediaData)
      .eq('id', socialMediaId)
      .select('*')

    const updatedSocialMedia = updatedData.data?.[0] as unknown as Socialmedia

    if (!updatedSocialMedia) return

    setUser((curr) => ({
      ...curr,
      social_media: curr.social_media.map((data) =>
        data.id !== updatedSocialMedia.id ? data : updatedSocialMedia
      ),
    }))
  }

  const createSocialMedia = async (newSocialMediaData: SocialMediaParams) => {
    const updatedData = await supabase
      .from(TABLES.SOCIAL_MEDIA)
      .insert({ ...newSocialMediaData, user_id: user.id })
      .select('*')

    const savedSocialMedia = updatedData.data?.[0] as unknown as Socialmedia

    if (!savedSocialMedia) return

    setUser((curr) => ({
      ...curr,
      social_media: curr.social_media.concat(savedSocialMedia),
    }))
  }

  const context: UserProviderContextType = {
    user,
    updateUserData,
    updateSocialMedia,
    createSocialMedia,
  }

  return <Provider value={context}>{children}</Provider>
}
