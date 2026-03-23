import { createServerSupabaseClient } from '@/lib/supabase-server'
import { TagsForm } from '@/features/tags/components'
import type { Tag } from '@/features/tags/types'

export default async function TagsPage() {
  const supabase = await createServerSupabaseClient()

  const { data: tags } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  return <TagsForm initialTags={(tags as Tag[]) || []} />
}
