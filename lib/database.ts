import { supabase, type SongRequest } from "./supabase"

export async function createSongRequest(request: {
  song_title: string
  artist?: string
  song_link?: string
  requester_name?: string
  special_message?: string
}) {
  const { data, error } = await supabase.from("song_requests").insert([request]).select().single()

  if (error) {
    console.error("Error creating song request:", error)
    throw error
  }

  return data as SongRequest
}

export async function getSongRequests() {
  const { data, error } = await supabase
    .from("song_requests")
    .select("*")
    .order("priority", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching song requests:", error)
    throw error
  }

  return data as SongRequest[]
}

export async function updateSongRequestStatus(id: string, status: SongRequest["status"]) {
  const { data, error } = await supabase
    .from("song_requests")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating song request:", error)
    throw error
  }

  return data as SongRequest
}

export async function updateSongRequestPriority(id: string, priority: number) {
  const { data, error } = await supabase
    .from("song_requests")
    .update({
      priority,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating song request priority:", error)
    throw error
  }

  return data as SongRequest
}

export async function deleteSongRequest(id: string) {
  const { error } = await supabase.from("song_requests").delete().eq("id", id)

  if (error) {
    console.error("Error deleting song request:", error)
    throw error
  }
}

export type { SongRequest }
