'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SideNavBtnProps } from '@/types';

const SideNavBtn = ({ btnName, btnIcon, route, counter }: SideNavBtnProps) => {
    const pathName = usePathname();
    const isActive = route === pathName;

    return (
        <Link href={`${route}`}>
            <button
                className={`w-full flex gap-4 py-3 px-8 place-items-center  ${
                    isActive ? 'bg-gradient-to-r text-[#605BFF]' : 'text-gray-500'
                } hover:bg-gradient-to-r from-[#e5e4ff] to-white transition-all duration-800 ease-in-out `}
            >
                <div className="flex relative">
                    <div className={`${isActive && 'text-[#605BFF]'}`}>{btnIcon}</div>
                    {counter && (
                        <div className="text-xs w-[15px] h-[15px] bg-rose-300 font-semibold text-rose-500 rounded-full absolute right-0 -top-1">
                            {counter}
                        </div>
                    )}
                </div>
                <div className="font-semibold flex gap-3 place-items-center">
                    <div className="">{btnName}</div>
                </div>
            </button>
        </Link>
    );
};

export default SideNavBtn;
