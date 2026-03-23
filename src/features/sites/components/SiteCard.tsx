import type { Site } from '../types'

interface Props {
  site: Site
}

export function SiteCard({ site }: Props) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-gray-100 relative">
        {site.og_image_url ? (
          <img
            src={site.og_image_url}
            alt={site.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
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
