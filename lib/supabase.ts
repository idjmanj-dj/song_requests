import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://umkhwzwetwzlxszufoxn.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type SongRequest = {
  id: string
  song_title: string
  artist?: string
  song_link?: string
  requester_name?: string
  special_message?: string
  status: "pending" | "playing" | "completed" | "rejected"
  priority: number
  created_at: string
  updated_at: string
}
