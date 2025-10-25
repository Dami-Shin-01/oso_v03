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
      { label: '소개', url: '/about' },
      { label: '외관보기', url: '/view' },
    ],
  },
  {
    id: 'rooms',
    label: 'ROOMS',
    submenu: [{ label: '공간 목록', url: '/rooms' }],
  },
  {
    id: 'special',
    label: 'SPECIAL',
    submenu: [
      { label: '물놀이장', url: '/special/swimming-pool' },
      { label: '바베큐', url: '/special/barbecue' },
      { label: '잔디광장', url: '/special/sports' },
      { label: '카페', url: '/special/cafe' },
      { label: '식당', url: '/special/trail' },
      { label: '키즈존', url: '/special/playground' },
    ],
  },
  {
    id: 'reserve',
    label: 'RESERVE',
    submenu: [{ label: '예약안내', url: '/reservation' }],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
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
    setOpenMobileSubmenu(null);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setOpenMobileSubmenu(null);
    }
  };

  const toggleMobileSubmenu = (menuId: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === menuId ? null : menuId);
  };

  // Keyboard support for mobile menu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'on' : ''}`} role="banner">
        <div className="hd_cont">
          <div className={`hd_inner ${isScrolled ? 'scrolled' : ''}`}>
            {/* Logo - Transitions from center to left on scroll */}
            <h1 className="logo">
              <Link href="/" aria-label="오소캠핑바베큐 홈">
                OSO CAMPING BBQ
              </Link>
            </h1>

            {/* Desktop Navigation */}
            <nav
              className="hd_lnb hidden lg:block"
              aria-label="메인 메뉴"
            >
              <ul className="hd_lnb01">
                {navigation.slice(0, 3).map((item) => (
                  <li
                    key={item.id}
                    className="depth1"
                    onMouseEnter={() => setActiveDropdown(item.id)}
                  >
                    <span className="depth1_a" role="button" aria-haspopup={!!item.submenu} aria-expanded={activeDropdown === item.id}>{item.label}</span>
                    {item.submenu && (
                      <div className={`depth_box ${activeDropdown === item.id ? 'on' : ''}`} role="menu">
                        <ul>
                          {item.submenu.map((subitem, idx) => (
                            <li key={idx} role="none">
                              <Link href={subitem.url} role="menuitem">{subitem.label}</Link>
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
                  >
                    <span className="depth1_a" role="button" aria-haspopup={!!item.submenu} aria-expanded={activeDropdown === item.id}>{item.label}</span>
                    {item.submenu && (
                      <div className={`depth_box ${activeDropdown === item.id ? 'on' : ''}`} role="menu">
                        <ul>
                          {item.submenu.map((subitem, idx) => (
                            <li key={idx} role="none">
                              <Link href={subitem.url} role="menuitem">{subitem.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div
                className={`hd_lnb_bg ${activeDropdown ? 'on' : ''}`}
                onMouseLeave={() => setActiveDropdown(null)}
              />
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="btn_menu lg:hidden"
              onClick={toggleMobileMenu}
              onKeyDown={handleKeyDown}
              aria-label="메뉴 열기"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
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
      <aside className={`aside ${isMobileMenuOpen ? 'on' : ''}`} id="mobile-menu" aria-label="모바일 메뉴">
        <div className="aisde_inner">
          <div className="aside_box">
            <button
              className="btn_close"
              onClick={toggleMobileMenu}
              onKeyDown={handleKeyDown}
              aria-label="메뉴 닫기"
            />

            <ul role="navigation" aria-label="메인 메뉴">
              {navigation.map((item) => (
                <li key={item.id}>
                  <span
                    className="depth1"
                    role="button"
                    aria-haspopup={!!item.submenu}
                    aria-expanded={openMobileSubmenu === item.id}
                    onClick={() => item.submenu && toggleMobileSubmenu(item.id)}
                    style={{ cursor: item.submenu ? 'pointer' : 'default' }}
                  >
                    {item.label}
                  </span>
                  {item.submenu && (
                    <ul className={`depth_list ${openMobileSubmenu === item.id ? 'on' : ''}`} role="menu">
                      {item.submenu.map((subitem, idx) => (
                        <li key={idx} role="none">
                          <Link href={subitem.url} role="menuitem">{subitem.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
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
