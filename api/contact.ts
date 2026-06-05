import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

async function verifyTurnstile(token: string, remoteIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY not configured')
    return false
  }

  const formData = new FormData()
  formData.append('secret', secret)
  formData.append('response', token)
  if (remoteIp) formData.append('remoteip', remoteIp)

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    body: formData,
  })

  const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] }

  if (!data.success) {
    console.error('Turnstile verification failed:', data['error-codes'])
  }

  return data.success === true
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, phone, message, turnstileToken, company } = body

  // Honeypot: si el campo oculto "company" tiene valor, es un bot.
  // Devolvemos 200 para no darle pistas.
  if (company) {
    return Response.json({ success: true })
  }

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!turnstileToken) {
    return Response.json({ error: 'Bot verification missing' }, { status: 400 })
  }

  const remoteIp = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || ''

  const isHuman = await verifyTurnstile(turnstileToken, remoteIp)
  if (!isHuman) {
    return Response.json({ error: 'Bot verification failed' }, { status: 403 })
  }

  try {
    await resend.emails.send({
      from: 'Mount Latin Dance <noreply@mount-latin-dance.com>',
      to: [process.env.CONTACT_EMAIL || 'mountlatindance@gmail.com'],
      subject: `New message from ${name}`,
      html: `
        <h2>New message from the website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
