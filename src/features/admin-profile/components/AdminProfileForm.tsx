'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createAdminProfile, updateAdminProfile } from '../api'
import type { AdminProfile } from '../types'

interface Props {
  profile: AdminProfile | null
  onCancel?: () => void
  onSuccess?: () => void
}

export function AdminProfileForm({ profile, onCancel, onSuccess }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [name, setName] = useState(profile?.name || '')
  const [bio, setBio] = useState(profile?.bio || '')
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '')
  const [twitterUrl, setTwitterUrl] = useState(profile?.twitter_url || '')
  const [githubUrl, setGithubUrl] = useState(profile?.github_url || '')
  const [websiteUrl, setWebsiteUrl] = useState(profile?.website_url || '')

  useEffect(() => {
    setName(profile?.name || '')
    setBio(profile?.bio || '')
    setAvatarUrl(profile?.avatar_url || '')
    setTwitterUrl(profile?.twitter_url || '')
    setGithubUrl(profile?.github_url || '')
    setWebsiteUrl(profile?.website_url || '')
    setError(null)
    setSuccess(false)
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('名前は必須です')
      return
    }

    setSaving(true)
    setError(null)
    setSuccess(false)

    const input = {
      name: name.trim(),
      bio: bio.trim() || null,
      avatar_url: avatarUrl.trim() || null,
      twitter_url: twitterUrl.trim() || null,
      github_url: githubUrl.trim() || null,
      website_url: websiteUrl.trim() || null,
    }

    try {
      if (profile) {
        await updateAdminProfile(profile.id, input)
      } else {
        await createAdminProfile(input)
      }
      setSuccess(true)
      router.refresh()

      if (!profile) {
        setName('')
        setBio('')
        setAvatarUrl('')
        setTwitterUrl('')
        setGithubUrl('')
        setWebsiteUrl('')
      }

      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました')
    } finally {
      setSaving(false)
    }
  }

  const isEditing = !!profile

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      {error && (
        <div className="mb-6 p-4 bg-red-900/50 text-red-300 rounded-lg border border-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-700">
          {isEditing ? '更新しました' : '登録しました'}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">
            名前 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="山田 太郎"
            className="w-full px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">
            自己紹介
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="自己紹介文を入力してください"
            className="w-full px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">
            アバター画像URL
          </label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="w-full px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500"
          />
          {avatarUrl && (
            <div className="mt-2">
              <img
                src={avatarUrl}
                alt="Avatar preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">
            Twitter URL
          </label>
          <input
            type="url"
            value={twitterUrl}
            onChange={(e) => setTwitterUrl(e.target.value)}
            placeholder="https://twitter.com/username"
            className="w-full px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">
            GitHub URL
          </label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/username"
            className="w-full px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">
            Website URL
          </label>
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500"
          />
        </div>

        <div className="flex gap-3">
          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-zinc-700 text-zinc-200 rounded-lg hover:bg-zinc-600"
            >
              キャンセル
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-lg disabled:opacity-50 hover:bg-orange-500"
          >
            {saving ? '保存中...' : isEditing ? '更新' : '登録'}
          </button>
        </div>
      </div>
    </form>
  )
}
