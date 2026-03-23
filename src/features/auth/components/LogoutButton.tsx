'use client'

import { useRouter } from 'next/navigation'
import { signOut } from '../api'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-zinc-400 hover:text-zinc-200"
    >
      ログアウト
    </button>
  )
}
