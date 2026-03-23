export interface AdminProfile {
  id: string
  name: string
  bio: string | null
  avatar_url: string | null
  twitter_url: string | null
  github_url: string | null
  website_url: string | null
  created_at: string
  updated_at: string
}

export interface AdminProfileInput {
  name: string
  bio: string | null
  avatar_url: string | null
  twitter_url: string | null
  github_url: string | null
  website_url: string | null
}
