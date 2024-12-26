'use client';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import SideNav from './SideNav';

const Nav = () => {
    const [openSideNav, setOpenSideNav] = useState(false);
    const toggleSideNav = () => setOpenSideNav(!openSideNav);

    return (
        <nav className="px-4 h-[50px] flex place-items-center">
            {/* handburger menu */}
            <div
                className="w-8 h-8 cursor-pointer hover:bg-white/90 flex place-items-center justify-center rounded-full transition-colors .1 ease-linear"
                onClick={toggleSideNav}
            >
                <Menu />
            </div>
            {/* side nav */}

            <div
                className={`fixed top-0 left-0 -translate-x-full ${
                    openSideNav && '-translate-x-0'
                } h-full z-50 transition-transform .2 ease-linear`}
            >
                <SideNav isSideNavOpen={openSideNav} closeSideNav={toggleSideNav} />
            </div>
        </nav>
    );
};

export default Nav;
