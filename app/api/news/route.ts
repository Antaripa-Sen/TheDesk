import { NextResponse } from 'next/server';

export async function GET() {
  const dynamicNews = [
    {
      id: 1,
      title: "Global Supply Chains Restructure Amid Freight Disruptions",
      deck: "Logistics companies are moving towards regional hubs as unseasonable delays block major maritime routes across the Atlantic.",
      category: "WORLD",
      imageRef: "[ Freighter Image ]",
      byline: "GENEVA — Maritime Correspondent"
    },
    {
      id: 2,
      title: "Quarterly Earnings Exceed Estimates for Energy Sector",
      deck: "Despite regulatory pressure, major firms posted double-digit growth driven by winter demand anomalies.",
      category: "MARKETS",
      imageRef: "[ Oil Rig Image ]",
      byline: "NEW YORK — Desk Analysis"
    },
    {
      id: 3,
      title: "Emerging Tech Grants Announced for Quantum Computing",
      deck: "Government outlines a $500M budget allocation for advanced computing research initiatives.",
      category: "SCIENCE",
      imageRef: "[ Processor Image ]",
      byline: "SAN FRANCISCO — Tech Review"
    }
  ];

  return NextResponse.json({ success: true, articles: dynamicNews });
}
