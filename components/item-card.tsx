import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PlaylistItemCardProps {
  id: string
  title: string
  url: string
  thumbnail: string
}

export function PlaylistItemCard({ title, url, thumbnail }: PlaylistItemCardProps) {
  return (
    <Link href={url}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={thumbnail || '/placeholder.svg'}
            alt={title}
            className="w-full h-48 object-cover rounded-md"
          />
        </CardContent>
      </Card>
    </Link>
  )
}

