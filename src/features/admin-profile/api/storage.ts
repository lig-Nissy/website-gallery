import { createClient } from '@/lib/supabase'

const BUCKET_NAME = 'avatars'

export async function uploadAvatar(file: File): Promise<string> {
  const supabase = createClient()

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `admin/${fileName}`

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  return data.publicUrl
}

export async function deleteAvatar(url: string): Promise<void> {
  const supabase = createClient()

  // URLからファイルパスを抽出
  const match = url.match(/avatars\/(.+)$/)
  if (!match) return

  const filePath = match[1]

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath])

  if (error) throw error
}
