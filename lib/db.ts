import { sql } from '@vercel/postgres';

export async function createPlaylistsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS playlists (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        thumbnail VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Playlists table created successfully");
  } catch (error) {
    console.error("Error creating playlists table:", error);
  }
}

export async function getPlaylists() {
  try {
    const { rows } = await sql`SELECT * FROM playlists ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
}

export async function getPlaylistById(id: number) {
  try {
    const { rows } = await sql`SELECT * FROM playlists WHERE id = ${id}`;
    return rows[0];
  } catch (error) {
    console.error("Error fetching playlist by ID:", error);
    return null;
  }
}

export async function createPlaylist(title: string, url: string, thumbnail: string) {
  try {
    const { rows } = await sql`
    INSERT INTO playlists (title, url, thumbnail)
    VALUES (${title}, ${url}, ${thumbnail})
    RETURNING *
  `;
    return rows[0];
  } catch (error) {
    console.error("Error creating playlist:", error);
    return null;
  }
}

