import { createServerSupabaseClient } from '@/lib/supabase-server'
import TagsForm from './tags-form'
import type { Tag } from '@/types/database'

export default async function TagsPage() {
  const supabase = await createServerSupabaseClient()

  const { data: tags } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  return <TagsForm initialTags={(tags as Tag[]) || []} />
}
