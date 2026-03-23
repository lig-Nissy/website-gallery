import { createClient } from '@/lib/supabase'
import type { Tag } from '../types'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function createTag(name: string) {
  const supabase = createClient()
  const slug = generateSlug(name)

  const { data, error } = await supabase
    .from('tags')
    .insert({ name: name.trim(), slug })
    .select()
    .single()

  if (error) throw error

  return data as Tag
}

export async function updateTag(id: string, name: string) {
  const supabase = createClient()
  const slug = generateSlug(name)

  const { error } = await supabase
    .from('tags')
    .update({ name: name.trim(), slug })
    .eq('id', id)

  if (error) throw error
}

export async function deleteTag(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from('tags').delete().eq('id', id)

  if (error) throw error
}
