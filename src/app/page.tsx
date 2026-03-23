import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Site } from '@/features/sites/types'
import type { Category } from '@/features/categories/types'
import type { Tag } from '@/features/tags/types'
import { SiteCard, GalleryFilters } from '@/features/sites/components'

export const revalidate = 60

interface Props {
  searchParams: Promise<{
    category?: string
    tag?: string
    q?: string
  }>
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams
  const { category, tag, q } = params

  const supabase = await createServerSupabaseClient()

  // Fetch categories and tags for filters
  const [{ data: categories }, { data: tags }] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase.from('tags').select('*').order('name'),
  ])

  // Build query
  let query = supabase
    .from('sites')
    .select('*')
    .order('created_at', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  if (tag) {
    query = query.contains('tags', [tag])
  }

  if (q) {
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`)
  }

  const { data: sites } = await query

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-xl font-bold">Website Gallery</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <GalleryFilters
          categories={(categories as Category[]) || []}
          tags={(tags as Tag[]) || []}
          currentCategory={category}
          currentTag={tag}
          currentQuery={q}
        />

        {!sites || sites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">
              {category || tag || q
                ? 'No sites found matching your filters.'
                : 'No sites added yet.'}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{sites.length} sites</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(sites as Site[]).map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
