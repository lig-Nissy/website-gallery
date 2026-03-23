import { createServerSupabaseClient } from '@/lib/supabase-server'
import { SiteList } from '@/features/sites/components'
import type { Site } from '@/features/sites/types'
import type { Category } from '@/features/categories/types'
import type { Tag } from '@/features/tags/types'

export default async function SitesPage() {
  const supabase = await createServerSupabaseClient()

  const [{ data: sites }, { data: categories }, { data: tags }] =
    await Promise.all([
      supabase.from('sites').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name'),
      supabase.from('tags').select('*').order('name'),
    ])

  return (
    <SiteList
      initialSites={(sites as Site[]) || []}
      categories={(categories as Category[]) || []}
      tags={(tags as Tag[]) || []}
    />
  )
}
