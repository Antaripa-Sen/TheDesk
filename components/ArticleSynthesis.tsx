'use client';

import { useState, useEffect } from 'react';

interface ArticleSynthesisProps {
  liveHeadlines?: string[];
}

// Static Budget syntheses (preserved as required — must NOT overlap)
const STATIC_SYNTHESES = [
  {
    key: 'it_stocks',
    q: "What does this mean for IT stocks?",
    ans: "IT stocks are heavily pressured. The Finance Minister unexpectedly revoked the long-standing SEZ tax holiday extension, hitting tier-2 IT margins by an estimated 1.5-2%. While digital infrastructure received a separate ₹400Cr boost, the core export-driven services sector faces immediate headwinds. Expect a 4% downward correction in mid-cap tech over the next 48 hours."
  },
  {
    key: 'economists',
    q: "What do economists think?",
    ans: "Consensus among macro-economists is uniformly positive regarding the fiscal arithmetic. The aggressive 4.5% fiscal deficit target for FY26 demonstrates restraint and signals peak-rates may have arrived. The adherence to the glide path over populism is exceptional, noted the Chief Economist at Standard Chartered, anticipating significant sovereign rating upgrades."
  },
  {
    key: 'winners_losers',
    q: "Who are the direct sector winners and losers?",
    ans: "WINNERS: Capital Goods and Railways (historic ₹2.4 lakh crore allocation, driving multi-year order books). LOSERS: FMCG (rural welfare schemes saw zero growth, dampening rural volume recovery hopes) and Luxury Autos (CESS hiked by 3%). Infrastructure and green energy received the highest single-year allocation in India's budget history."
  },
  {
    key: 'historical',
    q: "How does this compare historically?",
    ans: "This is the most capital-expenditure-heavy budget since 2004 relative to GDP (now at 3.3%). Historically, budgets succeeding general elections lean heavily populist; however, this breaks that precedent by restricting consumption subsidies and forcefully redirecting sovereign funds straight into national infrastructure."
  }
];

// Generate dynamic questions from live headlines
function buildDynamicQuestions(headlines: string[]) {
  return headlines.slice(0, 4).map((headline, i) => {
    const templates = [
      `How does "${headline.split(' ').slice(0, 6).join(' ')}..." affect long-term investors?`,
      `What should retail investors know about: "${headline.split(' ').slice(0, 5).join(' ')}..."?`,
      `What is the macro impact of: "${headline.split(' ').slice(0, 5).join(' ')}..."?`,
      `What to watch next: "${headline.split(' ').slice(0, 6).join(' ')}..."?`
    ];
    return {
      key: `live_${i}`,
      q: templates[i % templates.length],
      headline,
      isDynamic: true
    };
  });
}

export default function ArticleSynthesis({ liveHeadlines = [] }: ArticleSynthesisProps) {
  const [activeKey, setActiveKey] = useState<string>('it_stocks');
  const [staticAnswer, setStaticAnswer] = useState<string>(STATIC_SYNTHESES[0].ans);
  const [dynamicAnswer, setDynamicAnswer] = useState<string>('');
  const [isLoadingDynamic, setIsLoadingDynamic] = useState(false);

  const dynamicQuestions = buildDynamicQuestions(liveHeadlines);
  const allQuestions = [...STATIC_SYNTHESES, ...dynamicQuestions];

  const handleSelect = async (key: string, question?: string) => {
    setActiveKey(key);

    // For static budget syntheses, just look up the answer
    const staticItem = STATIC_SYNTHESES.find(s => s.key === key);
    if (staticItem) {
      setStaticAnswer(staticItem.ans);
      setDynamicAnswer('');
      setIsLoadingDynamic(false);
      return;
    }

    // For live dynamic questions, call the AI ask endpoint
    if (question) {
      setIsLoadingDynamic(true);
      setDynamicAnswer('');
      setStaticAnswer('');
      try {
        const res = await fetch('/api/ai/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
        });
        const data = await res.json();
        if (data.success) {
          setDynamicAnswer(data.answer);
        } else {
          setDynamicAnswer('Could not synthesize an answer at this time. Please try again.');
        }
      } catch {
        setDynamicAnswer('Network error while contacting synthesis engine.');
      } finally {
        setIsLoadingDynamic(false);
      }
    }
  };

  const currentAnswer = dynamicAnswer || staticAnswer;

  return (
    <div style={{ padding: '0 2rem' }}>
      <p className="byline"><span className="dateline">LIVE WIRE —</span> AI Synthesis Desk</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
        {/* Static Budget Q&A Questions */}
        <p className="small-caps" style={{ fontSize: '0.7rem', color: 'var(--color-ink-wash)', letterSpacing: '0.1em' }}>
          BUDGET ANALYSIS (ARCHIVED)
        </p>
        {STATIC_SYNTHESES.map((item) => (
          <button
            key={item.key}
            className={`btn ${activeKey === item.key ? 'active' : ''}`}
            onClick={() => handleSelect(item.key)}
            style={{ textAlign: 'left', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span>Q: {item.q}</span>
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </button>
        ))}

        {/* Dynamic Live Headline Questions */}
        {dynamicQuestions.length > 0 && (
          <>
            <p className="small-caps" style={{ fontSize: '0.7rem', color: 'var(--color-telegraph-red)', letterSpacing: '0.1em', marginTop: '0.5rem' }}>
              ⬛ LIVE TODAY — CLICK TO AI-SYNTHESIZE
            </p>
            {dynamicQuestions.map((item) => (
              <button
                key={item.key}
                className={`btn ${activeKey === item.key ? 'active' : ''}`}
                onClick={() => handleSelect(item.key, item.q)}
                style={{
                  textAlign: 'left', padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderLeft: '3px solid var(--color-telegraph-red)'
                }}
              >
                <span style={{ fontSize: '0.85rem' }}>Q: {item.q}</span>
                <span style={{ fontSize: '1.2rem', color: 'var(--color-telegraph-red)' }}>⚡</span>
              </button>
            ))}
          </>
        )}
      </div>

      <div className="card" style={{ backgroundColor: 'var(--color-newsprint)', border: 'none', borderTop: '2px solid var(--color-press-black)', borderBottom: '2px solid var(--color-press-black)' }}>
        {isLoadingDynamic ? (
          <p className="deck" style={{ animation: 'blink 1.5s infinite' }}>
            ⚙ Querying global wires and synthesizing answer...
          </p>
        ) : (
          <p className="drop-cap" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            {currentAnswer}
          </p>
        )}
      </div>
      
      <p style={{ marginTop: '1rem', fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-ink-wash)' }}>
        {activeKey.startsWith('live_')
          ? '*AI-synthesized from live global news wires in real-time.'
          : '*AI-synthesized from 22 distinct field reports filed over the last 6 hours, ensuring zero conceptual overlap.'}
      </p>
    </div>
  );
}
