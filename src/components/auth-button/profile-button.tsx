'use client'

import { User } from '@/models'
import { Session } from '@supabase/supabase-js'
import { FC, useState } from 'react'
import { SignoutButton } from './signout-button'
import { ChevronDown, ChevronUp, User as UserIcon } from '../icons'
import Link from 'next/link'

type ProfileButtonProps = {
  session: Session | null
  user: User | null
}

export const ProfileButton: FC<ProfileButtonProps> = ({ session, user }) => {
  const [open, setOpen] = useState(false)

  if (!session || !user) return null

  return (
    <div className="relative">
      <button className="flex gap-4" onClick={() => setOpen((curr) => !curr)}>
        <UserIcon />
        <span>Hola {user.name}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div
        className={`absolute top-[40px] w-full ${
          open ? 'h-[fit-content]' : 'h-[0]'
        } overflow-hidden`}
      >
        <div
          className={`p-3 bg-blue-200 w-full rounded flex flex-col gap-2 justify-start`}
        >
          <Link href="/profile">Mi perfil</Link>
          <SignoutButton />
        </div>
      </div>
    </div>
  )
}
