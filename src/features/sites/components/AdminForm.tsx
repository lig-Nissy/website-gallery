'use client'

import { useState } from 'react'
import { fetchOGP, createSite } from '../api'
import type { OGPData } from '../types'
import type { Category } from '@/features/categories/types'
import type { Tag } from '@/features/tags/types'

interface Props {
  categories: Category[]
  tags: Tag[]
}

export function AdminForm({ categories, tags }: Props) {
  const [url, setUrl] = useState('')
  const [ogpData, setOgpData] = useState<OGPData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleFetchOGP = async () => {
    if (!url) return

    setLoading(true)
    setError(null)
    setOgpData(null)
    setSuccess(false)

    try {
      const data = await fetchOGP(url)
      setOgpData(data)
      setTitle(data.title || '')
      setDescription(data.description || '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName]
    )
  }

  const handleSave = async () => {
    if (!url || !title) {
      setError('URL and title are required')
      return
    }

    setSaving(true)
    setError(null)

    try {
      await createSite({
        url,
        title,
        description: description || null,
        og_image_url: ogpData?.ogImage || null,
        category: selectedCategory || null,
        tags: selectedTags.length > 0 ? selectedTags : null,
      })

      setSuccess(true)
      setUrl('')
      setOgpData(null)
      setTitle('')
      setDescription('')
      setSelectedCategory('')
      setSelectedTags([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="max-w-2xl">
        {/* URL Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-zinc-300">
            Website URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500"
            />
            <button
              onClick={handleFetchOGP}
              disabled={loading || !url}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50 hover:bg-orange-500"
            >
              {loading ? 'Loading...' : 'Fetch OGP'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 text-red-300 rounded-lg border border-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-700">
            Site saved successfully!
          </div>
        )}

        {/* OGP Preview */}
        {ogpData && (
          <div className="mb-6 p-4 border border-zinc-700 rounded-lg bg-zinc-800">
            <h2 className="text-lg font-medium mb-4 text-zinc-200">Preview</h2>
            {ogpData.ogImage && (
              <img
                src={ogpData.ogImage}
                alt="OGP Preview"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-sm text-zinc-400">
              {ogpData.ogImage ? 'OGP image found' : 'No OGP image found'}
            </p>
          </div>
        )}

        {/* Form Fields */}
        {ogpData && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">
                Category
              </label>
              {categories.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No categories available. Add some in the Categories tab.
                </p>
              ) : (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-zinc-100"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">
                Tags
              </label>
              {tags.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No tags available. Add some in the Tags tab.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.name)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        selectedTags.includes(tag.name)
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'bg-zinc-700 text-zinc-300 border-zinc-600 hover:border-orange-500'
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg disabled:opacity-50 hover:bg-green-500"
            >
              {saving ? 'Saving...' : 'Save Site'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
