import React, { useState } from 'react';
import SearchBar from './SearchBar';

interface Props {}

const Content = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <SearchBar value={searchValue} handleChange={(e) => setSearchValue(e.target.value)} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-x-4"></div>
    </section>
  );
};

export default Content;
