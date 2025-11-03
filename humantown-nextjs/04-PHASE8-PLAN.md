# 📋 OSO Camping BBQ - Phase 8 구현 계획

**문서 버전**: 1.0.0
**작성일**: 2025-11-03
**프로젝트**: OSO Camping BBQ 예약 시스템 고도화
**목표**: 이메일 알림, 결제, 관리자 대시보드 등 핵심 예약 기능 완성

---

## 📊 현재 상황 요약

### ✅ 완료된 작업 (Phase 1-7)
- Next.js 16 + TypeScript + Tailwind CSS 4 기반 웹사이트 구축
- 16개 페이지 구현 (홈, 객실, 시설, 예약 등)
- Supabase PostgreSQL 데이터베이스 설계 완료
- 예약 시스템 기본 기능 구현 (폼, API, 날짜 선택)
- E2E 테스트 30+ 작성 (Playwright)
- Vercel 프로덕션 배포 완료

### ⚠️ 미완성 작업 (Phase 8 목표)
- 예약 확인 이메일 발송 시스템
- 결제 게이트웨이 통합
- 관리자 대시보드
- 고객 예약 관리 (수정/취소)
- 실시간 가용성 동기화
- SMS 알림 (선택적)

---

## 🎯 전체 로드맵 개요

| Phase | 작업 내용 | 우선순위 | 예상 소요 | 상태 |
|-------|----------|---------|----------|------|
| **Phase 1** | Supabase 프로덕션 연결 | 🔴 최우선 | 1-2시간 | 🟡 90% |
| **Phase 2** | 이메일 알림 시스템 (Resend) | 🔴 높음 | 1-2일 | ⚪ 0% |
| **Phase 3** | 결제 게이트웨이 (Toss Payments) | 🟡 중간 | 2-3일 | ⚪ 0% |
| **Phase 4** | 관리자 대시보드 | 🟡 중간 | 3-4일 | ⚪ 0% |
| **Phase 5** | 고객 예약 관리 | 🟢 낮음 | 1-2일 | ⚪ 0% |
| **Phase 6** | 실시간 가용성 동기화 | 🟢 낮음 | 1일 | ⚪ 0% |
| **Phase 7** | SMS 알림 (선택적) | 🔵 선택 | 0.5-1일 | ⚪ 0% |
| **Phase 8** | 예약 충돌 처리 고도화 | 🟢 낮음 | 0.5-1일 | ⚪ 0% |

**총 예상 소요 시간**: 15-20일 (1인 풀타임 기준)

---

## 📦 필요 패키지 목록

```bash
# 이메일 발송 (Phase 2)
npm install resend

# 결제 게이트웨이 (Phase 3)
npm install @tosspayments/payment-widget-sdk

# 관리자 대시보드 UI (Phase 4)
npm install recharts @tanstack/react-table

# 캘린더 (Phase 4, 선택적)
npm install react-big-calendar

# SMS (Phase 7, 선택적)
npm install @solapi/nodejs-sdk  # 또는 Twilio SDK
```

---

## ✅ PHASE 1: Supabase 프로덕션 연결 및 검증

**우선순위**: 🔴 최우선
**예상 소요**: 1-2시간
**현재 진행률**: 🟡 90% (대부분 완료, 검증 필요)

### 현재 상태
✅ Supabase 프로젝트 생성 완료
✅ `.env.local`에 프로덕션 키 설정 완료
- URL: `https://cnxnfewptnqtymjizdpj.supabase.co`
- ANON_KEY: 설정됨
- SERVICE_ROLE_KEY: 설정됨

✅ `schema.sql` 작성 완료 (테이블, 트리거, RLS 정책)
✅ Supabase 클라이언트 라이브러리 설정 완료
✅ API Routes 4개 구현 완료
✅ 예약 폼 UI 구현 완료

### 체크리스트

