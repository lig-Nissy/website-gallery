'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

interface OGPData {
  title: string | null
  description: string | null
  ogImage: string | null
  siteName: string | null
}

export default function AdminForm() {
  const [url, setUrl] = useState('')
  const [ogpData, setOgpData] = useState<OGPData | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')

  const fetchOGP = async () => {
    if (!url) return

    setLoading(true)
    setError(null)
    setOgpData(null)
    setSuccess(false)

    try {
      const res = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch OGP')
      }

      setOgpData(data)
      setTitle(data.title || '')
      setDescription(data.description || '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const saveSite = async () => {
    if (!url || !title) {
      setError('URL and title are required')
      return
    }

    setSaving(true)
    setError(null)

    try {
      const supabase = createClient()

      const { error: insertError } = await supabase.from('sites').insert({
        url,
        title,
        description: description || null,
        og_image_url: ogpData?.ogImage || null,
        category: category || null,
        tags: tags ? tags.split(',').map((t) => t.trim()) : null,
      })

      if (insertError) {
        throw insertError
      }

      setSuccess(true)
      // Reset form
      setUrl('')
      setOgpData(null)
      setTitle('')
      setDescription('')
      setCategory('')
      setTags('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Add New Site</h1>

        {/* URL Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Website URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-4 py-2 border rounded-lg bg-background"
            />
            <button
              onClick={fetchOGP}
              disabled={loading || !url}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Fetch OGP'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            Site saved successfully!
          </div>
        )}

        {/* OGP Preview */}
        {ogpData && (
          <div className="mb-6 p-4 border rounded-lg">
            <h2 className="text-lg font-medium mb-4">Preview</h2>
            {ogpData.ogImage && (
              <img
                src={ogpData.ogImage}
                alt="OGP Preview"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-sm text-gray-500">
              {ogpData.ogImage ? 'OGP image found' : 'No OGP image found'}
            </p>
          </div>
        )}

        {/* Form Fields */}
        {ogpData && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Portfolio, Blog, E-commerce"
                className="w-full px-4 py-2 border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., design, minimal, dark-mode"
                className="w-full px-4 py-2 border rounded-lg bg-background"
              />
            </div>

            <button
              onClick={saveSite}
              disabled={saving}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Site'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
