import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) return NextResponse.json({ success: true, results: [] });

  // Simulated search results mimicking an elastic DB search
  const mockedResults = [
    {
      id: 's1',
      title: `Analysis: The Impact of "${query}" on Global Markets`,
      deck: `Our editorial board takes a deep dive into what the recent trends concerning ${query} mean for the next financial quarter.`,
      category: "ARCHIVE"
    },
    {
      id: 's2',
      title: `History of ${query} in Modern Economics`,
      deck: `Tracing the origins of how ${query} became a focal point in global discourse.`,
      category: "RETROSPECTIVE"
    }
  ];

  return NextResponse.json({ success: true, results: mockedResults });
}