#### 1.1 데이터베이스 스키마 배포 확인
- [ ] Supabase Dashboard 접속 (https://supabase.com/dashboard)
- [ ] 프로젝트 선택: `oso-camping-bbq`
- [ ] SQL Editor에서 `schema.sql` 실행 여부 확인
  - [ ] Table Editor → `reservations` 테이블 존재 확인
  - [ ] Table Editor → `room_availability` 테이블 존재 확인
- [ ] **미실행 시**: SQL Editor에서 `supabase/schema.sql` 전체 복사 후 실행

#### 1.2 RLS 정책 확인
- [ ] `reservations` 테이블 → View Policies
  - [ ] `Allow read access to reservations` (SELECT)
  - [ ] `Allow insert access to reservations` (INSERT)
  - [ ] `Allow update access to own reservations` (UPDATE)
- [ ] `room_availability` 테이블 → View Policies
  - [ ] `Allow read access to room_availability` (SELECT)
  - [ ] `Allow service role to modify room_availability` (ALL)

#### 1.3 데이터베이스 트리거 확인
- [ ] Database → Functions 메뉴에서 함수 존재 확인
  - [ ] `update_updated_at_column()`
  - [ ] `block_dates_for_reservation()`
  - [ ] `unblock_dates_for_cancelled_reservation()`

#### 1.4 로컬 환경 테스트
- [ ] 개발 서버 재시작 (`npm run dev`)
- [ ] 로컬에서 예약 테스트 (http://localhost:3000)
  - [ ] 객실 선택 → "예약하기" 클릭
  - [ ] 날짜 선택 및 폼 작성
  - [ ] 예약 제출 후 성공 페이지 확인
- [ ] Supabase Dashboard → Table Editor → `reservations`에서 데이터 확인
- [ ] `room_availability` 테이블에서 날짜 차단 확인 (available = false)

#### 1.5 Vercel 환경 변수 설정
- [ ] Vercel Dashboard 접속 (https://vercel.com/dashboard)
- [ ] 프로젝트 선택: `oso-v03` (또는 해당 프로젝트명)
- [ ] Settings → Environment Variables
- [ ] **Production** 환경에 변수 추가
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` = `https://cnxnfewptnqtymjizdpj.supabase.co`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (`.env.local`에서 복사)
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` = (`.env.local`에서 복사)
- [ ] **Preview** 환경에도 동일하게 추가
- [ ] 재배포 (Deployments → Latest → Redeploy)

#### 1.6 프로덕션 환경 테스트
- [ ] 프로덕션 URL 접속 (https://oso-v03.vercel.app)
- [ ] 실제 예약 테스트 진행
- [ ] Supabase에 데이터 저장 확인
- [ ] 브라우저 Console에 에러 없는지 확인

#### 1.7 테스트 데이터 정리 (선택적)
- [ ] Supabase SQL Editor에서 테스트 예약 삭제
  ```sql
  DELETE FROM reservations WHERE guest_email LIKE '%test%';
  ```

---

## 📧 PHASE 2: 이메일 알림 시스템 (Resend)

**우선순위**: 🔴 높음
**예상 소요**: 1-2일
**현재 진행률**: ⚪ 0%

### 목표
- 예약 생성 시 고객에게 확인 이메일 발송
- 예약 취소 시 취소 확인 이메일 발송
- 관리자에게 새 예약 알림 이메일 발송

### 체크리스트

#### 2.1 Resend 설정
- [ ] Resend 계정 생성 (https://resend.com)
- [ ] Email Domain 설정 (선택적)
  - [ ] 도메인 소유 확인 (DNS 레코드 추가)
  - [ ] 또는 Resend 기본 도메인 사용 (테스트용)
- [ ] API Key 발급
  - [ ] Dashboard → API Keys → Create API Key
  - [ ] 이름: `OSO Reservation System`
  - [ ] Permission: Full Access
- [ ] API Key 저장

#### 2.2 패키지 설치 및 환경 변수
- [ ] Resend 패키지 설치
  ```bash
  npm install resend
  ```
- [ ] `.env.local`에 추가
  ```env
  RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
  ADMIN_EMAIL=admin@oso-camping.com
  ```
- [ ] Vercel 환경 변수에도 추가

#### 2.3 이메일 템플릿 컴포넌트 생성

##### 2.3.1 예약 확인 이메일 템플릿
- [ ] 파일 생성: `src/components/emails/ReservationConfirmation.tsx`
- [ ] 구현 내용:
  - [ ] Props 인터페이스 정의 (예약 정보)
  - [ ] OSO 로고/브랜딩 추가
  - [ ] 예약 번호 (UUID)
  - [ ] 객실 정보 (이름, 사진)
  - [ ] 날짜 정보 (체크인/체크아웃, 숙박일)
  - [ ] 고객 정보 (이름, 인원수)
  - [ ] 가격 정보 (1박 요금, 총액)
  - [ ] 특별 요청 사항 (있을 경우)
  - [ ] 예약 조회 링크
  - [ ] 취소 정책 안내
  - [ ] 연락처 정보
  - [ ] 반응형 이메일 스타일 (HTML)

##### 2.3.2 예약 취소 이메일 템플릿
- [ ] 파일 생성: `src/components/emails/ReservationCancellation.tsx`
- [ ] 구현 내용:
  - [ ] 취소 확인 메시지
  - [ ] 취소된 예약 정보
  - [ ] 환불 안내 (결제 구현 후)
  - [ ] 고객 서비스 연락처

##### 2.3.3 관리자 알림 이메일 템플릿
- [ ] 파일 생성: `src/components/emails/AdminNewReservation.tsx`
- [ ] 구현 내용:
  - [ ] 새 예약 알림 제목
  - [ ] 예약 전체 정보
  - [ ] 관리자 대시보드 링크 (Phase 4 이후)
  - [ ] 빠른 액션 버튼 (확인/취소)

#### 2.4 이메일 발송 서비스 생성
- [ ] 파일 생성: `src/lib/email/resend.ts`
  ```typescript
  // Resend 클라이언트 초기화
  // sendReservationConfirmationEmail() 함수
  // sendReservationCancellationEmail() 함수
  // sendAdminNotificationEmail() 함수
  ```
- [ ] 에러 핸들링 추가 (재시도 로직)
- [ ] 로깅 추가 (성공/실패 기록)

#### 2.5 API Routes 통합

##### 2.5.1 예약 생성 API 수정
- [ ] 파일: `src/app/api/reservations/create/route.ts`
- [ ] 예약 생성 성공 후 이메일 발송 추가
  ```typescript
  // 1. 고객에게 확인 이메일
  await sendReservationConfirmationEmail(reservation);

  // 2. 관리자에게 알림 이메일
  await sendAdminNotificationEmail(reservation);
  ```
- [ ] 이메일 발송 실패 시 처리
  - [ ] 예약은 유지 (롤백 안 함)
  - [ ] 에러 로그 기록
  - [ ] 응답에 경고 메시지 추가

##### 2.5.2 예약 취소 API 수정
- [ ] 파일: `src/app/api/reservations/[id]/cancel/route.ts`
- [ ] 취소 성공 후 이메일 발송 추가
  ```typescript
  await sendReservationCancellationEmail(reservation);
  ```

#### 2.6 이메일 발송 테스트
- [ ] 로컬 환경에서 테스트 예약 생성
- [ ] 이메일 수신 확인 (실제 이메일 주소 사용)
- [ ] 스팸 폴더 확인
- [ ] 이메일 렌더링 테스트
  - [ ] Gmail
  - [ ] Outlook
  - [ ] Naver Mail
- [ ] 링크 클릭 테스트 (예약 조회 링크)

#### 2.7 에러 처리 및 재시도 로직
- [ ] 이메일 발송 실패 시 재시도 (최대 3회)
- [ ] 실패 시 대체 알림 방법 검토 (SMS, 로그)
- [ ] Resend 대시보드에서 발송 로그 확인

#### 2.8 프로덕션 배포 및 검증
- [ ] 코드 커밋 및 푸시
- [ ] Vercel 자동 배포
- [ ] 프로덕션 환경에서 실제 예약 테스트
- [ ] 이메일 수신 확인

---

## 💳 PHASE 3: 결제 게이트웨이 통합 (Toss Payments)

**우선순위**: 🟡 중간
**예상 소요**: 2-3일
**현재 진행률**: ⚪ 0%

### 목표
- Toss Payments 결제 위젯 통합
- 예약 시 실시간 결제 처리
- 예약 취소 시 환불 처리
- 결제 내역 데이터베이스 저장

### 체크리스트

#### 3.1 Toss Payments 계정 설정
- [ ] Toss Payments 개발자 센터 가입 (https://developers.tosspayments.com)
- [ ] 사업자 정보 등록 (본인 인증 필요)
- [ ] **테스트 환경** API 키 발급
  - [ ] Client Key (클라이언트 키)
  - [ ] Secret Key (시크릿 키)
- [ ] **프로덕션 환경** API 키 발급 (배포 시)

#### 3.2 환경 변수 설정
- [ ] `.env.local`에 추가
  ```env
  # Toss Payments (Test Mode)
  NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_xxxxxxxxx
  TOSS_SECRET_KEY=test_sk_xxxxxxxxx

  # 프로덕션용 (나중에 추가)
  # NEXT_PUBLIC_TOSS_CLIENT_KEY=live_ck_xxxxxxxxx
  # TOSS_SECRET_KEY=live_sk_xxxxxxxxx
  ```
- [ ] Vercel 환경 변수에 추가

#### 3.3 패키지 설치
- [ ] Toss Payments SDK 설치
  ```bash
  npm install @tosspayments/payment-widget-sdk
  ```

#### 3.4 데이터베이스 스키마 확장

##### 3.4.1 payments 테이블 생성
- [ ] 파일 생성: `supabase/schema-payments.sql`
- [ ] SQL 작성:
  ```sql
  CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- 예약 연결
    reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,

    -- Toss Payments 정보
    payment_key VARCHAR(200) UNIQUE,
    order_id VARCHAR(100) UNIQUE NOT NULL,

    -- 결제 금액
    amount INTEGER NOT NULL,

    -- 결제 상태
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
      CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded')),

    -- 결제 수단
    payment_method VARCHAR(50),
    payment_method_type VARCHAR(50),

    -- 카드 정보 (마스킹됨)
    card_company VARCHAR(50),
    card_number VARCHAR(20),

    -- 결제 승인 정보
    approved_at TIMESTAMP WITH TIME ZONE,

    -- 환불 정보
    refunded_at TIMESTAMP WITH TIME ZONE,
    refund_reason TEXT,

    -- 메타데이터
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
  );

  CREATE INDEX idx_payments_reservation_id ON payments(reservation_id);
  CREATE INDEX idx_payments_order_id ON payments(order_id);
  CREATE INDEX idx_payments_status ON payments(status);
  ```
- [ ] Supabase SQL Editor에서 실행

##### 3.4.2 reservations 테이블 수정
- [ ] 컬럼 추가 SQL:
  ```sql
  ALTER TABLE reservations ADD COLUMN payment_id UUID REFERENCES payments(id);
  ALTER TABLE reservations ADD COLUMN payment_status VARCHAR(20) DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'paid', 'refunded'));

  CREATE INDEX idx_reservations_payment_id ON reservations(payment_id);
  CREATE INDEX idx_reservations_payment_status ON reservations(payment_status);
  ```
- [ ] Supabase SQL Editor에서 실행

#### 3.5 TypeScript 타입 정의
- [ ] 파일 수정: `src/types/index.ts`
- [ ] 타입 추가:
  ```typescript
  export interface Payment {
    id: string;
    reservation_id: string;
    payment_key: string | null;
    order_id: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
    payment_method?: string;
    payment_method_type?: string;
    card_company?: string;
    card_number?: string;
    approved_at?: string;
    refunded_at?: string;
    refund_reason?: string;
    created_at: string;
    updated_at: string;
  }

  export interface NewPayment {
    reservation_id: string;
    order_id: string;
    amount: number;
    status: string;
  }
  ```

#### 3.6 결제 위젯 컴포넌트 생성
- [ ] 파일 생성: `src/components/payment/TossPaymentWidget.tsx`
- [ ] 구현:
  - [ ] Toss Payments SDK 초기화
  - [ ] 결제 위젯 렌더링
  - [ ] 결제 금액 표시
  - [ ] 결제 수단 선택 UI (카드, 계좌이체, 간편결제)
  - [ ] "결제하기" 버튼
  - [ ] 로딩 상태 처리
  - [ ] 에러 상태 처리

#### 3.7 예약 폼 멀티 스텝 변경
- [ ] 파일 수정: `src/components/forms/ReservationForm.tsx`
- [ ] 또는 새 파일: `src/components/forms/MultiStepReservationForm.tsx`
- [ ] 구현:
  - [ ] Step 1: 날짜 선택
  - [ ] Step 2: 고객 정보 입력
  - [ ] Step 3: 결제 (TossPaymentWidget 임베드)
  - [ ] 단계 표시 UI (1/3, 2/3, 3/3)
  - [ ] "이전" / "다음" 버튼
  - [ ] 각 단계별 검증

#### 3.8 결제 API 엔드포인트 생성

##### 3.8.1 결제 초기화 API
- [ ] 파일 생성: `src/app/api/payments/initialize/route.ts`
- [ ] 구현:
  ```typescript
  POST /api/payments/initialize
  Body: { reservation_id, amount }
  Response: { order_id, payment_id }
  ```
- [ ] Order ID 생성 (UUID 또는 타임스탬프 기반)
- [ ] `payments` 테이블에 pending 레코드 생성

##### 3.8.2 결제 승인 API
- [ ] 파일 생성: `src/app/api/payments/confirm/route.ts`
- [ ] 구현:
  ```typescript
  POST /api/payments/confirm
  Body: { order_id, payment_key, amount }
  ```
- [ ] Toss API 호출로 결제 승인
  ```typescript
  fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ orderId, amount, paymentKey })
  })
  ```
- [ ] 성공 시:
  - [ ] `payments` 테이블 업데이트 (status = 'completed')
  - [ ] `reservations` 테이블 업데이트 (payment_status = 'paid', status = 'confirmed')
  - [ ] 예약 확인 이메일 발송
- [ ] 실패 시:
  - [ ] `payments` 테이블 업데이트 (status = 'failed')
  - [ ] 에러 메시지 반환

##### 3.8.3 결제 조회 API
- [ ] 파일 생성: `src/app/api/payments/[id]/route.ts`
- [ ] 구현:
  ```typescript
  GET /api/payments/[id]
  Response: Payment 정보
  ```

##### 3.8.4 환불 API
- [ ] 파일 생성: `src/app/api/payments/[id]/refund/route.ts`
- [ ] 구현:
  ```typescript
  POST /api/payments/[id]/refund
  Body: { reason }
  ```
- [ ] Toss API 호출로 환불 요청
  ```typescript
  fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cancelReason: reason })
  })
  ```
- [ ] 성공 시:
  - [ ] `payments` 테이블 업데이트 (status = 'refunded')
  - [ ] `reservations` 테이블 업데이트 (payment_status = 'refunded', status = 'cancelled')
  - [ ] 취소 확인 이메일 발송

#### 3.9 웹훅 엔드포인트 생성
- [ ] 파일 생성: `src/app/api/webhooks/toss/route.ts`
- [ ] 구현:
  ```typescript
  POST /api/webhooks/toss
  Body: Toss Payments 웹훅 이벤트
  ```
- [ ] 이벤트 타입 처리:
  - [ ] `PAYMENT_CONFIRMED`: 결제 승인
  - [ ] `PAYMENT_CANCELLED`: 결제 취소
  - [ ] `REFUND_COMPLETED`: 환불 완료
- [ ] 웹훅 서명 검증
- [ ] 데이터베이스 상태 업데이트

#### 3.10 결제 플로우 통합

##### 3.10.1 예약 페이지 수정
- [ ] 파일: `src/app/rooms/[id]/book/page.tsx`
- [ ] 멀티 스텝 폼 적용
- [ ] 결제 위젯 임베드

##### 3.10.2 결제 성공 페이지
- [ ] 파일 생성: `src/app/rooms/[id]/payment/success/page.tsx`
- [ ] Toss 리다이렉트 후 처리
- [ ] URL 파라미터에서 `paymentKey`, `orderId`, `amount` 추출
- [ ] `/api/payments/confirm` 호출
- [ ] 성공 메시지 표시

##### 3.10.3 결제 실패 페이지
- [ ] 파일 생성: `src/app/rooms/[id]/payment/fail/page.tsx`
- [ ] 실패 사유 표시
- [ ] 재시도 버튼

#### 3.11 예약 취소 플로우에 환불 추가
- [ ] 파일 수정: `src/app/api/reservations/[id]/cancel/route.ts`
- [ ] 결제 상태 확인
- [ ] payment_status = 'paid'인 경우 자동 환불 처리
- [ ] `/api/payments/[id]/refund` 내부 호출

#### 3.12 테스트

##### 3.12.1 테스트 카드로 결제 테스트
- [ ] Toss Payments 테스트 카드 번호 사용
  - 카드 번호: 4000-0000-0000-0004
  - 유효기간: 아무거나
  - CVC: 아무거나
- [ ] 결제 성공 시나리오
- [ ] 결제 실패 시나리오

##### 3.12.2 환불 테스트
- [ ] 결제 완료된 예약 생성
- [ ] 예약 취소 요청
- [ ] 환불 처리 확인
- [ ] Toss Dashboard에서 환불 상태 확인

##### 3.12.3 웹훅 테스트
- [ ] Toss Dashboard에서 웹훅 URL 등록
  - URL: `https://oso-v03.vercel.app/api/webhooks/toss`
