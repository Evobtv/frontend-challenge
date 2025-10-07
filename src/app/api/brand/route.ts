import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const brandId = process.env.NEXT_PUBLIC_BRAND || '3'
    const contentServiceUrl = process.env.NEXT_PUBLIC_URL_CS
    const origin = process.env.ORIGIN || 'http://localhost:3024'

    if (!contentServiceUrl) {
      return NextResponse.json(
        { error: 'Content Service URL not configured' },
        { status: 500 }
      )
    }

    const response = await fetch(`${contentServiceUrl}/brands/${brandId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Origin: origin,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch brand: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    console.error('Error fetching brand data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
