'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCategory, updateCategory, deleteCategory } from '../api'
import type { Category } from '../types'

interface Props {
  initialCategories: Category[]
}

export function CategoriesForm({ initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
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
      const data = await createCategory(name)
      setCategories([...categories, data])
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
      await updateCategory(id, editName)
      setCategories(
        categories.map((c) =>
          c.id === id
            ? {
                ...c,
                name: editName.trim(),
                slug: editName
                  .toLowerCase()
                  .replace(
                    /[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g,
                    '-'
                  )
                  .replace(/^-+|-+$/g, ''),
              }
            : c
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
    if (!confirm('Delete this category?')) return

    setLoading(true)
    setError(null)

    try {
      await deleteCategory(id)
      setCategories(categories.filter((c) => c.id !== id))
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (category: Category) => {
    setEditingId(category.id)
    setEditName(category.name)
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
            placeholder="新しいカテゴリ名"
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
        <div className="space-y-2">
          {categories.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">
              カテゴリがありません
            </p>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-2 p-3 border border-zinc-700 rounded-lg bg-zinc-800"
              >
                {editingId === category.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 px-3 py-1 border border-zinc-600 rounded bg-zinc-700 text-zinc-100"
                      onKeyDown={(e) =>
                        e.key === 'Enter' && handleUpdate(category.id)
                      }
                    />
                    <button
                      onClick={() => handleUpdate(category.id)}
                      disabled={loading}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-500"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-zinc-600 text-zinc-200 rounded text-sm hover:bg-zinc-500"
                    >
                      キャンセル
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-zinc-100">{category.name}</span>
                    <span className="text-sm text-zinc-500">{category.slug}</span>
                    <button
                      onClick={() => startEdit(category)}
                      className="px-3 py-1 text-orange-400 hover:text-orange-300 text-sm"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      disabled={loading}
                      className="px-3 py-1 text-red-400 hover:text-red-300 text-sm"
                    >
                      削除
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