- [ ] 웹훅 시뮬레이션
- [ ] 로그 확인

#### 3.13 프로덕션 배포
- [ ] 코드 커밋 및 푸시
- [ ] Vercel 배포
- [ ] 프로덕션 환경에서 테스트 카드로 결제 테스트
- [ ] **실제 카드로 최종 테스트** (소액 결제 권장)

#### 3.14 프로덕션 전환 (실제 운영 시)
- [ ] Toss Payments 실사업자 심사 완료
- [ ] 프로덕션 API 키로 변경
- [ ] 환경 변수 업데이트
- [ ] 재배포 및 최종 검증

---

## 📊 PHASE 4: 관리자 대시보드 생성

**우선순위**: 🟡 중간
**예상 소요**: 3-4일
**현재 진행률**: ⚪ 0%

### 목표
- 관리자 전용 대시보드 구축
- 예약 목록 조회 및 관리
- 캘린더 가용성 시각화
- 통계 및 리포트

### 체크리스트

#### 4.1 인증 시스템 구현

##### 4.1.1 Supabase Auth 활성화
- [ ] Supabase Dashboard → Authentication → Providers
- [ ] Email 인증 활성화
- [ ] "Confirm email" 비활성화 (관리자만 사용)

##### 4.1.2 관리자 계정 생성
- [ ] Supabase Dashboard → Authentication → Users
- [ ] "Add user" 클릭
- [ ] 이메일/비밀번호 설정
  - 예: `admin@oso-camping.com` / `강력한비밀번호`
- [ ] User Metadata에 `role: 'admin'` 추가 (선택적)

