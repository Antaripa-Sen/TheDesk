'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Square } from 'lucide-react';

// Eagerly preload an image into the browser's decode/GPU cache.
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // still resolve so we don't block forever
    img.src = src;
  });
}

interface VideoGeneratorProps {
  latestHeadline?: string;
}

// Dynamically build a unique Hindi script based on the real live headline
function buildHindiScript(headline: string): string {
  const shortHeadline = headline.slice(0, 70);
  return `नमस्कार! मैं संगीता शर्मा — द डेस्क न्यूज़ में आपका स्वागत है।

आज की सबसे बड़ी खबर है: ${shortHeadline}

इसे आसान भाषा में समझें — जैसे आपके इलाके की कोई बड़ी दुकान अचानक बंद हो जाए क्योंकि उस पर बहुत कर्ज़ हो गया हो। ऐसे ही दुनिया के बाज़ारों में आज उथल-पुथल है।

घबराएं नहीं। अगर आपका पैसा म्यूचुअल फंड में है या SIP में है, तो धैर्य रखें। बाज़ार का उतार-चढ़ाव सामान्य है। सारे अंडे एक टोकरी में नहीं रखते — यही असली समझदारी है।

अधिक जानकारी के लिए, पढ़ते रहिए — द डेस्क। धन्यवाद!`;
}

