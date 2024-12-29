import { getPlaylists } from '@/lib/db'
import { PlaylistCard } from '@/components/playlist-card'
import { Header } from '@/components/header'

export default async function Home() {
  const playlists = await getPlaylists()

  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      {playlists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-12">プレイリストが見つかりませんでした。</p>
      )}
    </main>
  )
}

