'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
      <footer className="footer_wrap">
        <div className="inner">
          <div className="footer">
            {/* Phone Number */}
            <div className="tel">T.1833-9306</div>

            {/* Address Information */}
            <div className="address">
              <p>경기 가평군 가평읍 북한강변로 882 (이화리 23-2)</p>
              <p>사업자등록번호: 132-81-12613</p>
              <p>대표: 홍순옥</p>
            </div>
          </div>

          {/* Privacy Policy Link */}
          <div className="privacy">
            <Link href="/privacy">개인정보처리방침</Link>
          </div>

          {/* Copyright */}
          <div className="copy">
            Copyright © Humantown Pension. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Reservation Button */}
      <div className={`ft_btn_reserve ${showFloatingButton ? 'on' : ''}`}>
        <Link
          href="/reservation"
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
          실시간<br />예약
        </Link>
      </div>
    </>
  );
}
