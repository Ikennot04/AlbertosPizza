'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path ? 'text-[#edbd60]' : 'text-gray-600';
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/homepage" className="flex-shrink-0">
              <Image
                src="/images/logo/unnamed.png"
                alt="Don Macchiatos Logo"
                width={300}
                height={300}
                className="w-auto h-12 sm:h-16 md:h-20 object-contain transition-all duration-200"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-4 lg:space-x-8">
              <Link 
                href="/homepage" 
                className={`inline-flex items-center px-3 py-2 text-sm lg:text-base font-medium ${isActive('/homepage')} hover:text-[#edbd60] transition-colors duration-200`}
              >
                Homepage
              </Link>
              <Link 
                href="/menu" 
                className={`inline-flex items-center px-3 py-2 text-sm lg:text-base font-medium ${isActive('/menu')} hover:text-[#edbd60] transition-colors duration-200`}
              >
                Menu
              </Link>
              <Link 
                href="/transaction" 
                className={`inline-flex items-center px-3 py-2 text-sm lg:text-base font-medium ${isActive('/transaction')} hover:text-[#edbd60] transition-colors duration-200`}
              >
                Transaction
              </Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              className="inline-flex items-center justify-center text-gray-600 hover:text-[#edbd60] transition-colors duration-200 w-10 h-10 rounded-full hover:bg-gray-100"
              aria-label="Shopping Cart"
            >
              <RiShoppingCart2Fill className="w-6 h-6" />
            </button>
            <button 
              className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-[#e75f06] text-[#e75f06] hover:bg-[#e75f06] hover:text-white transition-all duration-200 text-xs sm:text-sm whitespace-nowrap"
              aria-label="Location"
            >
              <FaUserCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium">TAYUD, LILOAN</span>
            </button>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 md:hidden text-gray-600 hover:text-[#edbd60] transition-colors duration-200 hover:bg-gray-100 rounded-full"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <RiCloseFill className="w-6 h-6" />
              ) : (
                <RiMenu3Fill className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'} md:hidden absolute w-full bg-white shadow-lg transition-all duration-200 ease-in-out transform`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link 
            href="/homepage" 
            className={`block px-3 py-2.5 text-base font-medium ${isActive('/homepage')} hover:text-[#edbd60] transition-colors duration-200 rounded-lg hover:bg-gray-50`}
            onClick={() => setIsMenuOpen(false)}
          >
            Homepage
          </Link>
          <Link 
            href="/menu" 
            className={`block px-3 py-2.5 text-base font-medium ${isActive('/menu')} hover:text-[#edbd60] transition-colors duration-200 rounded-lg hover:bg-gray-50`}
            onClick={() => setIsMenuOpen(false)}
          >
            Menu
          </Link>
          <Link 
            href="/transaction" 
            className={`block px-3 py-2.5 text-base font-medium ${isActive('/transaction')} hover:text-[#edbd60] transition-colors duration-200 rounded-lg hover:bg-gray-50`}
            onClick={() => setIsMenuOpen(false)}
          >
            Transaction
          </Link>
          <button className="flex items-center gap-2 px-3 py-2.5 w-full text-left text-base font-medium text-[#e75f06] rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <FaUserCircle className="w-5 h-5" />
            <span>TAYUD, LILOAN</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;