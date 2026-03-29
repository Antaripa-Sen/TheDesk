export default function Ticker() {
  return (
    <div className="ticker-bar">
      <div className="ticker-content">
        <span className="ticker-label">BREAKING WIRE:</span>
        <span style={{ marginRight: '4rem' }}>Global markets react cautiously to the newly announced Union Budget amidst macro uncertainty...</span>
        
        <span className="ticker-label">LATEST:</span>
        <span style={{ marginRight: '4rem' }}>Tech stocks slide following major bankruptcy filing in the semiconductor sector...</span>
        
        <span className="ticker-label">ECONOMY:</span>
        <span style={{ marginRight: '4rem' }}>Central Bank hints at potential rate cuts in the upcoming quarter...</span>
        
        <span className="ticker-label">UPDATE:</span>
        <span style={{ marginRight: '4rem' }}>Oil prices stabilize after volatile week of trading...</span>
      </div>
    </div>
  );
}
