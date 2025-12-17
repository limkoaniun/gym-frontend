import { Input } from '@/components/ui/input';
import { Camera, Search } from 'lucide-react';
import { useState } from 'react';

type SearchBarProps = {
  handleSearch: (inputText: string) => void;
};

const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const [inputText, setInputText] = useState<string>('');
  return (
    <div className="max-w-md mx-auto">
      <div className="relative flex items-center justify-center">
        <Input
          type="text"
          placeholder="Search For Equipment"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="
                flex w-full px-3 py-3 mt-1 ring-offset-background
                file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
                disabled:cursor-not-allowed disabled:opacity-50
                md:text-sm h-14 pl-14 pr-14 text-base bg-white/10 backdrop-blur-xl
                border-2 border-white/20 text-white placeholder:text-white/60 rounded-2xl
                focus:outline-none
                focus:ring-0
                focus:ring-offset-0
                focus:border-transparent
                "
        />
        <Camera className="absolute right-10 text-white" />
        <button onClick={() => handleSearch(inputText)}>
          <Search className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
