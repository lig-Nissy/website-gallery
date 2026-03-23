'use client'

import { useState, useRef } from 'react'
import { uploadAvatar } from '../api/storage'

interface Props {
  currentUrl: string
  onUpload: (url: string) => void
}

export function AvatarUpload({ currentUrl, onUpload }: Props) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentUrl)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // バリデーション
    if (!file.type.startsWith('image/')) {
      setError('画像ファイルを選択してください')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('ファイルサイズは2MB以下にしてください')
      return
    }

    setUploading(true)
    setError(null)

    try {
      // プレビュー表示
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)

      // アップロード
      const url = await uploadAvatar(file)
      onUpload(url)
      setPreview(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'アップロードに失敗しました')
      setPreview(currentUrl)
    } finally {
      setUploading(false)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        {preview ? (
          <img
            src={preview}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center">
            <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}

        <div>
          <label className="inline-block px-4 py-2 text-sm bg-zinc-700 text-zinc-200 rounded cursor-pointer hover:bg-zinc-600">
            {uploading ? 'アップロード中...' : '画像を選択'}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <p className="text-xs text-zinc-500 mt-1">2MB以下のJPG, PNG, GIF</p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 mt-2">{error}</p>
      )}
    </div>
  )
}
