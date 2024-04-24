import React from 'react'
import { AuthButtonServer } from './auth-button'
import { ImportantLinks } from './important-links'
import { BaseLaunchersIcon } from './base-launchers-icon'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-10 px-[60px] border-b">
      <h1>
        <Link className="flex gap-2 text-2xl items-center" href="/">
          <BaseLaunchersIcon />
          Base launchers
        </Link>
      </h1>
      <ImportantLinks />
      <AuthButtonServer />
    </header>
  )
}
