export default function Masthead() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="masthead">
      <div className="date small-caps">{currentDate} · LATE EDITION</div>
      <div className="logo">TheDesk</div>
      <div className="tagline">Clarity. Authority. Truth.</div>
    </header>
  );
}
