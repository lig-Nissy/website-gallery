'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/admin', label: 'サイト追加' },
  { href: '/admin/categories', label: 'カテゴリ管理' },
  { href: '/admin/tags', label: 'タグ管理' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-1 border-b border-zinc-700 mt-4">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
