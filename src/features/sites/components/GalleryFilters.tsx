'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import type { Category } from '@/features/categories/types'
import type { Tag } from '@/features/tags/types'

interface Props {
  categories: Category[]
  tags: Tag[]
  currentCategory?: string
  currentTag?: string
  currentQuery?: string
}

export function GalleryFilters({
  categories,
  tags,
  currentCategory,
  currentTag,
  currentQuery,
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(currentQuery || '')

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }

      router.push(`/?${params.toString()}`)
    },
    [router, searchParams]
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilter('q', searchInput || null)
  }

  const clearFilters = () => {
    setSearchInput('')
    router.push('/')
  }

  const hasFilters = currentCategory || currentTag || currentQuery

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search sites..."
          className="flex-1 px-4 py-2 border rounded-lg bg-background max-w-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-foreground text-background rounded-lg"
        >
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Category:</span>
          <select
            value={currentCategory || ''}
            onChange={(e) => updateFilter('category', e.target.value || null)}
            className="px-3 py-1.5 border rounded-lg bg-background text-sm"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Tag:</span>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() =>
                  updateFilter('tag', currentTag === tag.name ? null : tag.name)
                }
                className={`px-2 py-1 rounded-full text-xs border transition-colors ${
                  currentTag === tag.name
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-blue-400'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
