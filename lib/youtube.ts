const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY!

export interface ItemProps {
  id: string
  title: string
  thumbnail: string
  url: string
}

export async function getPlaylistData(playlistId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${YOUTUBE_API_KEY}`
  , { cache: 'force-cache' })
  const data = await response.json()
  
  if (data.items && data.items.length > 0) {
    const playlist = data.items[0]
    return {
      id: playlist.id,
      title: playlist.snippet.title,
      thumbnail: playlist.snippet.thumbnails.medium.url,
      url: `https://www.youtube.com/playlist?list=${playlist.id}`
    }
  }
  
  return null
}

export async function getPlaylistItemsData(playlistId: string): Promise<ItemProps[]> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?${new URLSearchParams({
      part: "snippet",
      playlistId,
      maxResults: "15",
      key: YOUTUBE_API_KEY
    })}`
  , { cache: 'force-cache' })
  const data = await response.json()
  if (data.items && data.items.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.items.map((item: any) => {
      return {
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        url: `https://www.youtube.com/watch?${new URLSearchParams({
          v: item.snippet.resourceId.videoId,
          list: playlistId,
          index: item.snippet.position
        })}`
      }
    })
  }
  return []
}
