import { createClient } from '@/lib/supabase'
import type { Site } from '../types'

export async function fetchOGP(url: string) {
  const res = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch OGP')
  }

  return data
}

export async function createSite(site: {
  url: string
  title: string
  description: string | null
  og_image_url: string | null
  category: string | null
  tags: string[] | null
}) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('sites')
    .insert(site)
    .select()
    .single()

  if (error) throw error

  return data as Site
}
