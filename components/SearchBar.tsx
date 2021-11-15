import React, { useState } from 'react';
import { MdOutlineShortText } from 'react-icons/md';

interface ISearchProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const helpSuggestSearch = [
  {
    id: 1,
    label: 'Minimal'
  },
  {
    id: 2,
    label: 'House'
  },
  {
    id: 3,
    label: 'Minimal'
  }
];

const SearchBar = (props: ISearchProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  return (
    <div className="max-w-[1150px] bg-[#1A1A1A] rounded-full overflow-hidden border-2 border-[#333333] p-1.5 px-5 pr-8 flex items-center">
      <div className="h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse" />
      <input
        type="text"
        value={props.value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => props.handleChange(e)}
        className="bg-[#1a1a1a] text-white border-none w-full focus:ring-0 placeholder-[#fafafa]"
        placeholder="Search..."
      />

      <div className="flex items-center divide-dotted divide-x-2 divide-[#333] ml-auto">
        <div className="flex space-x-2 pr-5">
          {helpSuggestSearch.map((item) => (
            <button className="tagCustom">{item.label}</button>
          ))}
        </div>

        <div className="flex items-center space-x-1.5 text-[#cecece] pl-4 cursor-pointer">
          <MdOutlineShortText className="text-2xl  animate-pulse" />
          <span className="font-medium text-sm">Filters</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
