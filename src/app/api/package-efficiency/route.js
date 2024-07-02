import { NextResponse } from 'next/server'

export async function POST(req) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || ''
  const reqParams = await req.json()
  const url = new URL(req.url)
  const update = url.searchParams.get('update') === 'true'

  const reqBody = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `bearer ${process.env.API_MAIN_KEY}`,
    },
    body: JSON.stringify(reqParams),
  }

  if (update) {
    reqBody.cache = 'no-cache'
  } else {
    reqBody.next = { revalidate: 6 }
  }

  try {
    const response = await fetch(`${baseURL}/markets/items`, reqBody)
    if (!response.ok) {
      throw new Error(`Fetch Error! status: ${response.status}`)
    }
    const data = await response.json()

    return NextResponse.json(data.Items, { status: 200 })
  } catch (e) {
    console.log('Fetching error : ', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
