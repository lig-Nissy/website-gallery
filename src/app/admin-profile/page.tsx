import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { AdminProfile } from '@/features/admin-profile/types'

export const metadata = {
  title: '管理者について | Website Gallery',
  description: 'Website Galleryの管理者について',
}

function AdminProfileCard({ profile }: { profile: AdminProfile }) {
  return (
    <div className="p-6 border rounded-lg">
      <div className="flex items-start gap-6">
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 text-2xl">
              {profile.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
          {profile.bio && (
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {profile.bio}
            </p>
          )}
        </div>
      </div>

      {(profile.twitter_url || profile.github_url || profile.website_url) && (
        <div className="mt-4 pt-4 border-t flex flex-wrap gap-4">
          {profile.twitter_url && (
            <a
              href={profile.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Twitter</span>
            </a>
          )}
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
          )}
          {profile.website_url && (
            <a
              href={profile.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>Website</span>
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default async function AdminProfilePublicPage() {
  const supabase = await createServerSupabaseClient()

  const { data: profiles } = await supabase
    .from('admin_profile')
    .select('*')
    .order('created_at', { ascending: true })

  const adminProfiles = (profiles as AdminProfile[]) || []

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-xl font-bold hover:opacity-70">
            Website Gallery
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">管理者について</h1>

        {adminProfiles.length > 0 ? (
          <div className="space-y-6">
            {adminProfiles.map((profile) => (
              <AdminProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">管理者情報は登録されていません。</p>
        )}
      </main>
    </div>
  )
}
