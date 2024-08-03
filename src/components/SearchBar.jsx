import React, { useState, forwardRef, useImperativeHandle } from 'react';

const SearchBar = forwardRef(({ onSearch }, ref) => {
  const [query, setQuery] = useState('');

  useImperativeHandle(ref, () => ({
    clearSearch: () => setQuery('')
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      <button type="submit">Search</button>
    </form>
  );
});

export default SearchBar;
