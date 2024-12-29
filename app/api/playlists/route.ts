import { NextResponse } from 'next/server'
import { createPlaylist } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { youtubeId } = body

  const playlist = await createPlaylist(youtubeId)

  return NextResponse.json(playlist)
}

