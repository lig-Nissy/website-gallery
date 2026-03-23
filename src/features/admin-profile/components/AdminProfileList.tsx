'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteAdminProfile } from '../api'
import type { AdminProfile } from '../types'

interface Props {
  profiles: AdminProfile[]
  onEdit: (profile: AdminProfile) => void
}

export function AdminProfileList({ profiles, onEdit }: Props) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('この管理者を削除しますか？')) return

    setDeleting(id)
    try {
      await deleteAdminProfile(id)
      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : '削除に失敗しました')
    } finally {
      setDeleting(null)
    }
  }

  if (profiles.length === 0) {
    return (
      <p className="text-zinc-500 py-4">管理者が登録されていません</p>
    )
  }

  return (
    <div className="space-y-3">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center gap-4 p-4 border border-zinc-700 rounded-lg bg-zinc-800"
        >
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-zinc-600 flex items-center justify-center flex-shrink-0">
              <span className="text-zinc-300 text-lg">
                {profile.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-medium text-zinc-100 truncate">{profile.name}</p>
            {profile.bio && (
              <p className="text-sm text-zinc-400 truncate">{profile.bio}</p>
            )}
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(profile)}
              className="px-3 py-1.5 text-sm bg-zinc-700 text-zinc-200 rounded hover:bg-zinc-600"
            >
              編集
            </button>
            <button
              onClick={() => handleDelete(profile.id)}
              disabled={deleting === profile.id}
              className="px-3 py-1.5 text-sm bg-red-600/20 text-red-400 rounded hover:bg-red-600/30 disabled:opacity-50"
            >
              {deleting === profile.id ? '削除中...' : '削除'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
