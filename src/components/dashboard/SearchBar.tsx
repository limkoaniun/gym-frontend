import { Input } from '@/components/ui/input';
import { Camera, Search } from 'lucide-react';
import { useState, useRef } from 'react';

type SearchBarProps = {
  handleTextSearch: (inputText: string) => void;
  handleImageSearch: (file?: File) => void;
};

const SearchBar = ({ handleTextSearch, handleImageSearch }: SearchBarProps) => {
  const [inputText, setInputText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="max-w-md mx-auto">
      <div className="relative flex items-center justify-center">
        <Input
          type="text"
          placeholder="Search For Equipment"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="
                w-full px-3 py-3 mt-1 h-14 pl-14 pr-14
                bg-white/10 backdrop-blur-xl
                border-2 border-white/20
                text-white placeholder:text-white/60
                rounded-[10px_0_0_10px]
                focus:outline-none focus:ring-0 focus:border-transparent
                "
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="
            absolute right-[4rem]
            rounded-full
            p-2
            hover: bg-muted
          "
        >
          <Camera />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => handleImageSearch(e.target.files?.[0])}
        />
        <button
          onClick={() => handleTextSearch(inputText)}
          className="
                flex items-center justify-center
                w-[55px] h-[56px] mt-1
                border-2 border-white/20
                border-l-0
                bg-white/10 backdrop-blur-xl
                text-white
                rounded-[0_10px_10px_0]
                transition-all duration-200
                hover:bg-white/20
                hover:scale-[1.02]
                active:scale-[0.98]
                "
        >
          <Search />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
