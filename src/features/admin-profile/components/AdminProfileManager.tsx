'use client'

import { useState } from 'react'
import { AdminProfileForm } from './AdminProfileForm'
import { AdminProfileList } from './AdminProfileList'
import type { AdminProfile } from '../types'

interface Props {
  profiles: AdminProfile[]
}

export function AdminProfileManager({ profiles }: Props) {
  const [editingProfile, setEditingProfile] = useState<AdminProfile | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleEdit = (profile: AdminProfile) => {
    setEditingProfile(profile)
    setShowForm(true)
  }

  const handleCancel = () => {
    setEditingProfile(null)
    setShowForm(false)
  }

  const handleSuccess = () => {
    setEditingProfile(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-medium text-zinc-200">管理者一覧</h3>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-500"
            >
              新規登録
            </button>
          )}
        </div>
        <AdminProfileList profiles={profiles} onEdit={handleEdit} />
      </div>

      {showForm && (
        <div className="border-t border-zinc-700 pt-8">
          <h3 className="text-md font-medium text-zinc-200 mb-4">
            {editingProfile ? '管理者を編集' : '管理者を登録'}
          </h3>
          <AdminProfileForm
            profile={editingProfile}
            onCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        </div>
      )}
    </div>
  )
}
