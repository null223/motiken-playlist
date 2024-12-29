import { supabase } from './supabase'
import { getPlaylistData } from './youtube'

export async function getPlaylists() {
  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error("Error fetching playlists:", error)
    return []
  }

  const playlistsData = await Promise.all(
    data.map(async (playlist) => {
      const youtubeData = await getPlaylistData(playlist.youtube_id)
      return { ...playlist, ...youtubeData }
    })
  )

  return playlistsData
}

export async function getPlaylistByYouTubeId(youtubeId: string) {
  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('youtube_id', youtubeId)
    .single()

  if (error) {
    console.error("Error fetching playlist by ID:", error)
    return null
  }

  const youtubeData = await getPlaylistData(data.youtube_id)
  return { ...data, ...youtubeData }
}

export async function createPlaylist(youtubeId: string) {
  const { data, error } = await supabase
    .from('playlists')
    .insert({ youtube_id: youtubeId })
    .select()

  if (error) {
    console.error("Error creating playlist:", error)
    return null
  }

  const youtubeData = await getPlaylistData(youtubeId)
  return { ...data[0], ...youtubeData }
}

