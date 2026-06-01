import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, phone, message } = body

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'Mount Latin Dance <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'tu@email.com'],
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
