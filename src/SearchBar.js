import React from 'react';

const SearchBar = ({ placeholder, onSearch }) =>
  <input type="text" className="search-bar" placeholder={placeholder} autoComplete="off"
    onKeyUp={(e) => onSearch(e.target.value)} />

export default SearchBar;