##### 4.1.3 로그인 페이지 생성
- [ ] 파일 생성: `src/app/admin/login/page.tsx`
- [ ] 구현:
  - [ ] 이메일/비밀번호 입력 폼
  - [ ] Supabase Auth `signInWithPassword()` 호출
  - [ ] 로그인 성공 시 `/admin` 리다이렉트
  - [ ] 에러 핸들링 (잘못된 비밀번호 등)
  - [ ] 로딩 상태

##### 4.1.4 인증 미들웨어 생성
- [ ] 파일 생성: `src/middleware.ts`
- [ ] 구현:
  ```typescript
  export async function middleware(request: NextRequest) {
    // /admin/** 경로 보호
    if (request.nextUrl.pathname.startsWith('/admin')) {
      const session = await getSession();
      if (!session) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
  }
  ```
- [ ] 세션 확인 헬퍼 함수 생성

##### 4.1.5 로그아웃 기능
- [ ] 로그아웃 버튼 컴포넌트 생성
- [ ] `signOut()` 호출
- [ ] 로그인 페이지로 리다이렉트

#### 4.2 대시보드 레이아웃 생성

##### 4.2.1 관리자 레이아웃
- [ ] 파일 생성: `src/app/admin/layout.tsx`
- [ ] 구현:
  - [ ] 사이드바 네비게이션
    - [ ] 대시보드 홈
    - [ ] 예약 관리
    - [ ] 캘린더
    - [ ] 통계
    - [ ] 설정 (선택적)
  - [ ] 상단 헤더
    - [ ] OSO 로고
    - [ ] 관리자 이름/이메일
    - [ ] 로그아웃 버튼
  - [ ] 모바일 반응형 (햄버거 메뉴)

##### 4.2.2 사이드바 컴포넌트
- [ ] 파일 생성: `src/components/admin/Sidebar.tsx`
- [ ] 네비게이션 아이템 하이라이트 (현재 경로)
- [ ] 아이콘 추가 (선택적)

#### 4.3 대시보드 홈 페이지

##### 4.3.1 대시보드 메인 페이지
- [ ] 파일 생성: `src/app/admin/page.tsx`
- [ ] 구현:
  - [ ] 통계 카드 4개
    - [ ] 오늘의 예약 건수
    - [ ] 이번 주 예약 건수
    - [ ] 이번 달 매출
    - [ ] 전체 예약 건수
  - [ ] 최근 예약 목록 (최근 10건)
  - [ ] 오늘 체크인 예정 목록
  - [ ] 차트 (선택적)

##### 4.3.2 통계 API 생성
- [ ] 파일 생성: `src/app/api/admin/stats/reservations/route.ts`
- [ ] 구현:
  ```typescript
  GET /api/admin/stats/reservations
  Response: {
    today: number,
    thisWeek: number,
    thisMonth: number,
    total: number
  }
  ```
- [ ] SQL 쿼리:
  ```sql
  SELECT COUNT(*) FROM reservations WHERE DATE(check_in) = CURRENT_DATE;
  ```

##### 4.3.3 매출 통계 API
- [ ] 파일 생성: `src/app/api/admin/stats/revenue/route.ts`
- [ ] 구현:
  ```typescript
  GET /api/admin/stats/revenue
  Response: {
    today: number,
    thisWeek: number,
    thisMonth: number,
    total: number
  }
  ```

#### 4.4 예약 관리 페이지

##### 4.4.1 예약 목록 페이지
- [ ] 파일 생성: `src/app/admin/reservations/page.tsx`
- [ ] 구현:
  - [ ] 예약 목록 테이블
    - [ ] 컬럼: 예약번호, 객실, 고객명, 날짜, 인원, 상태, 금액
    - [ ] 정렬 기능 (날짜순, 금액순 등)
    - [ ] 페이지네이션 (10건씩)
  - [ ] 필터링
    - [ ] 날짜 범위 선택
    - [ ] 상태 필터 (pending/confirmed/cancelled/completed)
    - [ ] 객실 필터
  - [ ] 검색
    - [ ] 고객명 검색
    - [ ] 이메일 검색
    - [ ] 전화번호 검색
  - [ ] 액션 버튼
    - [ ] "상세보기" 버튼

##### 4.4.2 예약 목록 API (페이지네이션)
- [ ] 파일 생성: `src/app/api/admin/reservations/route.ts`
- [ ] 구현:
  ```typescript
  GET /api/admin/reservations?page=1&limit=10&status=confirmed
  Response: {
    data: Reservation[],
    total: number,
    page: number,
    totalPages: number
  }
  ```
- [ ] 쿼리 파라미터 처리
- [ ] 필터링 로직

##### 4.4.3 테이블 컴포넌트 (TanStack Table)
- [ ] 패키지 설치
  ```bash
  npm install @tanstack/react-table
  ```
- [ ] 파일 생성: `src/components/admin/ReservationTable.tsx`
- [ ] 컬럼 정의
- [ ] 정렬, 필터링 기능

##### 4.4.4 예약 상세 페이지
- [ ] 파일 생성: `src/app/admin/reservations/[id]/page.tsx`
- [ ] 구현:
  - [ ] 예약 정보 전체 표시
    - [ ] 예약 번호
    - [ ] 객실 정보
    - [ ] 고객 정보
    - [ ] 날짜 정보
    - [ ] 결제 정보
    - [ ] 특별 요청 사항
  - [ ] 상태 변경 드롭다운
    - [ ] pending → confirmed
    - [ ] confirmed → completed
  - [ ] 액션 버튼
    - [ ] "예약 취소" 버튼
    - [ ] "환불" 버튼 (결제된 경우)
  - [ ] 메모 추가 기능 (선택적)
    - [ ] 관리자 전용 메모
    - [ ] 데이터베이스에 저장

##### 4.4.5 상태 변경 API
- [ ] 파일 생성: `src/app/api/admin/reservations/[id]/status/route.ts`
- [ ] 구현:
  ```typescript
  PUT /api/admin/reservations/[id]/status
  Body: { status: 'confirmed' | 'completed' | 'cancelled' }
  ```
- [ ] 상태 변경 로직
- [ ] 이메일 알림 (상태 변경 시)

#### 4.5 캘린더 가용성 관리

##### 4.5.1 캘린더 페이지
- [ ] 파일 생성: `src/app/admin/calendar/page.tsx`
- [ ] 구현:
  - [ ] 월간 캘린더 뷰
  - [ ] 객실 선택 드롭다운
  - [ ] 각 날짜에 예약 현황 표시
    - [ ] 예약됨: 빨간색
    - [ ] 가능: 초록색
    - [ ] 차단됨: 회색
  - [ ] 날짜 클릭 시 상세 정보 모달

##### 4.5.2 캘린더 컴포넌트
- [ ] 옵션 1: react-big-calendar 사용
  ```bash
  npm install react-big-calendar
  ```
- [ ] 옵션 2: 직접 구현 (react-day-picker 기반)
- [ ] 파일 생성: `src/components/admin/AvailabilityCalendar.tsx`

##### 4.5.3 수동 날짜 차단/해제 기능
- [ ] 날짜 선택 (단일 또는 범위)
- [ ] "차단" 버튼
- [ ] "해제" 버튼
- [ ] API 호출로 `room_availability` 업데이트

##### 4.5.4 날짜 차단 API
- [ ] 파일 생성: `src/app/api/admin/availability/block/route.ts`
- [ ] 구현:
  ```typescript
  POST /api/admin/availability/block
  Body: { room_id: string, dates: string[] }
  ```
- [ ] `room_availability` 테이블 업데이트

##### 4.5.5 날짜 해제 API
- [ ] 파일 생성: `src/app/api/admin/availability/unblock/route.ts`
- [ ] 구현:
  ```typescript
  POST /api/admin/availability/unblock
  Body: { room_id: string, dates: string[] }
  ```

