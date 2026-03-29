'use client';

import { useState } from 'react';

const syntheses = {
  it_stocks: {
    q: "What does this mean for IT stocks?",
    ans: "IT stocks are heavily pressured. The Finance Minister unexpectedly revoked the long-standing SEZ tax holiday extension, hitting tier-2 IT margins by an estimated 1.5-2%. While digital infrastructure received a separate 400cr boost, the core export-driven services sector faces immediate headwinds. Expect a 4% downward correction in mid-cap tech over the next 48 hours."
  },
  economists: {
    q: "What do economists think?",
    ans: "Consensus among macro-economists is uniformly positive regarding the fiscal arithmetic. The aggressive 4.5% fiscal deficit target for FY26 demonstrates restraint and signals peak-rates may have arrived. 'The adherence to the glide path over populism is exceptional,' noted the Chief Economist at Standard Chartered, anticipating significant sovereign rating upgrades."
  },
  winners_losers: {
    q: "Who are the direct Sector Winners/Losers?",
    ans: "WINNERS: Capital Goods and Railways (historic ₹2.4 lakh crore allocation, driving multi-year order books). LOSERS: FMCG (rural welfare schemes saw zero growth, dampening rural volume recovery hopes) and Luxury Autos (CESS hiked by 3%)."
  },
  historical: {
    q: "How does this compare historically?",
    ans: "This is the most capital-expenditure-heavy budget since 2004 relative to GDP (now at 3.3%). Historically, budgets succeeding general elections lean heavily populist; however, this breaks precedent by restricting consumption subsidies and forcefully redirecting funds straight into sovereign infrastructure."
  }
};

export default function ArticleSynthesis() {
  const [activeAngle, setActiveAngle] = useState<keyof typeof syntheses>('it_stocks');

  return (
    <div style={{ padding: '0 2rem' }}>
      <p className="byline"><span className="dateline">MUMBAI, MAHARASHTRA —</span> Financial Desk</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
        <button 
          className={`btn ${activeAngle === 'it_stocks' ? 'active' : ''}`}
          onClick={() => setActiveAngle('it_stocks')}
          style={{ textAlign: 'left', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>Q: What does this mean for IT stocks?</span>
          <span style={{ fontSize: '1.2rem' }}>→</span>
        </button>
        <button 
          className={`btn ${activeAngle === 'economists' ? 'active' : ''}`}
          onClick={() => setActiveAngle('economists')}
          style={{ textAlign: 'left', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>Q: What do economists think?</span>
          <span style={{ fontSize: '1.2rem' }}>→</span>
        </button>
        <button 
          className={`btn ${activeAngle === 'winners_losers' ? 'active' : ''}`}
          onClick={() => setActiveAngle('winners_losers')}
          style={{ textAlign: 'left', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>Q: Who are the sector winners & losers?</span>
          <span style={{ fontSize: '1.2rem' }}>→</span>
        </button>
        <button 
          className={`btn ${activeAngle === 'historical' ? 'active' : ''}`}
          onClick={() => setActiveAngle('historical')}
          style={{ textAlign: 'left', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>Q: How does this compare historically?</span>
          <span style={{ fontSize: '1.2rem' }}>→</span>
        </button>
      </div>

      <div className="card" style={{ backgroundColor: 'var(--color-newsprint)', border: 'none', borderTop: '2px solid var(--color-press-black)', borderBottom: '2px solid var(--color-press-black)' }}>
        <p className="drop-cap" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          {syntheses[activeAngle].ans}
        </p>
      </div>
      
      <p style={{ marginTop: '1rem', fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-ink-wash)' }}>
        *AI-Synthesized directly from 22 distinct field reports filed over the last 6 hours, ensuring zero conceptual overlap.
      </p>
    </div>
  );
}
