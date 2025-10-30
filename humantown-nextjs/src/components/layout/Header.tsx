'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationItems, siteInfo } from '@/lib/config/site';
import type { NavigationItem } from '@/types';

function splitNavigation(items: NavigationItem[]) {
  return {
    primary: items.slice(0, 3),
    secondary: items.slice(3),
  } as const;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const { primary, secondary } = useMemo(() => splitNavigation(navigationItems), []);

  const headerClass = isScrolled ? 'header on' : 'header';
  const innerClass = isScrolled ? 'hd_inner scrolled' : 'hd_inner';
  const homeAriaLabel = siteInfo.site_name + ' 홈';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  }, [pathname]);

  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);
    if (nextState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setOpenMobileSubmenu(null);
    }
  };

  const toggleMobileSubmenu = (menuId: string) => {
    setOpenMobileSubmenu((current) => (current === menuId ? null : menuId));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const renderDesktopList = (items: NavigationItem[]) => (
    <ul className="hd_lnb_list">
      {items.map((item) => {
        const isActive = activeDropdown === item.id;
        const depthBoxClass = isActive ? 'depth_box on' : 'depth_box';
        return (
          <li
            key={item.id}
            className="depth1"
            onMouseEnter={() => setActiveDropdown(item.id)}
          >
            <span
              className="depth1_a"
              role="button"
              aria-haspopup={!!item.submenu}
              aria-expanded={isActive}
            >
              {item.label}
            </span>
            {item.submenu && (
              <div className={depthBoxClass} role="menu">
                <ul>
                  {item.submenu.map((subitem) => (
                    <li key={subitem.url} role="none">
                      <Link href={subitem.url} role="menuitem">
                        {subitem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  const asideClass = isMobileMenuOpen ? 'aside on' : 'aside';

  return (
    <>
      <header className={headerClass} role="banner">
        <div className="hd_cont">
          <div className={innerClass}>
            <h1 className="logo">
              <Link href="/" aria-label={homeAriaLabel}>
                OSO CAMPING BBQ
              </Link>
            </h1>

            <nav className="hd_lnb hidden lg:block" aria-label="메인 메뉴">
              <div className="hd_lnb01">{renderDesktopList(primary)}</div>
              <div className="hd_lnb02">{renderDesktopList(secondary)}</div>

              <div
                className={activeDropdown ? 'hd_lnb_bg on' : 'hd_lnb_bg'}
                onMouseLeave={() => setActiveDropdown(null)}
              />
            </nav>

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

      <aside className={asideClass} id="mobile-menu" aria-label="모바일 메뉴">
        <div className="aisde_inner">
          <div className="aside_box">
            <button
              className="btn_close"
              onClick={toggleMobileMenu}
              onKeyDown={handleKeyDown}
              aria-label="메뉴 닫기"
            />

            <ul role="navigation" aria-label="메인 메뉴">
              {navigationItems.map((item) => {
                const isOpen = openMobileSubmenu === item.id;
                const depthListClass = isOpen ? 'depth_list on' : 'depth_list';
                return (
                  <li key={item.id}>
                    <span
                      className="depth1"
                      role="button"
                      aria-haspopup={!!item.submenu}
                      aria-expanded={isOpen}
                      onClick={() => item.submenu && toggleMobileSubmenu(item.id)}
                      style={{ cursor: item.submenu ? 'pointer' : 'default' }}
                    >
                      {item.label}
                    </span>
                    {item.submenu && (
                      <ul className={depthListClass} role="menu">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.url} role="none">
                            <Link href={subitem.url} role="menuitem">
                              {subitem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && <div className="aside_bg on" onClick={toggleMobileMenu} />}
    </>
  );
}
