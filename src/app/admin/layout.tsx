import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import AdminNav from './admin-nav'
import LogoutButton from './logout-button'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <header className="border-b border-zinc-700">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">管理画面</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-6">
        <AdminNav />
        <main className="py-6">{children}</main>
      </div>
    </div>
  )
}
