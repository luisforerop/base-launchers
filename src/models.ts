export interface User {
  id: string
  created_at: string
  name: string
  avatar_url: string
  social_media: Socialmedia[]
  description?: string
  website?: string
  username?: string
}

export interface Socialmedia {
  id: string
  url?: any
  user_id: string
  username: string
  created_at: string
  social_media: PossibleSocialMedia
}

export type PossibleSocialMedia =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'twitch'
  | 'x'
  | 'facebook'
  | 'threads'

export type PossibleSocialMediaType<Type = any> = {
  [key in PossibleSocialMedia]: Type
}
