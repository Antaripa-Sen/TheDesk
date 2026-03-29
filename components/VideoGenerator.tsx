'use client';

import { useState } from 'react';

export default function VideoGenerator() {
  const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle');

  const handleGenerate = () => {
    setStatus('generating');
    setTimeout(() => {
      setStatus('done');
    }, 3000); // 3-second simulation
  };

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontFamily: 'var(--font-raleway)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1rem', color: 'var(--color-telegraph-red)', marginBottom: '1rem' }}>
        Live Workflow: Breaking News to Vernacular Video
      </h3>
      <p className="deck" style={{ fontSize: '1rem' }}>
        LATEST: Semiconductor giant files for Chapter 11. Our system is ready to synthesize an explainer.
      </p>

      {status === 'idle' && (
        <button className="btn" onClick={handleGenerate}>
          Generate Hindi Video (Retail Persona)
        </button>
      )}

      {status === 'generating' && (
        <div style={{ padding: '2rem 0', textAlign: 'center' }}>
          <p className="small-caps" style={{ color: 'var(--color-telegraph-red)', fontWeight: 'bold' }}>
            [⚙ synthesizing news · translating · lip-syncing avatar]
          </p>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-column-rule)', marginTop: '1rem', overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', backgroundColor: 'var(--color-press-black)', animation: 'ticker-scroll 1s infinite alternate' }} />
          </div>
        </div>
      )}

      {status === 'done' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
          <div>
            <h4 className="small-caps">Generated Script (Hindi Explainer)</h4>
            <div style={{ 
              backgroundColor: 'var(--color-newsprint)', 
              padding: '1rem', 
              borderLeft: '4px solid var(--color-ink-wash)',
              fontFamily: 'var(--font-lora)',
              fontSize: '0.9rem',
              lineHeight: '1.8'
            }}>
              &quot;नमस्ते! अगर आपने आज बाज़ार में गिरावट देखी है, तो इसका एक बड़ा कारण है एक बहुत बड़ी कंपनी का दिवालिया होना। <br/><br/>
              कल्पना कीजिए कि आपके शहर का सबसे बड़ा कारखाना अचानक बंद हो जाए। इसे &apos;बैंकरप्सी&apos; कहते हैं। ये कंपनी जो कंप्यूटर के लिए &apos;चिप्स&apos; बनाती थी, अब अपना कर्ज़ नहीं चुका पा रही है।<br/><br/>
              लेकिन घबराने की बात नहीं है! अगर आपने अपना पैसा अलग-अलग जगहों पर लगाया है (जैसे कई अलग-अलग टोकरियों में अंडे रखना), तो आपका नुकसान कम होगा। इस समय जल्दबाज़ी में कोई शेयर न बेचें।&quot;
            </div>
            <p className="byline" style={{ marginTop: '1rem' }}>Tone: Non-Jargon · Analogy: Local Factory</p>
          </div>
          <div>
            <h4 className="small-caps">Rendered Video Output</h4>
            <div style={{ 
              backgroundColor: '#000', 
              aspectRatio: '16/9', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--color-newsprint)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <video 
                src="https://www.w3schools.com/html/mov_bbb.mp4" 
                autoPlay 
                loop 
                controls 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', backgroundColor: 'var(--color-telegraph-red)', color: 'white', padding: '0.2rem 0.5rem', fontFamily: 'var(--font-raleway)', fontSize: '0.7rem', fontWeight: 'bold' }}>
                LIVE AI
              </div>
            </div>
            <p className="image-caption" style={{ marginTop: '0.5rem' }}>Automated explainer generated in 42 seconds.</p>
          </div>
        </div>
      )}
    </div>
  );
}
