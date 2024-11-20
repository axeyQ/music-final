// app/components/SearchBar.js
"use client";

import { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Trigger the filtering on the parent component
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for music..."
        className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default SearchInput;
