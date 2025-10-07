import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const contentServiceUrl = process.env.NEXT_PUBLIC_URL_CS
    const origin = process.env.ORIGIN || 'http://localhost:3024'

    if (!contentServiceUrl) {
      return NextResponse.json(
        { error: 'Content Service URL not configured' },
        { status: 500 }
      )
    }

    const response = await fetch(`${contentServiceUrl}/courses/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Origin: origin,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 })
      }
      return NextResponse.json(
        { error: `Failed to fetch course: ${response.statusText}` },
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
    console.error('Error fetching course by slug:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
