import { createClient } from '@/lib/supabase'

export async function signIn(email: string, password: string) {
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
}
