import { NextResponse } from 'next/server'

export async function GET(req) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || ''
  const url = new URL(req.url)
  const charName = url.searchParams.get('charName')
  const reqBody = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `bearer ${process.env.API_MAIN_KEY}`,
    },
  }
  try {
    const response = await fetch(`${baseURL}/characters/${charName}/siblings`, reqBody)
    if (!response.ok) {
      throw new Error(`Fetch Error! status: ${response.status}`)
    }
    const data = await response.json()

    return NextResponse.json(data, { status: 200 })
  } catch (e) {
    console.log('Fetching error : ', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
