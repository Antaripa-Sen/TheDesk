'use client';

import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function NavBar({ onSearch }: { onSearch?: (query: string) => void }) {
  return (
    <nav className="nav-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 5%' }}>
      
      {/* Search side */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        {onSearch && <SearchBar onSearch={onSearch} />}
      </div>
      
      {/* Links side */}
      <div style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <a href="#">World</a>
        <a href="#">Politics</a>
        <a href="#">Economy</a>
        <a href="#">Markets</a>
        <a href="#">Culture</a>
        <a href="#">Science</a>
      </div>

      {/* Theme Toggle side */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
         <ThemeToggle />
      </div>

    </nav>
  );
}
