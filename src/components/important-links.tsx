import Link from 'next/link'
import React from 'react'

const links = [
  { href: '/', name: 'Home' },
  { href: '/blog', name: 'Blog' },
]

export const ImportantLinks = () => {
  return (
    <div className="flex gap-5">
      {links.map(({ href, name }) => (
        <Link key={href} href={href}>
          {name}
        </Link>
      ))}
    </div>
  )
}
