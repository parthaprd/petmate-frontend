"use client";
import { useState } from "react";

export default function SearchFilter({
  onSearchChange,
  onSpeciesChange,
  onSortChange,
  onClearFilters,
}) {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [sort, setSort] = useState("");

  const handleSearchChange = (value) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handleSpeciesChange = (value) => {
    setSpecies(value);
    onSpeciesChange(value);
  };

  const handleSortChange = (value) => {
    setSort(value);
    onSortChange(value);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSpecies("");
    setSort("");
    onClearFilters();
  };

  return (
    <div className="w-[95%] max-w-[1000px] mx-auto mb-10">
      <div className="bg-[var(--bg-surface)] rounded-2xl px-6 py-4 border-[1.5px] border-[var(--border-color)] shadow-[0_3px_0_var(--border-color)] transition-all duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
          
          <div className="w-full">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="input w-full"
            />
          </div>

          
          <select
            value={species}
            onChange={(e) => handleSpeciesChange(e.target.value)}
            className="input w-full"
          >
            <option value="">All Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Fish">Fish</option>
            <option value="Guinea Pig">Guinea Pig</option>
          </select>

          
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="input w-full"
          >
            <option value="">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          
          <button
            onClick={handleClearFilters}
            className="btn-secondary-small h-[48px] w-full flex items-center justify-center"
          >
            CLEAR FILTERS
          </button>
        </div>
      </div>
    </div>
  );
}
