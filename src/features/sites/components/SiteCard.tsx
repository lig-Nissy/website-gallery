'use client'

import { useState } from 'react'
import type { Site } from '../types'

interface Props {
  site: Site
}

function NoImagePlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
      <svg
        className="w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="mt-2 text-sm text-gray-400">No Image</span>
    </div>
  )
}

export function SiteCard({ site }: Props) {
  const [imageError, setImageError] = useState(false)

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-gray-100 relative">
        {site.og_image_url && !imageError ? (
          <img
            src={site.og_image_url}
            alt={site.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <NoImagePlaceholder />
        )}
      </div>
      <div className="p-4">
        <h2 className="font-medium group-hover:text-blue-600 transition-colors">
          {site.title}
        </h2>
        {site.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {site.description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-1">
          {site.category && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
              {site.category}
            </span>
          )}
          {site.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
