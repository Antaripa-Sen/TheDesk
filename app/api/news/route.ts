import { NextResponse } from 'next/server';

const categoryMap: Record<string, string> = {
  'world': 'general',
  'politics': 'general',
  'economy': 'business',
  'markets': 'business',
  'culture': 'entertainment',
  'science': 'science',
  'general': 'general'
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawCategory = searchParams.get('category') || 'general';
  
  // Map our UI category to a strict NewsAPI supported category
  const mappedCategory = categoryMap[rawCategory.toLowerCase()] || 'general';
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ success: false, error: 'API key not configured' }, { status: 500 });
  }

  try {
    let url = `https://newsapi.org/v2/top-headlines?language=en&category=${mappedCategory}&apiKey=${apiKey}`;
    
    // If it's specific like politics or world, we might want to use "everything" search instead of general top-headlines
    // But top-headlines is safer for Free tier and 'live' feel.
    if (rawCategory.toLowerCase() === 'world') {
       url = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${apiKey}`; // global top headlines
    } else if (rawCategory.toLowerCase() === 'politics') {
       url = `https://newsapi.org/v2/everything?q=politics&sortBy=publishedAt&language=en&apiKey=${apiKey}`; 
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); 

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`NewsAPI responded with status: ${res.status}`);
    }

    const data = await res.json();

    const articles = (data.articles || [])
      .filter((a: any) => a.title && a.title !== '[Removed]')
      .slice(0, 10)
      .map((item: any, idx: number) => ({
        id: idx,
        title: item.title,
        deck: item.description || "Click the headline to read the full report from this wire.",
        category: rawCategory.toUpperCase(),
        imageRef: item.urlToImage || null,
        byline: item.source.name ? `${item.source.name} Wire` : 'External Syndication',
        url: item.url,
        publishedAt: item.publishedAt
      }));

    return NextResponse.json({ success: true, articles });
    
  } catch (err: any) {
    console.error("NewsAPI Fetch Error:", err);
    return NextResponse.json({ success: false, error: err.message, articles: [] }, { status: 500 });
  }
}
