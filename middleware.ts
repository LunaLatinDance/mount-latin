// ⚠️ Este Map vive por instancia de Edge. En Vercel, el tráfico se reparte
// entre varias regiones, así que el rate limit es "best effort" por instancia.
// Para una protección global estricta, migrar a Upstash Redis (free tier: 10k reqs/día).
// Turnstile sigue siendo la defensa principal contra bots.

const WINDOW_MS = 10 * 60 * 1000 // 10 minutos
const MAX_REQUESTS = 5
const CLEANUP_INTERVAL = 60 * 1000 // 1 minuto

type Bucket = number[] // timestamps de requests
const buckets = new Map<string, Bucket>()

let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  const cutoff = now - WINDOW_MS
  for (const [ip, timestamps] of buckets.entries()) {
    const fresh = timestamps.filter((t) => t > cutoff)
    if (fresh.length === 0) {
      buckets.delete(ip)
    } else {
      buckets.set(ip, fresh)
    }
  }
}

function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) {
    const first = xff.split(',')[0]?.trim()
    if (first) return first
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

export const config = {
  matcher: '/api/contact',
}

export default function middleware(request: Request) {
  const url = new URL(request.url)

  // Solo aplicamos rate limit al endpoint de contacto
  if (!url.pathname.startsWith('/api/contact')) {
    return
  }

  cleanup()

  const ip = getClientIp(request)
  const now = Date.now()
  const cutoff = now - WINDOW_MS

  const timestamps = buckets.get(ip) ?? []
  const recent = timestamps.filter((t) => t > cutoff)

  if (recent.length >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((recent[0] + WINDOW_MS - now) / 1000)
    return new Response(
      JSON.stringify({ error: 'Too many requests. Try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
        },
      }
    )
  }

  recent.push(now)
  buckets.set(ip, recent)

  // Permitir que la request continúe a la API
  return
}
