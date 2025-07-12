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
src/
├── App.jsx                      # 라우터 or Layout을 감싸는 진입점
├── pages/
│   └── Dashboard.jsx           # 대시보드 페이지 (페이지 단위만 담당)
├── layout/
│   ├── AppLayout.jsx           # Header + Sidebar + children
│   ├── Header.jsx
│   └── Sidebar.jsx
├── components/
│   ├── cards/
│   │   ├── NotionCard.jsx
│   │   └── MedalCard.jsx
│   ├── modals/
│   │   ├── NotificationModal.jsx
│   │   ├── MyPostsModal.jsx
│   │   └── CompletedModal.jsx
│   └── MedalDetails.jsx
├── hooks/
│   └── useBodyClass.js         # body class 핸들링
├── constants/
│   └── medals.js               # 메달 관련 데이터/이름/아이콘
├── styles/
│   └── legacy.css
