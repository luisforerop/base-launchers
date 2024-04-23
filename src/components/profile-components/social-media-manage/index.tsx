import { SocialMediaTag } from '@/components/social-media'
import { useUserProvider } from '@/providers/user-provider'
import { IconPencil } from '@tabler/icons-react'
import { useState } from 'react'
import { SocialMediaModal } from './modal'

export const SocialMediaManage = () => {
  const {
    user: { social_media },
  } = useUserProvider()

  const [open, setOpen] = useState(false)

  return (
    <>
      <SocialMediaModal open={open} setOpen={setOpen} />
      <div className="flex">
        {social_media.map((platform) => (
          <SocialMediaTag {...platform} key={platform.id} />
        ))}
        <button onClick={() => setOpen(true)}>
          <IconPencil />
        </button>
      </div>
    </>
  )
}
