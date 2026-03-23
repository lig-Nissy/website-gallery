import { createServerSupabaseClient } from '@/lib/supabase-server'
import { CategoriesForm } from '@/features/categories/components'
import type { Category } from '@/features/categories/types'

export default async function CategoriesPage() {
  const supabase = await createServerSupabaseClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return <CategoriesForm initialCategories={(categories as Category[]) || []} />
}
