import { createServerSupabaseClient } from '@/lib/supabase-server'
import CategoriesForm from './categories-form'
import type { Category } from '@/types/database'

export default async function CategoriesPage() {
  const supabase = await createServerSupabaseClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return <CategoriesForm initialCategories={(categories as Category[]) || []} />
}
