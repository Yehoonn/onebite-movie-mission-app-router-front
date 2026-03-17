# 한입 씨네마 - App Router Ver

App Router 버전으로 구현한 한입 씨네마 프로젝트입니다.  
페이지 라우터와의 매커니즘 차이를 느껴보며 동일한 프로젝트를 다시 구현합니다.

## 0. 백엔드 서버 설정

한입 씨네마 백엔드 서버를 먼저 설정해주세요.

- **저장소**: [onebite-nextjs/challenge__onebite-cinema-server](https://github.com/onebite-nextjs/challenge__onebite-cinema-server)
- **세팅 방법**: 강의 "1.3 실습용 백엔드 서버 세팅하기"와 동일
  1. 새로운 Supabase 프로젝트 생성
  2. Connection String 설정
  3. 백엔드 서버 가동

## Getting Started

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

## 기능 요구사항

### 1) Home 페이지 (`/`)

- **데이터**: 더미가 아닌 **실제 백엔드 서버** 데이터 사용
- **추천 영화**: 랜덤 3개, **3초 주기**로 변경
- **모든 영화**: DB의 모든 영화 표시
- **라우트**: 풀 라우트 캐시 포함 → **Static 페이지**로 설정

### 2) Search 페이지 (`/search?q=검색어`)

- 검색 결과를 **백엔드 서버**에서 불러와 렌더링
- 향후 최적화 적용 예정 → **Dynamic 페이지**로 설정

### 3) Movie 페이지 (`/movie/[영화아이디]`)

- 영화 정보를 **백엔드 서버**에서 불러와 렌더링
- **빠른 응답**: 존재하는 모든 `/movie/[id]` 페이지 캐싱
- **라우트**: 풀 라우트 캐시 포함 → **Static 페이지**로 설정

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
