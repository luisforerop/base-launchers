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

      <div className="w-full mb-4">
        <h2 className="text-xl mb-2">Tus redes sociales</h2>
        <div className="flex w-full mb-4 items-center gap-2">
          {social_media.map((platform) => (
            <SocialMediaTag {...platform} key={platform.id} />
          ))}
          <button className="flex  items-center" onClick={() => setOpen(true)}>
            <IconPencil /> Editar
          </button>
        </div>
      </div>
    </>
  )
}
