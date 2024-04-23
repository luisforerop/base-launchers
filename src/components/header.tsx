import React from 'react'
import { AuthButtonServer } from './auth-button'
import { ImportantLinks } from './important-links'
import { BaseLaunchersIcon } from './base-launchers-icon'

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-10 px-[60px] border-b">
      <h1 className="flex gap-2 text-2xl items-center">
        <BaseLaunchersIcon />
        Base launchers
      </h1>
      <ImportantLinks />
      <AuthButtonServer />
    </header>
  )
}
