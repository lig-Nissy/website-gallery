import { createClient } from '@/lib/supabase'
import type { AdminProfile, AdminProfileInput } from '../types'

export async function getAdminProfiles(): Promise<AdminProfile[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('admin_profile')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error

  return (data as AdminProfile[]) || []
}

export async function getAdminProfile(id: string): Promise<AdminProfile | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('admin_profile')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    throw error
  }

  return data as AdminProfile
}

export async function createAdminProfile(input: AdminProfileInput): Promise<AdminProfile> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('admin_profile')
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data as AdminProfile
}

export async function updateAdminProfile(id: string, input: AdminProfileInput): Promise<AdminProfile> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('admin_profile')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as AdminProfile
}

export async function deleteAdminProfile(id: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase
    .from('admin_profile')
    .delete()
    .eq('id', id)

  if (error) throw error
}