#### 4.6 통계 및 리포트

##### 4.6.1 리포트 페이지
- [ ] 파일 생성: `src/app/admin/reports/page.tsx`
- [ ] 구현:
  - [ ] 기간 선택 (이번 주/이번 달/올해)
  - [ ] 차트 표시
    - [ ] 월별 예약 건수 (막대 그래프)
    - [ ] 월별 매출 (선 그래프)
    - [ ] 객실별 점유율 (파이 차트)
  - [ ] 통계 테이블
    - [ ] 가장 인기 있는 객실
    - [ ] 평균 숙박일
    - [ ] 평균 예약 금액

##### 4.6.2 차트 컴포넌트 (Recharts)
- [ ] 패키지 설치
  ```bash
  npm install recharts
  ```
- [ ] 파일 생성: `src/components/admin/charts/ReservationChart.tsx`
- [ ] 파일 생성: `src/components/admin/charts/RevenueChart.tsx`
- [ ] 파일 생성: `src/components/admin/charts/OccupancyChart.tsx`

##### 4.6.3 통계 데이터 API
- [ ] 파일 생성: `src/app/api/admin/reports/reservations-by-month/route.ts`
- [ ] 구현:
  ```sql
  SELECT
    DATE_TRUNC('month', check_in) as month,
    COUNT(*) as count,
    SUM(total_price) as revenue
  FROM reservations
  WHERE created_at >= NOW() - INTERVAL '12 months'
  GROUP BY month
  ORDER BY month;
  ```

##### 4.6.4 객실별 점유율 API
- [ ] 파일 생성: `src/app/api/admin/reports/occupancy-by-room/route.ts`
- [ ] 구현:
  ```typescript
  // 각 객실의 예약일 수 / 전체 일수 * 100
  ```

#### 4.7 객실 관리 (선택적)

##### 4.7.1 객실 목록 페이지
- [ ] 파일 생성: `src/app/admin/rooms/page.tsx`
- [ ] 현재 JSON 파일에서 읽은 객실 정보 표시
- [ ] "수정" 버튼

##### 4.7.2 객실 수정 페이지
- [ ] 파일 생성: `src/app/admin/rooms/[id]/edit/page.tsx`
- [ ] 폼:
  - [ ] 객실명
  - [ ] 가격 (1박 요금)
  - [ ] 최대 인원
  - [ ] 설명
  - [ ] 편의시설 (체크박스)
  - [ ] 이미지 업로드 (선택적)

##### 4.7.3 데이터베이스 마이그레이션 검토
- [ ] JSON 파일 → `rooms` 테이블 이동 검토
- [ ] 장점: 동적 수정 가능
- [ ] 단점: 배포 프로세스 변경

#### 4.8 스타일링 및 UI/UX 개선
- [ ] 일관된 디자인 시스템 적용
- [ ] 로딩 스피너
- [ ] 에러 메시지 표시
- [ ] 성공 토스트 알림
- [ ] 모바일 반응형 확인

#### 4.9 보안 강화
- [ ] 관리자 역할 검증 (middleware)
- [ ] API 엔드포인트에 인증 추가
- [ ] CSRF 보호
- [ ] 세션 타임아웃 설정

#### 4.10 테스트
- [ ] 로그인/로그아웃 테스트
- [ ] 예약 관리 기능 테스트
- [ ] 캘린더 차단/해제 테스트
- [ ] 통계 데이터 정확성 확인
- [ ] 모바일 환경 테스트

#### 4.11 배포
- [ ] 코드 커밋 및 푸시
- [ ] Vercel 배포
- [ ] 프로덕션 환경에서 관리자 로그인 테스트

---

## 🎫 PHASE 5: 고객 예약 관리 기능

**우선순위**: 🟢 낮음
**예상 소요**: 1-2일
**현재 진행률**: ⚪ 0%

### 목표
- 고객이 자신의 예약을 조회할 수 있는 기능
- 예약 수정 기능 (날짜 변경)
- 예약 취소 개선
- 이메일 인증 링크로 안전한 접근

### 체크리스트

#### 5.1 예약 조회 페이지 개선

##### 5.1.1 기존 페이지 수정
- [ ] 파일: `src/app/reservations/check/page.tsx`
- [ ] 기존 구현 확인
- [ ] 조회 방법 선택:
  - [ ] 옵션 1: 예약 번호 + 이메일
  - [ ] 옵션 2: 이메일 + 전화번호
  - [ ] 옵션 3: 이메일 인증 링크 (추천)

##### 5.1.2 조회 폼 구현
- [ ] 예약 번호 입력 필드
- [ ] 이메일 입력 필드
- [ ] "조회하기" 버튼
- [ ] 폼 검증

##### 5.1.3 조회 API
- [ ] 파일 확인: `src/app/api/reservations/[id]/route.ts`
- [ ] 보안 검증 추가:
  ```typescript
  // 예약 ID + 이메일이 일치하는지 확인
  if (reservation.guest_email !== email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  ```

#### 5.2 예약 상세 페이지 (고객용)

##### 5.2.1 상세 페이지 생성
- [ ] 파일 생성: `src/app/reservations/[id]/page.tsx`
- [ ] 구현:
  - [ ] 예약 정보 전체 표시
    - [ ] 예약 번호
    - [ ] 객실 정보 (이름, 사진)
    - [ ] 날짜 정보
    - [ ] 고객 정보
    - [ ] 결제 정보
    - [ ] 특별 요청 사항
  - [ ] 상태 표시
    - [ ] 상태별 색상 배지
  - [ ] 액션 버튼
    - [ ] "날짜 변경" 버튼
    - [ ] "예약 취소" 버튼
    - [ ] "영수증 다운로드" (선택적)

##### 5.2.2 접근 제어
- [ ] URL 파라미터 또는 쿠키로 인증
- [ ] 이메일 매칭 확인
- [ ] 세션 기반 접근 (선택적)

#### 5.3 예약 수정 기능

##### 5.3.1 날짜 변경 페이지
- [ ] 파일 생성: `src/app/reservations/[id]/modify/page.tsx`
- [ ] 구현:
  - [ ] 현재 예약 정보 표시
  - [ ] 새로운 날짜 선택기
    - [ ] 기존 DateRangePicker 재사용
    - [ ] 가용성 확인
  - [ ] 가격 차이 계산 및 표시
    - [ ] 추가 금액 또는 환불 금액
  - [ ] "변경 확인" 버튼

##### 5.3.2 예약 수정 API
- [ ] 파일 생성: `src/app/api/reservations/[id]/modify/route.ts`
- [ ] 구현:
  ```typescript
  PUT /api/reservations/[id]/modify
  Body: {
    new_check_in: string,
    new_check_out: string,
    email: string  // 인증용
  }
  ```
- [ ] 검증:
  - [ ] 이메일 매칭 확인
  - [ ] 새 날짜 가용성 확인
  - [ ] 기존 날짜 차단 해제
  - [ ] 새 날짜 차단
- [ ] 가격 차이 계산
  - [ ] 추가 결제 필요 시 → 결제 페이지로 리다이렉트
  - [ ] 환불 금액 있을 시 → 자동 환불 처리
- [ ] 수정 내역 이메일 발송

##### 5.3.3 추가 결제 처리
- [ ] 가격 인상 시 추가 결제 플로우
- [ ] Toss Payments 결제 위젯 재사용

##### 5.3.4 부분 환불 처리
- [ ] 가격 감소 시 차액 환불
- [ ] Toss API 부분 환불 호출

#### 5.4 예약 취소 개선

