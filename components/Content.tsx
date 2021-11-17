import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import SearchBar from './SearchBar';

interface IContentProps {}

const Content = (props: IContentProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <SearchBar value={searchValue} handleChange={(e) => setSearchValue(e.target.value)} />
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-x-4 gap-y-8 p-4">
        {/* TODO REMOVE THIS SIGNOUT */}
        <button className="text-white border-2 rounded-full w-[60px] h-[60px]" onClick={() => signOut({ redirect: false })}>sign out</button>
      </div>
    </section>
  );
};

export default Content;
