# Supabase 설정 가이드

OSO Camping BBQ 예약 시스템을 위한 Supabase 프로젝트 설정 가이드입니다.

## 📋 목차
1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [데이터베이스 스키마 적용](#2-데이터베이스-스키마-적용)
3. [환경 변수 설정](#3-환경-변수-설정)
4. [RLS 정책 확인](#4-rls-정책-확인)

---

## 1. Supabase 프로젝트 생성

### 1.1 Supabase 계정 생성
1. https://supabase.com 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인 (권장) 또는 이메일 가입

### 1.2 새 프로젝트 생성
1. Dashboard에서 "New Project" 클릭
2. 프로젝트 정보 입력:
   - **Name**: `oso-camping-bbq`
   - **Database Password**: 강력한 비밀번호 생성 (저장 필수!)
   - **Region**: `Northeast Asia (Seoul)` - 한국 서버 선택
   - **Pricing Plan**: Free tier (시작용) 또는 Pro ($25/월)

3. "Create new project" 클릭
4. 프로젝트 생성 대기 (약 2분 소요)

---

## 2. 데이터베이스 스키마 적용

### 2.1 SQL Editor 접속
1. Supabase Dashboard에서 생성한 프로젝트 선택
2. 좌측 메뉴에서 **"SQL Editor"** 클릭

### 2.2 스키마 SQL 실행
1. "New query" 클릭
2. `supabase/schema.sql` 파일 내용 전체 복사
3. SQL Editor에 붙여넣기
4. **"Run"** 버튼 클릭 (또는 `Ctrl+Enter`)
5. 성공 메시지 확인: "Success. No rows returned"

### 2.3 테이블 확인
1. 좌측 메뉴에서 **"Table Editor"** 클릭
2. 다음 테이블이 생성되었는지 확인:
   - ✅ `reservations` (예약 정보)
   - ✅ `room_availability` (객실 가용성)

---

## 3. 환경 변수 설정

### 3.1 API Keys 확인
1. Supabase Dashboard에서 **"Project Settings"** (톱니바퀴 아이콘) 클릭
2. 좌측 메뉴에서 **"API"** 클릭
3. 다음 정보 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJ...` (공개 키)
   - **service_role key**: `eyJhbGciOiJ...` (비밀 키 - 서버 전용!)

### 3.2 환경 변수 파일 생성
프로젝트 루트에 `.env.local` 파일 생성:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...여기에_anon_public_키_붙여넣기

# Service Role Key (서버 전용 - 절대 클라이언트에 노출 금지!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI...여기에_service_role_키_붙여넣기
```

⚠️ **중요**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

### 3.3 .gitignore 확인
`.gitignore` 파일에 다음이 포함되어 있는지 확인:

```
# Environment variables
.env*.local
.env
```

---

## 4. RLS 정책 확인

### 4.1 RLS 활성화 확인
1. Table Editor에서 `reservations` 테이블 선택
2. 우측 상단 "..." 메뉴 클릭
3. "View Policies" 클릭
4. RLS가 활성화되어 있는지 확인 (🟢 Enabled)

### 4.2 적용된 정책 확인
**reservations 테이블**:
- ✅ `Allow read access to reservations` (SELECT)
- ✅ `Allow insert access to reservations` (INSERT)
- ✅ `Allow update access to own reservations` (UPDATE)

**room_availability 테이블**:
- ✅ `Allow read access to room_availability` (SELECT)
- ✅ `Allow service role to modify room_availability` (ALL)

---

## 5. 데이터베이스 트리거 확인

자동으로 적용된 트리거들:

1. **예약 생성 시 자동으로 날짜 차단**
   - `block_dates_for_reservation()` 함수
   - 예약이 생성되면 해당 날짜를 `room_availability`에서 `available = false`로 설정

2. **예약 취소 시 자동으로 날짜 해제**
   - `unblock_dates_for_cancelled_reservation()` 함수
   - 예약이 취소되면 차단된 날짜를 해제

3. **updated_at 자동 업데이트**
   - 레코드가 수정될 때마다 `updated_at` 필드 자동 갱신

---

## 6. 테스트 쿼리

### 6.1 SQL Editor에서 테스트

**1) 샘플 예약 생성**:
```sql
INSERT INTO reservations (
  room_id, room_name,
  guest_name, guest_email, guest_phone, guest_count,
  check_in, check_out,
  price_per_night, total_price,
  status
) VALUES (
  'private-01', 'Private Room 1',
  '홍길동', 'test@example.com', '010-1234-5678', 4,
  '2025-11-10', '2025-11-12',
  200000, 400000,
  'confirmed'
);
```

**2) 예약 조회**:
```sql
SELECT * FROM reservations ORDER BY created_at DESC LIMIT 10;
```

**3) 객실 가용성 확인**:
```sql
SELECT date, available
FROM room_availability
WHERE room_id = 'private-01'
  AND date >= '2025-11-01'
  AND date <= '2025-11-30'
ORDER BY date;
```

---

## 7. 다음 단계

✅ Supabase 프로젝트 생성 완료
✅ 데이터베이스 스키마 적용 완료
✅ 환경 변수 설정 완료
✅ RLS 정책 확인 완료

**이제 진행할 작업**:
1. ✅ Supabase 클라이언트 라이브러리 설치
2. ⏳ TypeScript 타입 정의
3. ⏳ Supabase 클라이언트 초기화
4. ⏳ API Routes 개발
5. ⏳ 예약 폼 UI 구현

---

## 📞 문제 해결

### 문제: SQL 실행 시 에러 발생
**해결**: 기존 테이블이 있는지 확인하고, `DROP TABLE` 후 재실행

### 문제: RLS 정책이 적용되지 않음
**해결**: SQL Editor에서 정책 부분만 다시 실행

### 문제: 환경 변수가 인식되지 않음
**해결**: 개발 서버 재시작 (`npm run dev` 종료 후 재실행)

---

**작성일**: 2025-10-30
**버전**: 1.0.0
