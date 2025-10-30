'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { navigationItems, siteInfo } from '@/lib/config/site';

export default function Footer() {
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <footer className="footer_wrap" role="contentinfo">
        <div className="inner">
          <div className="footer">
            <div className="tel" aria-label="대표 전화번호">
              {siteInfo.contact}
            </div>

            <div className="address" role="region" aria-label="주소 및 사업자 정보">
              <p>{siteInfo.address.road}</p>
              <p>사업자등록번호 {siteInfo.business_info.registration}</p>
              <p>대표 {siteInfo.business_info.representative}</p>
            </div>
          </div>

          <nav className="footer_nav" aria-label="하단 메뉴">
            <ul>
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <span className="footer_nav_title">{item.label}</span>
                  {item.submenu && (
                    <ul>
                      {item.submenu.map((subitem) => (
                        <li key={subitem.url}>
                          <Link href={subitem.url}>{subitem.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="privacy">
            <Link href="/privacy" aria-label="개인정보처리방침 보기">
              개인정보처리방침
            </Link>
          </div>

          <div className="copy" aria-label="저작권 정보">
            Copyright © Design On a Dot. All rights reserved.
          </div>
        </div>
      </footer>

      <div className={showFloatingButton ? 'ft_btn_reserve on' : 'ft_btn_reserve'} aria-label="빠른 예약 버튼">
        <Link
          href="/reservation"
          aria-label="빠른 예약하기"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'var(--color-gold)',
            borderRadius: '50%',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s',
            lineHeight: '1.2',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-gold-dark)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-gold)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          빠른<br />예약
        </Link>
      </div>
    </>
  );
}
