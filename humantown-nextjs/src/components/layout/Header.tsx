'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  submenu?: { label: string; url: string }[];
}

const navigation: NavItem[] = [
  {
    id: 'about',
    label: 'ABOUT',
    submenu: [
      { label: '펜션소개', url: '/about' },
      { label: '외경보기', url: '/view' },
    ],
  },
  {
    id: 'rooms',
    label: 'ROOMS',
    submenu: [{ label: '객실 목록', url: '/rooms' }],
  },
  {
    id: 'special',
    label: 'SPECIAL',
    submenu: [
      { label: '수영장', url: '/special/swimming-pool' },
      { label: '바베큐', url: '/special/barbecue' },
      { label: '족구장/농구장', url: '/special/sports' },
      { label: '카페', url: '/special/cafe' },
      { label: '산책로', url: '/special/trail' },
      { label: '어린이놀이터', url: '/special/playground' },
    ],
  },
  {
    id: 'reserve',
    label: 'RESERVE',
    submenu: [{ label: '예약안내', url: '/reservation' }],
  },
  {
    id: 'travel',
    label: 'TRAVEL',
    submenu: [{ label: '주변여행지', url: '/travel' }],
  },
  {
    id: 'location',
    label: 'LOCATION',
    submenu: [{ label: '오시는길', url: '/location' }],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'on' : ''}`}>
        <div className="hd_cont">
          <div className={`hd_inner ${isScrolled ? 'scrolled' : ''}`}>
            {/* Logo (Default - Centered) */}
            <h1 className="logo" style={{ opacity: isScrolled ? 0 : 1 }}>
              <Link href="/">
                HUMANTOWN
                <span>Gapyeong Pension</span>
              </Link>
            </h1>

            {/* Logo (Scrolled State - Left Aligned) */}
            <h1 className="logo2" style={{ display: isScrolled ? 'inline-block' : 'none' }}>
              <Link href="/">HUMANTOWN</Link>
            </h1>

            {/* Desktop Navigation */}
            <nav className="hd_lnb hidden lg:block">
              <ul className="hd_lnb01">
                {navigation.slice(0, 3).map((item) => (
                  <li
                    key={item.id}
                    className="depth1"
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className="depth1_a">{item.label}</span>
                    {item.submenu && (
                      <div className={`depth_box ${activeDropdown === item.id ? 'on' : ''}`}>
                        <ul>
                          {item.submenu.map((subitem, idx) => (
                            <li key={idx}>
                              <Link href={subitem.url}>{subitem.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <ul className="hd_lnb02">
                {navigation.slice(3).map((item) => (
                  <li
                    key={item.id}
                    className="depth1"
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className="depth1_a">{item.label}</span>
                    {item.submenu && (
                      <div className={`depth_box ${activeDropdown === item.id ? 'on' : ''}`}>
                        <ul>
                          {item.submenu.map((subitem, idx) => (
                            <li key={idx}>
                              <Link href={subitem.url}>{subitem.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div className={`hd_lnb_bg ${activeDropdown ? 'on' : ''}`} />
            </nav>

            {/* Reservation Button (Desktop) */}
            <div className="btn_hd_res hidden lg:block">
              <Link href="/reservation">실시간예약</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="btn_menu lg:hidden"
              onClick={toggleMobileMenu}
              aria-label="메뉴"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: '30px',
                height: '25px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span style={{ width: '100%', height: '3px', background: 'var(--color-gold)', borderRadius: '2px' }}></span>
              <span style={{ width: '100%', height: '3px', background: 'var(--color-gold)', borderRadius: '2px' }}></span>
              <span style={{ width: '100%', height: '3px', background: 'var(--color-gold)', borderRadius: '2px' }}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <aside className={`aside ${isMobileMenuOpen ? 'on' : ''}`}>
        <div className="aisde_inner">
          <div className="aside_box">
            <button
              className="btn_close"
              onClick={toggleMobileMenu}
              aria-label="닫기"
            />

            <ul>
              {navigation.map((item) => (
                <li key={item.id}>
                  <span className="depth1">{item.label}</span>
                  {item.submenu && (
                    <ul className="depth_list">
                      {item.submenu.map((subitem, idx) => (
                        <li key={idx}>
                          <Link href={subitem.url}>{subitem.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="btn_aside_res">
              <Link href="/reservation">실시간예약</Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Background Overlay */}
      {isMobileMenuOpen && (
        <div className="aside_bg on" onClick={toggleMobileMenu} />
      )}
    </>
  );
}
