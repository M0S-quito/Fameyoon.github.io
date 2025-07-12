# Fameyoon.github.io

# 파일구조
```plaintext
client/
├── public/           # 정적 파일 (favicon, images 등)
├── src/
│   ├── assets/       # 이미지, 스타일 등 리소스
│   ├── components/   # 재사용 컴포넌트
│   ├── pages/        # 각 라우트에 대응하는 페이지
│   ├── router/       # React Router 설정
│   ├── store/        # 전역 상태관리 (선택: Zustand, Context)
│   ├── App.jsx       # 전체 앱 구조
│   └── main.jsx      # 앱 진입점 (index.html에 붙음)
```

# 핵심 정리
| 개념     | 설명                                                 |
| ------ | -------------------------------------------------- |
| JSX    | HTML처럼 보이는 JS 문법 (`<div>Hello</div>`)              |
| Props  | 부모 → 자식 컴포넌트로 값 전달                                 |
| State  | 컴포넌트 내부에서 데이터 관리 (`useState`)                      |
| Effect | 사이드 이펙트 처리 (`useEffect`)                           |
| Router | 페이지 이동 기능 (`react-router-dom`)                     |
| 컴포넌트   | 기능 단위로 쪼갠 UI 조각들 (`<Navbar />`, `<LectureCard />`) |

## src폴더
```plaintext
/src
│
├── /assets
│   └── main.css              ← 기존 CSS 전체 복붙
│
├── /components
│   ├── Header.jsx            ← 상단 헤더 (알림 버튼, 프로필 포함)
│   ├── Sidebar.jsx           ← 좌측 사이드바
│   ├── ModalMyPosts.jsx      ← '내가 쓴 글' 모달
│   ├── ModalNotifications.jsx← 알림 모달
│   └── MedalModal.jsx        ← 메달 관련 모달 (optional)
│
├── /hooks
│   └── useSidebar.js         ← 사이드바 토글 상태 훅 (localStorage 연동)
│
├── /pages
│   └── Dashboard.jsx         ← 대시보드 본문 전체
│
├── App.jsx                   ← 루트 컴포넌트
├── main.jsx                  ← 엔트리 (ReactDOM.render 등)
└── index.html                ← Vite용 템플릿 (public 아님!)
```
