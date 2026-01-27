import { createAPIFileRoute } from '@tanstack/react-start/api'
import { put } from '@vercel/blob'

export const APIRoute = createAPIFileRoute('/api/upload')({
  POST: async ({ request }) => {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return new Response(JSON.stringify({ error: 'Filename is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const body = request.body
    if (!body) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const blob = await put(`event-photos/${filename}`, body, {
      access: 'public',
    })

    return new Response(JSON.stringify(blob), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  },
})
