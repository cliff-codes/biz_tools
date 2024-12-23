'use client';
import React, { useRef } from 'react';
import { IoCamera } from 'react-icons/io5';

const ImageFileInput = () => {
    // const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="w-full flex flex-col justify-center place-items-center">
            <div
                className="bg-gray-100 rounded-full w-[90px] h-[90px] sm:w-[134px] sm:h-[134px] flex place-items-center justify-center cursor-pointer"
                onClick={() => inputRef.current?.click()}
            >
                <IoCamera size={32} className="text-gray-600" />
                <input type="file" hidden={true} ref={inputRef} />
            </div>
            <div className="text-sm font-semibold">upload logo</div>
        </div>
    );
};

export default ImageFileInput;
