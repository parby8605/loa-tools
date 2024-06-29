import { NextResponse } from 'next/server'

export async function POST(req) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || ''
  const reqParams = await req.json()
  try {
    const response = await fetch(`${baseURL}/markets/items`, {
      method: 'POST',
      // prettier-ignore
      headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${process.env.API_MAIN_KEY}`,
          },
      body: JSON.stringify(reqParams),
    })
    if (!response.ok) {
      throw new Error(`Fetch Error! status: ${response.status}`)
    }
    const data = await response.json()

    return NextResponse.json(data.Items, { status: 200 })
  } catch (e) {
    console.log('Fetching error : ', e)
    return NextResponse.json({ error: e.message })
  }
}
