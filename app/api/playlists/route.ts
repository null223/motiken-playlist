import { NextResponse } from 'next/server'
import { createPlaylist } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { title, url, thumbnail } = body

  const playlist = await createPlaylist(title, url, thumbnail)

  return NextResponse.json(playlist)
}

