import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import AdminForm from './admin-form'
import LogoutButton from './logout-button'

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-2xl mx-auto px-8 py-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">{user.email}</span>
          <LogoutButton />
        </div>
      </header>
      <AdminForm />
    </div>
  )
}
