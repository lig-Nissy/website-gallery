export interface Site {
  id: string
  url: string
  title: string
  description: string | null
  og_image_url: string | null
  thumbnail_path: string | null
  category: string | null
  tags: string[] | null
  created_at: string
  updated_at: string
  created_by: string | null
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
}
