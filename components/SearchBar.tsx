'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--color-press-black)', padding: '0.2rem 0' }}>
      <input 
        type="text" 
        placeholder="Search Archives..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          border: 'none',
          background: 'transparent',
          fontFamily: 'var(--font-raleway)',
          fontSize: '0.75rem',
          outline: 'none',
          color: 'var(--color-press-black)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          width: '150px'
        }}
      />
      <button type="submit" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-press-black)' }}>
        <Search size={16} />
      </button>
    </form>
  );
}
