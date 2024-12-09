'use client';
import React from 'react';
import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type BtnProps = {
    btnName: string;
    btnIcon: React.ReactNode;
    route?: string;
    counter?: number;
};

const SideNavBtn = ({ btnName, btnIcon, route, counter }: BtnProps) => {
    const pathName = usePathname();
    const isActive = route === pathName;

    return (
        <Link href={`${route}`}>
            <button
                className={`w-full flex gap-4 py-3 px-4 place-items-center  ${
                    isActive ? 'bg-gradient-to-r text-[#605BFF]' : 'text-gray-500'
                } hover:bg-gradient-to-r from-[#e5e4ff] to-white transition-all duration-800 ease-in-out `}
            >
                <div className={`${isActive && 'text-[#605BFF]'}`}>{btnIcon}</div>
                <div className="font-semibold flex gap-3 place-items-center">
                    <div>{btnName}</div>
                    {counter && (
                        <div className="text-xs px-2 p-1 bg-red-200 text-rose-500 rounded-full">
                            {counter}
                        </div>
                    )}
                </div>
            </button>
        </Link>
    );
};

export default SideNavBtn;
