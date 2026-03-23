import { NextRequest, NextResponse } from 'next/server'

interface OGPData {
  title: string | null
  description: string | null
  ogImage: string | null
  siteName: string | null
}

function extractMetaContent(html: string, property: string): string | null {
  // og:xxx 形式
  const ogMatch = html.match(
    new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i')
  )
  if (ogMatch) return ogMatch[1]

  // content が先に来るパターン
  const ogMatchReverse = html.match(
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, 'i')
  )
  if (ogMatchReverse) return ogMatchReverse[1]

  return null
}

function extractTitle(html: string): string | null {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return titleMatch ? titleMatch[1].trim() : null
}

function extractDescription(html: string): string | null {
  const descMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i
  )
  if (descMatch) return descMatch[1]

  const descMatchReverse = html.match(
    /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i
  )
  if (descMatchReverse) return descMatchReverse[1]

  return null
}

async function fetchOGP(url: string): Promise<OGPData> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; WebsiteGalleryBot/1.0)',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`)
  }

  const html = await response.text()

  const ogTitle = extractMetaContent(html, 'og:title')
  const ogDescription = extractMetaContent(html, 'og:description')
  const ogImage = extractMetaContent(html, 'og:image')
  const ogSiteName = extractMetaContent(html, 'og:site_name')

  return {
    title: ogTitle || extractTitle(html),
    description: ogDescription || extractDescription(html),
    ogImage: ogImage,
    siteName: ogSiteName,
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    new URL(url)
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  try {
    const ogpData = await fetchOGP(url)
    return NextResponse.json(ogpData)
  } catch (error) {
    console.error('OGP fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch OGP data' },
      { status: 500 }
    )
  }
}
