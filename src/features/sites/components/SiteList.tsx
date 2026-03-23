'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteSite, updateSite } from '../api'
import { AdminPagination } from './AdminPagination'
import type { Site } from '../types'
import type { Category } from '@/features/categories/types'
import type { Tag } from '@/features/tags/types'

const PER_PAGE = 20

interface Props {
  initialSites: Site[]
  categories: Category[]
  tags: Tag[]
}

export function SiteList({ initialSites, categories, tags }: Props) {
  const [sites, setSites] = useState<Site[]>(initialSites)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Site>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const totalPages = Math.ceil(sites.length / PER_PAGE)
  const paginatedSites = sites.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  )

  const startEdit = (site: Site) => {
    setEditingId(site.id)
    setEditData({
      title: site.title,
      description: site.description,
      category: site.category,
      tags: site.tags,
    })
    setError(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditData({})
    setError(null)
  }

  const handleUpdate = async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const updated = await updateSite(id, editData)
      setSites(sites.map((s) => (s.id === id ? updated : s)))
      setEditingId(null)
      setEditData({})
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`「${title}」を削除しますか？`)) return

    setLoading(true)
    setError(null)

    try {
      await deleteSite(id)
      const newSites = sites.filter((s) => s.id !== id)
      setSites(newSites)

      // 現在のページが空になった場合、前のページに戻る
      const newTotalPages = Math.ceil(newSites.length / PER_PAGE)
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setLoading(false)
    }
  }

  const toggleTag = (tagName: string) => {
    const currentTags = editData.tags || []
    setEditData({
      ...editData,
      tags: currentTags.includes(tagName)
        ? currentTags.filter((t) => t !== tagName)
        : [...currentTags, tagName],
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setEditingId(null)
    setEditData({})
  }

  return (
    <div>
      {error && (
        <div className="mb-6 p-4 bg-red-900/50 text-red-300 rounded-lg border border-red-700">
          {error}
        </div>
      )}

      <p className="text-sm text-zinc-400 mb-4">{sites.length} 件</p>

      <div className="space-y-3">
        {paginatedSites.length === 0 ? (
          <p className="text-zinc-500 text-center py-8">
            登録されているサイトがありません
          </p>
        ) : (
          paginatedSites.map((site) => (
            <div
              key={site.id}
              className="border border-zinc-700 rounded-lg bg-zinc-800 overflow-hidden"
            >
              {editingId === site.id ? (
                // 編集モード
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">
                      タイトル
                    </label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-zinc-600 rounded bg-zinc-700 text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">
                      説明
                    </label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) =>
                        setEditData({ ...editData, description: e.target.value })
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-zinc-600 rounded bg-zinc-700 text-zinc-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">
                      カテゴリ
                    </label>
                    <select
                      value={editData.category || ''}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          category: e.target.value || null,
                        })
                      }
                      className="w-full px-3 py-2 border border-zinc-600 rounded bg-zinc-700 text-zinc-100"
                    >
                      <option value="">なし</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">
                      タグ
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleTag(tag.name)}
                          className={`px-2 py-1 rounded text-xs border transition-colors ${
                            (editData.tags || []).includes(tag.name)
                              ? 'bg-orange-600 text-white border-orange-600'
                              : 'bg-zinc-700 text-zinc-300 border-zinc-600'
                          }`}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleUpdate(site.id)}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-500 disabled:opacity-50"
                    >
                      保存
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-zinc-600 text-zinc-200 rounded text-sm hover:bg-zinc-500"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                // 表示モード
                <div className="flex items-start gap-4 p-4">
                  {site.og_image_url && (
                    <img
                      src={site.og_image_url}
                      alt={site.title}
                      className="w-24 h-16 object-cover rounded flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-zinc-100 truncate">
                      {site.title}
                    </h3>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-400 hover:text-orange-400 truncate block"
                    >
                      {site.url}
                    </a>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {site.category && (
                        <span className="text-xs px-2 py-0.5 bg-zinc-700 text-zinc-300 rounded">
                          {site.category}
                        </span>
                      )}
                      {site.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-zinc-600 text-zinc-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(site)}
                      className="px-3 py-1 text-orange-400 hover:text-orange-300 text-sm"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(site.id, site.title)}
                      disabled={loading}
                      className="px-3 py-1 text-red-400 hover:text-red-300 text-sm"
                    >
                      削除
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
