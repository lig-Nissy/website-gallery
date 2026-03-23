'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Tag } from '@/types/database'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function TagsForm({ initialTags }: { initialTags: Tag[] }) {
  const [tags, setTags] = useState<Tag[]>(initialTags)
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleAdd = async () => {
    if (!name.trim()) return

    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const slug = generateSlug(name)

      const { data, error: insertError } = await supabase
        .from('tags')
        .insert({ name: name.trim(), slug })
        .select()
        .single()

      if (insertError) throw insertError

      setTags([...tags, data as Tag])
      setName('')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return

    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const slug = generateSlug(editName)

      const { error: updateError } = await supabase
        .from('tags')
        .update({ name: editName.trim(), slug })
        .eq('id', id)

      if (updateError) throw updateError

      setTags(
        tags.map((t) =>
          t.id === id ? { ...t, name: editName.trim(), slug } : t
        )
      )
      setEditingId(null)
      setEditName('')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this tag?')) return

    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { error: deleteError } = await supabase
        .from('tags')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setTags(tags.filter((t) => t.id !== id))
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (tag: Tag) => {
    setEditingId(tag.id)
    setEditName(tag.name)
  }

  return (
    <div>
      <div className="max-w-2xl">
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 text-red-300 rounded-lg border border-red-700">
            {error}
          </div>
        )}

        {/* Add Form */}
        <div className="mb-8 flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="新しいタグ名"
            className="flex-1 px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={loading || !name.trim()}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50 hover:bg-orange-500"
          >
            追加
          </button>
        </div>

        {/* List */}
        <div className="flex flex-wrap gap-2">
          {tags.length === 0 ? (
            <p className="text-zinc-500 text-center py-8 w-full">
              タグがありません
            </p>
          ) : (
            tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 px-3 py-2 border border-zinc-700 rounded-lg bg-zinc-800"
              >
                {editingId === tag.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-24 px-2 py-0.5 border border-zinc-600 rounded bg-zinc-700 text-zinc-100 text-sm"
                      onKeyDown={(e) =>
                        e.key === 'Enter' && handleUpdate(tag.id)
                      }
                    />
                    <button
                      onClick={() => handleUpdate(tag.id)}
                      disabled={loading}
                      className="text-green-400 text-sm hover:text-green-300"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-zinc-400 text-sm hover:text-zinc-300"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-sm text-zinc-100">{tag.name}</span>
                    <button
                      onClick={() => startEdit(tag)}
                      className="text-orange-400 text-xs hover:text-orange-300"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      disabled={loading}
                      className="text-red-400 text-xs hover:text-red-300"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
