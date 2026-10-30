import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

const seedPlayer = { name: 'Aiko Tanaka', mobile: '•••• 4821', score: 9840 }

export async function GET() {
  const adminDb = getAdminDb()
  const snapshot = await adminDb.collection('leaderboard').get()

  if (snapshot.empty) {
    const created = await adminDb.collection('leaderboard').add(seedPlayer)
    return NextResponse.json([{ id: created.id, ...seedPlayer }])
  }

  const players = snapshot.docs
    .map((document) => {
      const data = document.data()
      return {
        id: document.id,
        name: typeof data.name === 'string' && data.name.trim() ? data.name.trim() : 'Anonymous Otaku',
        mobile: typeof data.mobile === 'string' ? data.mobile : '•••• ----',
        score: typeof data.score === 'number' ? data.score : Number(data.score) || 0,
      }
    })
    .sort((a, b) => b.score - a.score)

  return NextResponse.json(players)
}
