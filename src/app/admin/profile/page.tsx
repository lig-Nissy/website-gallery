import { createServerSupabaseClient } from '@/lib/supabase-server'
import { AdminProfileManager } from '@/features/admin-profile/components'
import type { AdminProfile } from '@/features/admin-profile/types'

export default async function AdminProfilePage() {
  const supabase = await createServerSupabaseClient()

  const { data: profiles } = await supabase
    .from('admin_profile')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6 text-zinc-200">管理者設定</h2>
      <AdminProfileManager profiles={(profiles as AdminProfile[]) || []} />
    </div>
  )
}
