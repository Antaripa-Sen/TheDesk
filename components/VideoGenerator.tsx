'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square } from 'lucide-react';

const HINDI_SCRIPT = "नमस्कार, द डेस्क न्यूज़ में आपका स्वागत है। आज की सबसे बड़ी खबर है एक मशहूर टेक कंपनी का दिवालिया होना, जिसे अंग्रेजी में 'बैंकरप्सी' कहते हैं। \n\nआसान भाषा में समझें तो, जैसे आपके इलाके की सबसे पुरानी और बड़ी मिल या कारखाना अचानक ताला लगाकर बंद हो जाए, क्योंकि उन पर बहुत सारा कर्ज़ हो गया हो। यह कंपनी भी वो चिप्स बनाती थी जो आपके फोन और कंप्यूटर को चलाते हैं, लेकिन अब वह बैंक का उधार नहीं चुका पा रही है। \n\nअब सवाल ये है कि एक आम निवेशक के तौर पर क्या आपका पैसा सुरक्षित है? देखिए, अगर आपने अपनी बचत को अलग-अलग जगहों पर बांटा हुआ है—जैसे हम कहते हैं कि 'सारे अंडे एक ही टोकरी में नहीं रखने चाहिए'—तो घबराने की बिलकुल ज़रूरत नहीं है। बाज़ार में ऐसे उतार-चढ़ाव आते रहते हैं। \n\nइसलिए, डर कर अपने म्यूचुअल फंड या शेयर को सस्ते में हरगिज़ न बेचें। समझदारी से निवेश जारी रखें। अधिक जानकारी के लिए पढ़ते रहें, द डेस्क।";

interface VideoGeneratorProps {
  latestHeadline?: string;
}

export default function VideoGenerator({ latestHeadline = "Semiconductor giant files for Chapter 11" }: VideoGeneratorProps) {
  const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleGenerate = () => {
    setStatus('generating');
    setTimeout(() => {
      setStatus('done');
    }, 4000); // 4-second mock generation
  };

  const togglePlayback = () => {
    if (!('speechSynthesis' in window)) return;
    
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.cancel();
        utteranceRef.current = new SpeechSynthesisUtterance(HINDI_SCRIPT);
        utteranceRef.current.lang = 'hi-IN';
        utteranceRef.current.rate = 0.9; 
        utteranceRef.current.pitch = 1.0;
        
        utteranceRef.current.onend = () => setIsPlaying(false);
        
        window.speechSynthesis.speak(utteranceRef.current);
      }
      setIsPlaying(true);
    }
  };

  const stopPlayback = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontFamily: 'var(--font-raleway)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.2rem', color: 'var(--color-telegraph-red)', marginBottom: '1rem', fontWeight: 800 }}>
        Live Workflow: Breaking News to Vernacular Video
      </h3>
      <p className="deck" style={{ fontSize: '1rem' }}>
        <a href="#" style={{ color: 'var(--color-press-black)', textDecoration: 'none' }}> LATEST: {latestHeadline} </a> <br/>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-ink-wash)' }}>Our system is ready to synthesize an explainer.</span>
      </p>

      {status === 'idle' && (
        <button className="btn" onClick={handleGenerate}>
          Generate Hindi Video (Retail Persona)
        </button>
      )}

      {status === 'generating' && (
        <div style={{ padding: '2rem 0', textAlign: 'center' }}>
          <p className="small-caps" style={{ color: 'var(--color-telegraph-red)', fontWeight: 'bold' }}>
            [⚙ synthesizing news · translating · rendering digital anchor · generating audio]
          </p>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-column-rule)', marginTop: '1rem', overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', backgroundColor: 'var(--color-press-black)', animation: 'ticker-scroll 1s infinite alternate' }} />
          </div>
        </div>
      )}

      {status === 'done' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 1.2fr', gap: '2rem' }}>
          
          {/* Script Section */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 className="small-caps">Generated Script (Hindi Explainer)</h4>
            <div style={{ 
              backgroundColor: 'var(--color-newsprint)', 
              padding: '1.5rem', 
              borderLeft: '4px solid var(--color-ink-wash)',
              fontFamily: 'var(--font-lora)',
              fontSize: '1rem',
              lineHeight: '1.8',
              flex: 1,
              whiteSpace: 'pre-line'
            }}>
              &quot;{HINDI_SCRIPT}&quot;
            </div>
            <p className="byline" style={{ marginTop: '1rem' }}>Tone: Non-Jargon · Analogy: Local Factory</p>
          </div>

          {/* Video Player Section */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 className="small-caps">Media Player (Synthesized)</h4>
                {/* Media Controls */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <button className="btn" onClick={togglePlayback} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>
                        {isPlaying ? <Pause size={14} /> : <Play size={14} />} {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>
                    <button className="btn" onClick={stopPlayback} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.6rem', fontSize: '0.8rem', backgroundColor: 'var(--color-column-rule)' }}>
                        <Square size={14} /> STOP
                    </button>
                </div>
            </div>

            <div style={{ 
              backgroundColor: '#0c101a', 
              aspectRatio: '16/9', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--color-newsprint)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              border: '1px solid var(--color-column-rule)',
              backgroundImage: 'url("/ai_anchor.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              animation: isPlaying ? 'slow-zoom 15s infinite alternate ease-in-out' : 'none'
            }}>
              
              {/* Audio visualizer (only moves when playing) */}
              <div style={{ position: 'absolute', bottom: '18%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px', height: '30px', alignItems: 'flex-end', opacity: isPlaying ? 0.9 : 0.2, zIndex: 2 }}>
                {[...Array(24)].map((_, i) => (
                  <div key={i} style={{
                    width: '4px',
                    backgroundColor: '#e0e1dd',
                    animation: isPlaying ? `ticker-scroll ${0.2 + Math.random()}s infinite alternate ease-in-out` : 'none',
                    height: isPlaying ? `${10 + Math.random() * 90}%` : '5px',
                    borderRadius: '2px',
                    transition: 'height 0.3s ease'
                  }} />
                ))}
              </div>

              {/* Broadcast Tags */}
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'var(--color-telegraph-red)', color: 'white', padding: '0.3rem 0.8rem', fontFamily: 'var(--font-raleway)', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '4px', zIndex: 2 }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%', animation: isPlaying ? 'blink 1s infinite' : 'none', opacity: isPlaying ? 1 : 0.5 }}></span>
                LIVE NEWSROOM
              </div>

              {/* Lower Third Ticker */}
              <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', backgroundColor: 'rgba(0,0,0,0.85)', padding: '0.6rem 1rem', fontFamily: 'var(--font-lora)', fontSize: '1rem', borderTop: '2px solid var(--color-telegraph-red)', zIndex: 2 }}>
                <span style={{ color: 'var(--color-telegraph-red)', fontWeight: 'bold', marginRight: '0.5rem' }}>BREAKING:</span>
                <span style={{ color: '#fff' }}>TECH GIANT FILES BANKRUPTCY - WHAT RETAIL INVESTORS MUST KNOW</span>
              </div>

            </div>
            
            <p className="image-caption" style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
              Press PLAY to hear the AI presenter read the translated vernacular script.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