##### 5.4.1 취소 확인 모달
- [ ] 파일 생성: `src/components/reservations/CancelConfirmModal.tsx`
- [ ] 구현:
  - [ ] 취소 경고 메시지
  - [ ] 취소 정책 안내
    - [ ] 예: "체크인 3일 전까지 무료 취소"
  - [ ] 환불 금액 표시
  - [ ] 취소 사유 입력 (선택적)
  - [ ] "취소 확인" / "돌아가기" 버튼

##### 5.4.2 취소 정책 로직
- [ ] 취소 정책 정의
  ```typescript
  // 예시
  const cancelPolicy = {
    freeCancellationDays: 3,  // 체크인 3일 전까지 무료
    refundPercentage: {
      '3+': 100,  // 3일 이상 전: 100% 환불
      '1-3': 50,  // 1-3일 전: 50% 환불
      '0-1': 0,   // 당일/1일 전: 환불 없음
    }
  };
  ```
- [ ] 환불 금액 계산 함수

##### 5.4.3 취소 API 개선
- [ ] 파일 수정: `src/app/api/reservations/[id]/cancel/route.ts`
- [ ] 추가 구현:
  - [ ] 이메일 인증 확인
  - [ ] 취소 정책 적용
  - [ ] 환불 금액 계산
  - [ ] 부분 환불 또는 전액 환불 처리
  - [ ] 취소 사유 저장

#### 5.5 이메일 인증 링크

##### 5.5.1 토큰 생성 시스템
- [ ] 파일 생성: `src/lib/auth/generate-token.ts`
- [ ] 구현:
  ```typescript
  // JWT 또는 랜덤 토큰 생성
  // 예약 ID + 이메일 + 만료 시간 포함
  ```
- [ ] 토큰 만료 시간 설정 (24시간 권장)

##### 5.5.2 토큰 저장
- [ ] 옵션 1: 데이터베이스에 저장
  - [ ] `reservation_tokens` 테이블 생성
- [ ] 옵션 2: JWT 사용 (서명된 토큰)

##### 5.5.3 예약 확인 이메일에 링크 추가
- [ ] 파일 수정: `src/components/emails/ReservationConfirmation.tsx`
- [ ] 관리 링크 추가:
  ```html
  <a href="https://oso-v03.vercel.app/reservations/[id]?token={token}">
    예약 관리하기
  </a>
  ```

##### 5.5.4 토큰 검증 미들웨어
- [ ] 파일: `src/app/reservations/[id]/page.tsx`
- [ ] URL에서 `token` 파라미터 추출
- [ ] 토큰 유효성 검증
- [ ] 만료 확인
- [ ] 예약 ID 매칭 확인

#### 5.6 알림 설정 (선택적)

##### 5.6.1 리마인더 이메일
- [ ] 체크인 1일 전 리마인더 이메일 발송
- [ ] Cron Job 또는 Vercel Cron 사용
- [ ] 파일 생성: `src/app/api/cron/send-reminders/route.ts`

##### 5.6.2 예약 후 만족도 조사 (선택적)
- [ ] 체크아웃 후 피드백 이메일
- [ ] 별점 및 리뷰 수집

#### 5.7 UI/UX 개선
- [ ] 반응형 디자인 확인
- [ ] 로딩 상태 표시
- [ ] 성공/에러 메시지
- [ ] 접근성 개선

#### 5.8 테스트
- [ ] 예약 조회 테스트
- [ ] 날짜 변경 테스트 (가격 증가/감소)
- [ ] 취소 정책 테스트
- [ ] 이메일 링크 클릭 테스트
- [ ] 토큰 만료 시나리오 테스트

#### 5.9 배포
- [ ] 코드 커밋 및 푸시
- [ ] Vercel 배포
- [ ] 프로덕션 환경 테스트

---

## ⚡ PHASE 6: 실시간 가용성 동기화

**우선순위**: 🟢 낮음
**예상 소요**: 1일
**현재 진행률**: ⚪ 0%

### 목표
- Supabase Realtime으로 실시간 가용성 업데이트
- 동시 예약 충돌 방지
- 사용자에게 실시간 피드백 제공

### 체크리스트

#### 6.1 Supabase Realtime 활성화

##### 6.1.1 Realtime 설정
- [ ] Supabase Dashboard → Settings → API
- [ ] Realtime 기능 활성화 확인
- [ ] `room_availability` 테이블에 Realtime 활성화
  - [ ] Table Editor → room_availability → ... → Enable Realtime

##### 6.1.2 RLS 정책 확인
- [ ] Realtime에서도 RLS 정책이 적용되는지 확인

#### 6.2 클라이언트 구독 설정

