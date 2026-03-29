'use client';

import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

interface NavBarProps {
  onSearch?: (query: string) => void;
  onCategorySelect?: (category: string) => void;
  activeCategory?: string;
}

export default function NavBar({ onSearch, onCategorySelect, activeCategory = 'world' }: NavBarProps) {
  
  const categories = ['World', 'Politics', 'Economy', 'Markets', 'Culture', 'Science'];

  return (
    <nav className="nav-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 5%' }}>
      
      {/* Search side */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        {onSearch && <SearchBar onSearch={onSearch} />}
      </div>
      
      {/* Links side */}
      <div style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => onCategorySelect && onCategorySelect(cat.toLowerCase())}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer',
              fontFamily: 'var(--font-raleway)', 
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: activeCategory === cat.toLowerCase() ? 'var(--color-telegraph-red)' : 'var(--color-press-black)',
              transition: 'color 0.2s',
              borderBottom: activeCategory === cat.toLowerCase() ? '2px solid var(--color-telegraph-red)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Theme Toggle side */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
         <ThemeToggle />
      </div>

    </nav>
  );
}
