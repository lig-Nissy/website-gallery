import { createServerSupabaseClient } from '@/lib/supabase-server'
import AdminForm from './admin-form'
import type { Category, Tag } from '@/types/database'

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()

  const [{ data: categories }, { data: tags }] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase.from('tags').select('*').order('name'),
  ])

  return (
    <AdminForm
      categories={(categories as Category[]) || []}
      tags={(tags as Tag[]) || []}
    />
  )
}