// Split a script into smaller chunks so Chrome TTS bug (15s cutoff) is avoided
function chunkScript(script: string): string[] {
  return script
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

export default function VideoGenerator({ latestHeadline = "Global markets react to breaking economic news" }: VideoGeneratorProps) {
  const [status, setStatus] = useState<'idle' | 'generating' | 'done'>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);

  const lipSyncIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chunkIndexRef = useRef(0);
  const chunksRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false); // track without closure capture issues

  // Build a fresh script every time the headline changes
  const currentScript = buildHindiScript(latestHeadline);

  const startLipSync = useCallback(() => {
    if (lipSyncIntervalRef.current) clearInterval(lipSyncIntervalRef.current);
    // 200ms gives ~5 fps mouth toggle — realistic, smooth, no render overload
    lipSyncIntervalRef.current = setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 200);
  }, []);

  const stopLipSync = useCallback(() => {
    if (lipSyncIntervalRef.current) {
      clearInterval(lipSyncIntervalRef.current);
      lipSyncIntervalRef.current = null;
    }
    setMouthOpen(false);
  }, []);

  // Speak next chunk — fixes Chrome TTS 15s silent cutoff bug
  const speakNextChunk = useCallback(() => {
    if (!isPlayingRef.current) return;
    const chunks = chunksRef.current;
    const idx = chunkIndexRef.current;

    if (idx >= chunks.length) {
      // All done
      stopLipSync();
      setIsPlaying(false);
      isPlayingRef.current = false;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[idx]);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.88;
    utterance.pitch = 1.15; // feminine voice emphasis

    // Find and enforce a female voice if available
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
      v.lang.startsWith('hi') && 
      (v.name.toLowerCase().includes('female') || 
       v.name.toLowerCase().includes('kalpana') || 
       v.name.toLowerCase().includes('aditi') || 
       v.name.toLowerCase().includes('swara'))
    );
    const fallbackVoice = voices.find(v => v.lang.startsWith('hi') && !v.name.toLowerCase().includes('hemant') && !v.name.toLowerCase().includes('male'));
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    } else if (fallbackVoice) {
      utterance.voice = fallbackVoice;
    }

    utterance.onend = () => {
      chunkIndexRef.current += 1;
      speakNextChunk();
    };
    utterance.onerror = () => {
      stopLipSync();
      setIsPlaying(false);
      isPlayingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  }, [stopLipSync]);

  const startPlayback = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    chunksRef.current = chunkScript(currentScript);
    chunkIndexRef.current = 0;
    isPlayingRef.current = true;

    setIsPlaying(true);
    startLipSync();

    // Small delay so cancel() clears the queue first
    setTimeout(() => {
      speakNextChunk();
    }, 100);
  }, [currentScript, startLipSync, speakNextChunk]);

  const pausePlayback = useCallback(() => {
    window.speechSynthesis.pause();
    stopLipSync();
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, [stopLipSync]);

  const resumePlayback = useCallback(() => {
    window.speechSynthesis.resume();
    startLipSync();
    setIsPlaying(true);
    isPlayingRef.current = true;
  }, [startLipSync]);

  const stopPlayback = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    isPlayingRef.current = false;
    stopLipSync();
    setIsPlaying(false);
    chunkIndexRef.current = 0;
  }, [stopLipSync]);

  const togglePlayback = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlaying) {
      pausePlayback();
    } else if (window.speechSynthesis.paused) {
      resumePlayback();
    } else {
      startPlayback();
    }
  };

  const handleGenerate = () => {
    setStatus('generating');
    setTimeout(() => setStatus('done'), 3000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      stopLipSync();
    };
  }, [stopLipSync]);

  // --- RENDER ---
  // We use TWO stacked <img> tags with CSS opacity toggling.
  // This keeps both images in GPU memory (no re-fetch) → zero buffering.
  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontFamily: 'var(--font-raleway)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.2rem', color: 'var(--color-telegraph-red)', marginBottom: '1rem', fontWeight: 800 }}>
        Live Workflow: Breaking News to Vernacular Video
      </h3>
      <p className="deck" style={{ fontSize: '1rem' }}>
        <strong>LATEST:</strong> {latestHeadline}
        <br />
        <span style={{ fontSize: '0.85rem', color: 'var(--color-ink-wash)' }}>Click Generate to synthesize a personalized Hindi explainer from this live headline.</span>
      </p>

      {status === 'idle' && (
        <button className="btn" onClick={handleGenerate}>
          Generate Hindi Video (Retail Persona)
        </button>
      )}

      {status === 'generating' && (
        <div style={{ padding: '2rem 0', textAlign: 'center' }}>
          <p className="small-caps" style={{ color: 'var(--color-telegraph-red)', fontWeight: 'bold' }}>
            [⚙ synthesizing news · translating to Hindi · loading anchor · preparing audio]
          </p>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-column-rule)', marginTop: '1rem', overflow: 'hidden' }}>
            <div style={{ width: '60%', height: '100%', backgroundColor: 'var(--color-telegraph-red)', animation: 'ticker-scroll 1.2s infinite alternate' }} />
          </div>
        </div>
      )}

      {status === 'done' && (
        <div className="video-layout">

          {/* Script Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 className="small-caps">Generated Script (Hindi Explainer)</h4>
            <div style={{
              backgroundColor: 'var(--color-newsprint)',
              padding: '1.5rem',
              borderLeft: '4px solid var(--color-ink-wash)',
              fontFamily: 'var(--font-lora)',
              fontSize: '1rem',
              lineHeight: '1.9',
              flex: 1,
              whiteSpace: 'pre-line',
              overflowY: 'auto',
              maxHeight: '360px'
            }}>
              &quot;{currentScript}&quot;
            </div>
            <p className="byline" style={{ marginTop: '1rem' }}>Tone: Non-Jargon · Anchor: Sangeeta Sharma</p>
          </div>

          {/* Video Player Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4 className="small-caps">Media Player</h4>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn" onClick={togglePlayback} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  {isPlaying ? 'PAUSE' : 'PLAY'}
                </button>
                <button className="btn" onClick={stopPlayback} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem', backgroundColor: 'var(--color-column-rule)' }}>
                  <Square size={14} /> STOP
                </button>
              </div>
            </div>

            {/* 
              Two stacked <img> tags. JS toggles their opacity via CSS.
              BOTH images stay in GPU layer at all times → ZERO buffering on swap.
              CSS transition: 'none' so it's a hard cut exactly like a real lip-sync.
            */}
            <div style={{
              aspectRatio: '16/9',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
              border: `2px solid ${isPlaying ? 'var(--color-telegraph-red)' : 'var(--color-column-rule)'}`,
              backgroundColor: '#0c101a',
              transition: 'border-color 0.3s'
            }}>

              {/* Frame 1: Mouth CLOSED */}
              <img
                src="/female_ai_anchor.png"
                alt="Anchor closed"
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top center',
                  opacity: (isPlaying && mouthOpen) ? 0 : 1,
                  transition: 'none', // hardcut — no cross-fade delay
                  filter: isPlaying ? 'brightness(1.05)' : 'brightness(0.7)'
                }}
              />

              {/* Frame 2: Mouth OPEN — always in DOM, toggled by opacity */}
              <img
                src="/female_ai_anchor_speaking.png"
                alt="Anchor speaking"
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top center',
                  opacity: (isPlaying && mouthOpen) ? 1 : 0,
                  transition: 'none',
                  filter: 'brightness(1.08)'
                }}
              />

              {/* Audio Visualizer bars */}
              <div style={{
                position: 'absolute', bottom: '18%', left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', gap: '3px', height: '24px',
                alignItems: 'flex-end',
                opacity: isPlaying ? 0.9 : 0,
                transition: 'opacity 0.4s',
                zIndex: 3
              }}>
                {[...Array(18)].map((_, i) => (
                  <div key={i} style={{
                    width: '4px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    height: `${20 + Math.random() * 80}%`,
                    borderRadius: '2px',
                    animation: isPlaying ? `ticker-scroll ${0.15 + (i % 5) * 0.08}s infinite alternate ease-in-out` : 'none',
                  }} />
                ))}
              </div>

              {/* ON AIR / STANDBY badge */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                backgroundColor: isPlaying ? 'var(--color-telegraph-red)' : 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                fontFamily: 'var(--font-raleway)',
                fontSize: '0.75rem', fontWeight: 'bold',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                borderRadius: '4px', zIndex: 3,
                transition: 'background-color 0.3s',
                border: isPlaying ? 'none' : '1px solid rgba(255,255,255,0.3)'
              }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  backgroundColor: 'white',
                  animation: isPlaying ? 'blink 0.8s infinite' : 'none',
                  opacity: isPlaying ? 1 : 0.3
                }} />
                {isPlaying ? 'ON AIR' : 'STANDBY'}
              </div>

              {/* Lower Third — live headline injection */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, width: '100%',
                backgroundColor: 'rgba(0,0,0,0.9)',
                padding: '0.5rem 1rem',
                borderTop: '2px solid var(--color-telegraph-red)',
                zIndex: 3
              }}>
                <div style={{ fontFamily: 'var(--font-raleway)', fontSize: '0.65rem', color: 'var(--color-telegraph-red)', fontWeight: 'bold', letterSpacing: '0.12em', marginBottom: '0.15rem' }}>
                  SANGEETA SHARMA · THE DESK CORRESPONDENT
                </div>
                <div style={{ fontFamily: 'var(--font-lora)', fontSize: '0.85rem', color: '#fff', lineHeight: 1.3 }}>
                  {latestHeadline.slice(0, 72)}{latestHeadline.length > 72 ? '...' : ''}
                </div>
              </div>

            </div>

            <p className="image-caption" style={{ marginTop: '0.5rem' }}>
              {isPlaying
                ? '▶ Sangeeta is reading the Hindi script — lip-sync is live.'
                : 'Press PLAY — Sangeeta will read the script aloud with lip-sync.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
