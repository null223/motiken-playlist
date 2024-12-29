import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Playlist {
  id: number
  title: string
  url: string
  thumbnail: string
  created_at: string
}

interface PlaylistCardProps {
  playlist: Playlist
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Link href={`/playlist/${playlist.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{playlist.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={playlist.thumbnail || '/placeholder.svg'}
            alt={playlist.title}
            className="w-full h-48 object-cover rounded-md"
          />
          <p className="text-sm text-gray-500 mt-4">
            作成日: {new Date(playlist.created_at).toLocaleDateString('ja-JP')}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

