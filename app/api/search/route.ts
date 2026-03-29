import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const apiKey = process.env.NEWS_API_KEY;

  if (!query) return NextResponse.json({ success: true, results: [] });
  if (!apiKey) return NextResponse.json({ success: false, error: 'API key not configured' }, { status: 500 });

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=relevancy&language=en&apiKey=${apiKey}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); 

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`NewsAPI responded with status: ${res.status}`);
    }

    const data = await res.json();

    const results = data.articles
      .filter((a: any) => a.title && a.title !== '[Removed]')
      .slice(0, 12)
      .map((item: any, idx: number) => ({
        id: `s_${idx}`,
        title: item.title,
        deck: item.description || "Read more at the original source link.",
        category: "ARCHIVE SEARCH",
        imageRef: item.urlToImage || null,
        url: item.url,
        byline: item.source.name || "Wire"
      }));

    return NextResponse.json({ success: true, results });

  } catch (err: any) {
    console.error("NewsAPI Search Error:", err);
    return NextResponse.json({ success: false, error: err.message, results: [] }, { status: 500 });
  }
}
