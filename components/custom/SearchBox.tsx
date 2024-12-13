import React from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

const SearchBox = () => {
    return (
        <div className="flex place-items-center relative">
            <Input
                className="bg-white focus:outline-none border-none max-w-[400px] w-full focus:ring-0 focus-visible:ring-0 focus:shadow-md pr-10 py-5 rounded-[8px]"
                placeholder="search"
            />
            <Search size={16} className="text-gray-400 absolute top-[12px] right-3" />
        </div>
    );
};

export default SearchBox;
