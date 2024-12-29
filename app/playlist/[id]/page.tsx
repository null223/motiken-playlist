import { getPlaylistById } from '@/lib/db'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notFound } from 'next/navigation'

interface PlaylistPageProps {
  params: {
    id: string
  }
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const playlist = await getPlaylistById(parseInt(params.id))

  if (!playlist) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>{playlist.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/videoseries?list=${playlist.youtube_id}`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

