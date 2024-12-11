'use client';
import React from 'react';
import Logo from './Logo';
import { Bell, LayoutGrid } from 'lucide-react';
import SideNavBtn from './SideNavBtn';
import { usePathname } from 'next/navigation';
import { FaTicketSimple } from 'react-icons/fa6';
import { IoLogOut, IoMail } from 'react-icons/io5';
import Image from 'next/image';

const SideNav = () => {
    const pathName = usePathname();

    return (
        <nav className="w-[100px] lg:w-[300px] transition-all duration-400 ease-in-out h-full flex flex-col justify-between py-2 bg-white">
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-col gap-4 place-items-center justify-center my-8">
                    <Logo size={60} />
                    <h1 className="text-md font-semibold md:text-2xl text-center transition-all duration-400 ease-in-out">
                        Biz Toolz
                    </h1>
                </div>

                {/* nav items buttons*/}
                <div className="flex flex-col gap-3">
                    <SideNavBtn
                        route="/"
                        btnIcon={
                            <LayoutGrid
                                className={`${
                                    pathName === '/'
                                        ? 'text-[#605BFF] fill-[#605BFF]'
                                        : 'text-gray-500 fill-gray-500'
                                }`}
                                size={'28px'}
                                fill="True"
                            />
                        }
                        btnName={'Dashboard'}
                    />

                    <SideNavBtn
                        route="/invoice"
                        btnIcon={
                            <FaTicketSimple
                                className={`${
                                    pathName === '/invoice'
                                        ? 'text-[#605BFF] fill-[#605BFF]'
                                        : 'text-gray-500 fill-gray-500'
                                }`}
                                size={'28px'}
                            />
                        }
                        btnName={'Invoice'}
                    />

                    <SideNavBtn
                        route="/mail"
                        btnIcon={
                            <IoMail
                                size={'28px'}
                                fill="True"
                                className={`${
                                    pathName === '/mails'
                                        ? 'text-[#605BFF] fill-[#605BFF]'
                                        : 'text-gray-500 fill-gray-500'
                                }`}
                            />
                        }
                        btnName="Mails"
                    />

                    <SideNavBtn
                        route="/notification"
                        btnIcon={
                            <Bell
                                fill="True"
                                className={`${
                                    pathName === '/notifications'
                                        ? 'text-[#605BFF] fill-[#605BFF]'
                                        : 'text-gray-500 fill-gray-500'
                                }`}
                                size={'28px'}
                            />
                        }
                        btnName="Notifications"
                        counter={1}
                    />
                </div>
            </div>

            {/* user profile icon */}
            <div className="">
                <div className="flex  place-items-center justify-around cursor-pointer hover:bg-gradient-to-tr py-3 px-1 from-[#e5e4ff] to-white">
                    <div className="flex place-items-center gap-4">
                        <Image
                            src={'/avatar.jpg'}
                            width={50}
                            height={50}
                            alt="user pofile icon"
                            className="rounded-[17px] w-[30px] h-[30px]"
                        />
                        <div className="h-full flex flex-col justify-center">
                            <h3 className="text-xs font-semibold hidden md:flex">Simple Codes</h3>
                        </div>
                    </div>
                    {/* <button>
                        <IoLogOut size={'30px'} className="text-slate-500 hidden" />
                    </button> */}
                </div>
            </div>
        </nav>
    );
};

export default SideNav;
