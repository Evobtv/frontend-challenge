import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const search = searchParams.get('search') || ''

    const contentServiceUrl = process.env.NEXT_PUBLIC_URL_CS
    const origin = process.env.ORIGIN || 'http://localhost:3024'

    if (!contentServiceUrl) {
      return NextResponse.json(
        { error: 'Content Service URL not configured' },
        { status: 500 }
      )
    }

    const url = new URL(`${contentServiceUrl}/courses`)
    url.searchParams.append('page', page)
    url.searchParams.append('limit', limit)

    if (search) {
      url.searchParams.append('q[title_or_teachers_name_i_cont_any]', search)
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Origin: origin,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch courses: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
