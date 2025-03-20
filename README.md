# 🖥️ Blog-FE-ItoR

<br>

## 🎯 미션 요구사항

1. 미션 진행 방법을 꼭 읽고 진행해주세요
   [미션 진행 방법](https://www.notion.so/46dbd9440a4f4d5e97228011dff70f5a?pvs=21)
2. 아래 요구사항을 꼭 지켜 개발해 주세요
- useRef, useMemo, useCallback를 불필요하게 사용하지 않는 습관 만들기
- Atomic Design 패턴 적용하기 - 컴포넌트를 명확히 분리하고, 재사용성 극대화
- React Query + Axios Interceptor 활용
- 이미지 최적화 하기
- Lighthouse 점수 90점 이상 유지하기
- 반응형 디자인 구현
- Dynamic Import + Lazy Loading 적용

<br>

## 🎨 Blog UI 요구사항

Figma : https://www.figma.com/team_invite/redeem/DjdTfdfKC0X3ImzDcw0wbi
해당 링크로 접속하신 후, 개발 교육용 UI를 보시면 됩니다.

<br>

## 💡 공통 요구사항

- 공통 컴포넌트 / UI 컴포넌트 / 페이지 별 필요한 컴포넌트로 모듈화 하여 작업합니다.
- Error, Success 상태를 관리하고, 상태에 따른 결과를 사용자에게 UI로 보여 주셔야 합니다.
- 모든 방식에는 근거가 있어야 합니다. 왜 해당 방식을 / 기능을 선택하였는지 문서화 하여 매주 미션 PR에 남겨주세요.

## ⚙️ 기능 요구사항

백엔드 스웨거 : http://3.37.173.32:8080/swagger-ui/index.html#/

<br>

###  회원가입

- 사용자는 이메일 주소 또는 카카오 OAuth를 통해 회원가입을 진행할 수 있어야 합니다.
- 사용자는 비밀번호를 생성하여 회원가입을 진행할 수 있어야 합니다.
- 사용자는 프로필사진을 등록하며 회원가입을 진행할 수 있어야합니다.
- 사용자가 입력한 이메일 주소와 닉네임은 시스템에 이미 등록되어 있지 않아야 합니다.

### 로그인

- 사용자는 등록한 이메일 주소 또는 카카오 로그인을 이용하여 로그인할 수 있어야 합니다.
- (토큰 방식으로 구현시) refresh token을 통해 새로운 access token을 발급받을 수 있어야 합니다.
- 토큰은 브라우저에 cookie / storage 중 원하는 방식을 골라 선택하신 후 저장 해 두셔야 합니다.
  

### 게시물

- 사용자는 로그인을 하지 않고도 게시물을 조회할 수 있어야 합니다.
- 사용자는 로그인을 진행해야 게시물을 작성할 수 있어야 합니다.
- 사용자는 자신의 게시물만 수정, 삭제할 수 있어야 합니다.
- 게시물은 페이지네이션이 가능해야 합니다.
- 게시물 리스트는 한 페이지에 10개까지 보여야 하며, 초과시 다음 페이지에서 볼 수 있어야 합니다.
- 게시물 조회시 댓글도 모두 조회할 수 있어야 합니다.
- 게시물 작성 시, 텍스트와 이미지의 contentOrder도 트래킹 할 수 있어야 합니다.
  - 추후 READ 기능 구현 시 텍스트 / 이미지의 순서를 맞추어 렌더링 할 수 있게 해야 합니다.

### 댓글

- 사용자는 로그인을 하지 않고도 댓글을 확인할 수 있어야 합니다.
- 사용자는 댓글을 입력 하고 싶으면 로그인을 해야 합니다.
- 사용자는 자신의 댓글만 수정, 삭제할 수 있어야 합니다.
- 댓글에는 댓글을 달수 없습니다.(단 원하는 경우 구현해도 괜찮습니다)

### 유저

- 사용자는 닉네임, 비밀번호, 프로필 사진을 변경할 수 있어야 합니다.
- 사용자는 자신의 정보를 조회할 수 있어야 합니다.

### 이미지
- 이미지는 Pre-Signed Url 방식으로 업로드 할 수 있어야 합니다.

