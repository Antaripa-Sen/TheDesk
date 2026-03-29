'use client';

import { useState } from 'react';

const syntheses = {
  general: "The Finance Minister presented the Union Budget today, emphasizing infrastructure spending and fiscal consolidation. The budget aims to balance growth with deficit reduction. The market reaction was initially mixed, but stabilized towards the closing bell. Retail investors see opportunities in the revised tax slabs, while institutional players are closely monitoring the cap-ex announcements.",
  macro: "The Union Budget's macro-economic implications are profound. Fiscal deficit target has been aggressively pegged at 4.5% by FY26. Government borrowing is set lower than market estimates, which has already led to a softening of bond yields. Economists at major institutions have lauded the continued capital expenditure thrust, marking it at 3.3% of GDP, ensuring the growth multiplier remains intact.",
  sectors: "Sectoral Analysis reveals distinct winners and losers. WINNERS: Infrastructure (massive allocation bump), Railways, and Green Energy plays. LOSERS: Certain segments of FMCG due to unchanged rural allocations, and specific IT services which did not receive anticipated tax holidays for SEZs.",
  retail: "For the individual investor, the new tax regime has been sweetened with an increased rebate limit, leaving more disposable income. Market experts suggest focusing on SIPs in domestic-consumption-driven mutual funds. 'It's a straightforward budget; no negative surprises for the capital markets,' notes a leading wealth manager."
};

export default function ArticleSynthesis() {
  const [activeAngle, setActiveAngle] = useState<keyof typeof syntheses>('general');

  return (
    <div style={{ padding: '0 2rem' }}>
      <p className="byline"><span className="dateline">MUMBAI, MAHARASHTRA —</span> Financial Desk</p>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button 
          className={`btn ${activeAngle === 'general' ? 'active' : ''}`}
          onClick={() => setActiveAngle('general')}
        >
          Executive Summary
        </button>
        <button 
          className={`btn ${activeAngle === 'macro' ? 'active' : ''}`}
          onClick={() => setActiveAngle('macro')}
        >
          Macro Impact
        </button>
        <button 
          className={`btn ${activeAngle === 'sectors' ? 'active' : ''}`}
          onClick={() => setActiveAngle('sectors')}
        >
          Sector Analysis
        </button>
        <button 
          className={`btn ${activeAngle === 'retail' ? 'active' : ''}`}
          onClick={() => setActiveAngle('retail')}
        >
          Retail Investor View
        </button>
      </div>

      <div className="card" style={{ backgroundColor: 'var(--color-newsprint)', border: 'none', borderTop: '2px solid var(--color-press-black)', borderBottom: '2px solid var(--color-press-black)' }}>
        <p className="drop-cap" style={{ fontSize: '1.2rem' }}>
          {syntheses[activeAngle]}
        </p>
      </div>
      
      <p style={{ marginTop: '1rem', fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-ink-wash)' }}>
        *AI-Synthesized from 22 distinct field reports filed over the last 6 hours.
      </p>
    </div>
  );
}
