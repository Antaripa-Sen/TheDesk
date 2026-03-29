'use client';

import { useEffect, useState } from 'react';

interface TickerProps {
  liveHeadlines?: string[];
}

export default function Ticker({ liveHeadlines = [] }: TickerProps) {
  const [tickerContent, setTickerContent] = useState<string>('');

  useEffect(() => {
    if (liveHeadlines.length > 0) {
      // Build a rich ticker string from live API data
      const joined = liveHeadlines
        .map((headline, i) => {
          const labels = ['BREAKING WIRE', 'LATEST', 'ALERT', 'UPDATE', 'FLASH', 'LIVE'];
          const label = labels[i % labels.length];
          return `⬛ ${label}: ${headline}   `;
        })
        .join('   ');
      setTickerContent(joined);
    } else {
      // fallback only when API hasn't loaded yet
      setTickerContent('⬛ CONNECTING TO LIVE NEWSFEED...   ⬛ Please wait while we retrieve headlines...   ');
    }
  }, [liveHeadlines]);

  return (
    <div className="ticker-bar">
      <div className="ticker-content" key={tickerContent}>
        {tickerContent}
      </div>
    </div>
  );
}
