import { getPlaylistByYouTubeId } from '@/lib/db'
import { getPlaylistItemsData } from '@/lib/youtube'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlaylistItemCard } from '@/components/item-card'
import { notFound } from 'next/navigation'

interface PlaylistPageProps {
  params: {
    id: string
  }
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const playlist = await getPlaylistByYouTubeId(params.id)
  if (!playlist) {
    notFound()
  }
  const items = await getPlaylistItemsData(params.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>{playlist.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {items.map((item) => {
            return <PlaylistItemCard key={item.id} {...items} />
          })}
        </CardContent>
      </Card>
    </main>
  )
}