##### 6.2.1 커스텀 훅 생성
- [ ] 파일 생성: `src/hooks/useRoomAvailability.ts`
- [ ] 구현:
  ```typescript
  export function useRoomAvailability(roomId: string) {
    const [availability, setAvailability] = useState<AvailabilityMap>({});

    useEffect(() => {
      // Supabase Realtime 구독
      const subscription = supabase
        .channel(`room:${roomId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'room_availability',
            filter: `room_id=eq.${roomId}`
          },
          (payload) => {
            // 가용성 업데이트
            handleAvailabilityChange(payload);
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }, [roomId]);

    return availability;
  }
  ```

##### 6.2.2 예약 폼에 훅 통합
- [ ] 파일 수정: `src/components/forms/ReservationForm.tsx`
- [ ] `useRoomAvailability()` 훅 사용
- [ ] 가용성 변경 시 날짜 선택기 업데이트

#### 6.3 동시성 제어

##### 6.3.1 낙관적 잠금 구현
- [ ] 파일 수정: `src/app/api/reservations/create/route.ts`
- [ ] 예약 생성 직전 가용성 재확인
- [ ] 타임스탬프 기반 충돌 감지

##### 6.3.2 데이터베이스 트랜잭션
- [ ] Supabase 트랜잭션 사용 (가능하다면)
- [ ] 또는 `SELECT ... FOR UPDATE` 사용

#### 6.4 실시간 피드백

##### 6.4.1 예약 진행 중 알림
- [ ] 날짜가 차단되었을 때 즉시 사용자에게 알림
- [ ] "다른 고객이 방금 예약했습니다" 메시지 표시
- [ ] 대체 날짜 제안

##### 6.4.2 날짜 선택기 자동 업데이트
- [ ] 차단된 날짜 실시간 비활성화
- [ ] 시각적 피드백 (색상 변경)

#### 6.5 테스트

##### 6.5.1 동시 예약 테스트
- [ ] 두 개의 브라우저/시크릿 모드 창 열기
- [ ] 동일한 객실, 동일한 날짜 선택
- [ ] 동시에 "예약하기" 클릭
- [ ] 한 쪽만 성공하고 다른 쪽은 실패하는지 확인

##### 6.5.2 Realtime 구독 테스트
- [ ] 예약 폼 열어두기
- [ ] 다른 브라우저에서 예약 생성
- [ ] 첫 번째 브라우저에서 날짜 자동 비활성화 확인

#### 6.6 성능 최적화
- [ ] 구독 범위 최소화 (특정 객실만)
- [ ] 디바운싱 (빠른 업데이트 처리)
- [ ] 메모이제이션

#### 6.7 배포
- [ ] 코드 커밋 및 푸시
- [ ] Vercel 배포
- [ ] 프로덕션 테스트

---

## 📱 PHASE 7: SMS 알림 (선택적)

**우선순위**: 🔵 선택적
**예상 소요**: 0.5-1일
**현재 진행률**: ⚪ 0%

### 목표
- 예약 확인 SMS 발송
- 예약 취소 SMS 발송
- 체크인 리마인더 SMS (선택적)

### 체크리스트

#### 7.1 SMS 서비스 선택

##### 7.1.1 서비스 비교
- [ ] **네이버 클라우드 SMS** (국내 추천)
  - 장점: 한국 서비스, 저렴, 안정적
  - 단점: 한국 전화번호만
- [ ] **솔라피 (SOLAPI)**
  - 장점: 한국 특화, API 간편
  - 단점: 비용
- [ ] **Twilio**
  - 장점: 글로벌, 기능 많음
  - 단점: 한국 SMS 비싸고 느림

##### 7.1.2 서비스 가입 및 설정
- [ ] 선택한 서비스 가입
- [ ] 발신번호 등록 (본인 인증 필요)
- [ ] API 키 발급

#### 7.2 환경 변수 설정
- [ ] `.env.local`에 추가
  ```env
  # SMS (네이버 클라우드 예시)
  NCLOUD_SMS_ACCESS_KEY=xxxxxxxxx
  NCLOUD_SMS_SECRET_KEY=xxxxxxxxx
  NCLOUD_SMS_SERVICE_ID=ncp:sms:kr:xxxxx
  NCLOUD_SMS_SENDER_PHONE=010-XXXX-XXXX
  ```
- [ ] Vercel 환경 변수에 추가

#### 7.3 패키지 설치
- [ ] 네이버 클라우드 SDK (예시)
  ```bash
  npm install @solapi/nodejs-sdk
  ```
- [ ] 또는 직접 HTTP 요청 구현

#### 7.4 SMS 템플릿 생성

##### 7.4.1 예약 확인 SMS
- [ ] 파일 생성: `src/lib/sms/templates.ts`
- [ ] 템플릿 작성 (180자 이내):
  ```
  [OSO Camping] 예약이 확인되었습니다.
  객실: {room_name}
  날짜: {check_in} ~ {check_out}
  예약번호: {reservation_id}
  ```

##### 7.4.2 예약 취소 SMS
- [ ] 템플릿 작성:
  ```
  [OSO Camping] 예약이 취소되었습니다.
  예약번호: {reservation_id}
  환불 금액: {refund_amount}원
  ```

##### 7.4.3 체크인 리마인더 SMS
- [ ] 템플릿 작성:
  ```
  [OSO Camping] 내일 체크인 예정입니다.
  객실: {room_name}
  체크인 시간: 15:00
  문의: 010-XXXX-XXXX
  ```

#### 7.5 SMS 발송 서비스 생성
- [ ] 파일 생성: `src/lib/sms/send-sms.ts`
- [ ] 함수 구현:
  ```typescript
  export async function sendReservationSMS(
    phoneNumber: string,
    reservation: Reservation
  ) {
    // 전화번호 포맷 검증 (010-XXXX-XXXX)
    // SMS API 호출
    // 에러 핸들링
  }
  ```

##### 7.5.1 전화번호 포맷 검증
- [ ] 한국 전화번호 정규식 검증
  ```typescript
  const phoneRegex = /^010-\d{4}-\d{4}$/;
  ```

#### 7.6 API Routes 통합

##### 7.6.1 예약 생성 시 SMS 발송
- [ ] 파일 수정: `src/app/api/reservations/create/route.ts`
- [ ] 이메일 발송 후 SMS 발송 추가
  ```typescript
  try {
    await sendReservationSMS(reservation.guest_phone, reservation);
  } catch (error) {
    console.error('SMS 발송 실패:', error);
    // 이메일로 대체
  }
  ```

##### 7.6.2 예약 취소 시 SMS 발송
- [ ] 파일 수정: `src/app/api/reservations/[id]/cancel/route.ts`
- [ ] SMS 발송 추가

#### 7.7 이메일 Fallback
- [ ] SMS 발송 실패 시 이메일로 대체
- [ ] 로그 기록

#### 7.8 비용 모니터링

##### 7.8.1 발송 횟수 로깅
- [ ] 파일 생성: `src/lib/sms/logger.ts`
- [ ] 발송 성공/실패 로그 저장
- [ ] 일별 발송 건수 카운트

##### 7.8.2 월별 비용 추적 (선택적)
- [ ] SMS 발송 비용 계산
- [ ] 관리자 대시보드에 통계 표시

#### 7.9 Cron Job으로 리마인더 발송 (선택적)

##### 7.9.1 Vercel Cron 설정
- [ ] 파일 생성: `vercel.json`
  ```json
  {
    "crons": [
      {
        "path": "/api/cron/send-reminders",
        "schedule": "0 10 * * *"
      }
    ]
  }
  ```

##### 7.9.2 리마인더 API
- [ ] 파일 생성: `src/app/api/cron/send-reminders/route.ts`
- [ ] 내일 체크인 예정인 예약 조회
- [ ] SMS 발송

#### 7.10 테스트
- [ ] 로컬에서 테스트 전화번호로 발송
- [ ] 실제 전화번호로 수신 확인
- [ ] SMS 내용 확인
- [ ] 링크 클릭 테스트 (있을 경우)

#### 7.11 배포
- [ ] 코드 커밋 및 푸시
- [ ] Vercel 배포
- [ ] 프로덕션 환경 테스트

---

## ⚡ PHASE 8: 예약 충돌 처리 고도화

**우선순위**: 🟢 낮음
**예상 소요**: 0.5-1일
**현재 진행률**: ⚪ 0%

### 목표
- 동시 예약 요청 충돌 방지
- 데이터베이스 레벨 제약 조건 강화
- API 레이스 컨디션 방지
- 사용자 경험 개선

### 체크리스트

#### 8.1 데이터베이스 레벨 제약 조건

##### 8.1.1 고유 인덱스 추가
- [ ] 파일 수정: `supabase/schema.sql` (또는 새 마이그레이션)
- [ ] 이미 존재: `CONSTRAINT unique_room_date UNIQUE (room_id, date)`
- [ ] 확인만 하면 됨

##### 8.1.2 트랜잭션 격리 수준 조정
- [ ] PostgreSQL 격리 수준 확인
- [ ] `SERIALIZABLE` 또는 `REPEATABLE READ` 사용 검토

#### 8.2 API 레이스 컨디션 방지

##### 8.2.1 비관적 잠금 추가
- [ ] 파일 수정: `src/app/api/reservations/create/route.ts`
- [ ] `SELECT ... FOR UPDATE` 사용
  ```typescript
  const { data: availabilityLock } = await supabaseAdmin
    .from('room_availability')
    .select('*')
    .eq('room_id', roomId)
    .gte('date', checkIn)
    .lt('date', checkOut)
    .eq('available', true)
    // .forUpdate()  // Supabase가 지원하는지 확인
  ```

##### 8.2.2 Atomic 연산 사용
- [ ] 가용성 확인과 예약 생성을 하나의 트랜잭션으로
- [ ] Supabase RPC 함수 사용 검토

#### 8.3 낙관적 동시성 제어

##### 8.3.1 버전 번호 추가
- [ ] `room_availability` 테이블에 `version` 컬럼 추가
  ```sql
  ALTER TABLE room_availability ADD COLUMN version INTEGER DEFAULT 1;
  ```
- [ ] 업데이트 시 버전 확인
  ```sql
  UPDATE room_availability
  SET available = false, version = version + 1
  WHERE room_id = $1 AND date = $2 AND version = $3;
  ```

#### 8.4 사용자 피드백 개선

##### 8.4.1 실시간 가용성 표시
- [ ] 날짜 선택 시 즉시 가용성 확인
- [ ] "현재 예약 가능" 배지 표시
- [ ] "방금 예약됨" 경고 표시

##### 8.4.2 충돌 발생 시 대체 날짜 제안
- [ ] 충돌 시 가까운 날짜 검색
  ```typescript
  // 체크인 날짜 ±3일 이내 가용한 날짜
  ```
- [ ] 대체 날짜 목록 표시
- [ ] "이 날짜로 변경" 버튼

#### 8.5 재시도 로직

##### 8.5.1 클라이언트 측 재시도
- [ ] 파일 수정: `src/components/forms/ReservationForm.tsx`
- [ ] 409 Conflict 에러 시 자동 재시도 (최대 3회)
- [ ] 지수 백오프 (exponential backoff)
  ```typescript
  const delay = Math.min(1000 * 2 ** retryCount, 10000);
  ```

##### 8.5.2 진행 상황 표시
- [ ] "예약 처리 중..." 로딩 메시지
- [ ] "재시도 중... (1/3)" 메시지
- [ ] 프로그레스 바

#### 8.6 에러 핸들링 개선

##### 8.6.1 구체적인 에러 메시지
- [ ] 충돌 시:
  ```
  "죄송합니다. 선택하신 날짜에 다른 고객이 먼저 예약했습니다.
  다른 날짜를 선택해주세요."
  ```
- [ ] 데이터베이스 에러 시:
  ```
  "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
  ```

##### 8.6.2 에러 로깅
- [ ] 파일 생성: `src/lib/logger.ts`
- [ ] 충돌 발생 횟수 기록
- [ ] Sentry 또는 LogRocket 통합 (선택적)

#### 8.7 모니터링 및 알림

##### 8.7.1 충돌 빈도 모니터링
- [ ] 충돌 발생 횟수 카운트
- [ ] 관리자 대시보드에 표시
- [ ] 임계값 초과 시 알림

##### 8.7.2 성능 모니터링
- [ ] API 응답 시간 추적
- [ ] 느린 쿼리 식별

#### 8.8 부하 테스트 (선택적)

##### 8.8.1 동시 요청 시뮬레이션
- [ ] 테스트 도구 사용 (Apache JMeter, Artillery 등)
- [ ] 100명이 동시에 같은 날짜 예약 시도
- [ ] 충돌 처리 확인

#### 8.9 문서화
- [ ] 충돌 처리 로직 문서화
- [ ] API 에러 코드 정의
- [ ] 재시도 정책 문서화

#### 8.10 테스트
- [ ] 동시 예약 테스트
- [ ] 재시도 로직 테스트
- [ ] 대체 날짜 제안 테스트
- [ ] 에러 메시지 확인

#### 8.11 배포
- [ ] 코드 커밋 및 푸시
- [ ] Vercel 배포
- [ ] 프로덕션 환경 부하 테스트 (조심스럽게)

---

## 📅 구현 일정 (권장)

### Week 1: 기반 구축
| 날짜 | Phase | 작업 내용 | 소요 시간 |
|-----|-------|---------|----------|
| Day 1 | Phase 1 | Supabase 검증 및 확인 | 2시간 |
| Day 2-3 | Phase 2 | 이메일 알림 시스템 구현 | 1.5일 |
| Day 4-5 | Phase 2 | 이메일 테스트 및 배포 | 0.5일 |

### Week 2: 결제 시스템
| 날짜 | Phase | 작업 내용 | 소요 시간 |
|-----|-------|---------|----------|
| Day 6-7 | Phase 3 | Toss Payments 설정 및 DB 스키마 | 2일 |
| Day 8-9 | Phase 3 | 결제 위젯 및 API 구현 | 2일 |
| Day 10 | Phase 3 | 결제 테스트 및 배포 | 1일 |

### Week 3-4: 관리 기능
| 날짜 | Phase | 작업 내용 | 소요 시간 |
|-----|-------|---------|----------|
| Day 11-12 | Phase 4 | 관리자 인증 및 레이아웃 | 2일 |
| Day 13-14 | Phase 4 | 예약 관리 페이지 | 2일 |
| Day 15-16 | Phase 4 | 캘린더 및 통계 | 2일 |
| Day 17-18 | Phase 5 | 고객 예약 관리 | 2일 |
| Day 19 | Phase 6 | 실시간 가용성 동기화 | 1일 |

### Week 5: 고급 기능 (선택적)
| 날짜 | Phase | 작업 내용 | 소요 시간 |
|-----|-------|---------|----------|
| Day 20 | Phase 7 | SMS 알림 (선택적) | 0.5-1일 |
| Day 21 | Phase 8 | 예약 충돌 처리 고도화 | 0.5-1일 |
| Day 22 | - | 버그 수정 및 최종 테스트 | 1일 |

**총 예상 소요**: 15-22일 (1인 풀타임 기준)

---

## 🔑 핵심 포인트 및 주의사항

### 1. 우선순위 준수
- **Phase 1 (Supabase 검증)을 가장 먼저 완료**해야 나머지 작업 진행 가능
- Phase 2 (이메일)와 Phase 3 (결제)는 독립적이므로 **병렬 작업 가능** (팀 작업 시)
- Phase 4 (관리자 대시보드)는 결제 구현 후 진행 권장

### 2. 테스트 철저히
- 각 Phase 완료 후 반드시 **로컬 + 프로덕션 테스트**
- 결제 기능은 **테스트 환경에서 충분히 검증** 후 프로덕션 전환
- E2E 테스트 추가 작성 권장

### 3. 보안
- API 엔드포인트에 **적절한 인증/인가** 추가
- `.env.local` 파일 **절대 커밋 금지**
- Toss Secret Key, Supabase Service Role Key **절대 클라이언트 노출 금지**

### 4. 에러 핸들링
- 모든 API 호출에 **try-catch** 추가
- 사용자에게 **친절한 에러 메시지** 표시
- 에러 로그 **서버에 기록**

### 5. 성능
- 데이터베이스 쿼리 **인덱스 활용**
- 불필요한 API 호출 **최소화**
- 이미지 최적화 (Next.js Image 컴포넌트 사용)

### 6. 사용자 경험
- **로딩 상태** 명확히 표시
- **성공/실패 피드백** 즉시 제공
- **모바일 환경** 항상 고려

### 7. 배포
- 환경 변수 **Vercel에 설정** 필수
- 배포 후 **Vercel 로그** 확인
- **단계적 배포** (개발 → 프리뷰 → 프로덕션)

---

## 📞 문제 해결 가이드

### Supabase 연결 오류
- `.env.local` 파일 존재 확인
- 환경 변수 이름 정확한지 확인 (`NEXT_PUBLIC_` 접두사)
- 개발 서버 재시작

### 이메일 발송 실패
- Resend API 키 확인
- 이메일 도메인 인증 확인 (프로덕션)
- 스팸 폴더 확인

### 결제 오류
- Toss API 키 테스트/프로덕션 구분 확인
- 웹훅 URL HTTPS 사용 확인
- Toss Dashboard 로그 확인

### 관리자 로그인 안 됨
- Supabase Auth 활성화 확인
- 관리자 계정 생성 확인
- 세션 쿠키 확인

---

## 📚 참고 문서

### 공식 문서
- [Next.js 16 문서](https://nextjs.org/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Toss Payments 문서](https://docs.tosspayments.com)
- [Resend 문서](https://resend.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [TanStack Table](https://tanstack.com/table/latest)
- [Recharts](https://recharts.org)

### 프로젝트 내부 문서
- `supabase/SETUP.md` - Supabase 설정 가이드
- `supabase/schema.sql` - 데이터베이스 스키마
- `README.md` - 프로젝트 개요

---

## ✅ 체크리스트 요약

### 필수 작업 (우선순위 높음)
- [ ] Phase 1: Supabase 검증 및 프로덕션 연결
- [ ] Phase 2: 이메일 알림 시스템
- [ ] Phase 3: 결제 게이트웨이
- [ ] Phase 4: 관리자 대시보드

### 권장 작업 (우선순위 중간)
- [ ] Phase 5: 고객 예약 관리
- [ ] Phase 6: 실시간 가용성 동기화

### 선택적 작업 (우선순위 낮음)
- [ ] Phase 7: SMS 알림
- [ ] Phase 8: 예약 충돌 처리 고도화

---

**문서 끝**

*이 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*
*최종 수정일: 2025-11-03*
