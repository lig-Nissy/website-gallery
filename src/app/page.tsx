import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Site } from '@/types/database'

export const revalidate = 60

export default async function Home() {
  const supabase = await createServerSupabaseClient()
  const { data: sites } = await supabase
    .from('sites')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Website Gallery</h1>
          <Link
            href="/admin"
            className="px-4 py-2 bg-foreground text-background rounded-lg text-sm"
          >
            Add Site
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!sites || sites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No sites added yet.</p>
            <Link href="/admin" className="text-blue-600 hover:underline">
              Add your first site
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(sites as Site[]).map((site) => (
              <a
                key={site.id}
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
                  {site.category && (
                    <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 rounded">
                      {site.category}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
