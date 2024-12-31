# Luce Vita (Server)

## 요약

> 여행을 기록하고 관리하는 앱

.. 대표 이미지 1장 ..

## 상세

8번째 PJT (팀 PJT)

### 0. 목차

1. 소개
2. 기술 스택
3. 느낀 점
4. 기능 (페이지 구성)
5. 아쉬웠던 부분
6. 앞으로 학습할 것들, 나아갈 방향
7. 어려웠던 부분, 해결한 과정

### 1. 소개

**루체 비타(Luce Vita)**

- 과거 다녀온 여행, 현재 진행중인 여행, 예정된 여행을 작성하고 관리하는 앱
- 예전에 다녀온 여행의 기록을 보며 추억할 수 있음
- 현재 진행중인 여행의 일정과 예산을 관리
- 나중에 있을 여행을 작성해 예정일을 확인하며 수정할 수 있음
- 진행중이거나 가장 가까운 예정의 여행은 3주짜리 캘린더를 통해 날짜 표시
- 각 여행은 여행 카드로 표현되며, 클릭해 해당 여행의 상세 정보 확인 가능
- 여행의 제목, 시작·종료 날짜, 국가, 장소, 숙소, 예산과 잔액, 태그 표시
- 날짜별 할 일과 각 예산 지정
- 회원가입을 통해 서비스 이용 가능

작업 기간

- 2024/12, 4주

인력 구성

- 4인 (FE 2인, BE 2인)
- 홈, 여행 목록, 일정 상세
- 사용자 인증, 로그인, 회원가입, 여행 상세·수정, 마이페이지

링크 목록

- [Luce Vita 앱]()
- [Luce Vita 서버](https://luce-vita-server.vercel.app/)
- [Luce Vita DB](https://supabase.com/dashboard/project/xvkskcomnspwcdhmdtzu)

### 2. 기술 스택

- `TypeScript`: 정적 타입을 도입해 안정성·가독성 향상
- `Node.js`: npm을 통해 방대한 라이브러리 이용이 가능하며,  RESTful API와 잘 맞는 데이터 형식인 JSON 형식의 데이터 처리에 적합
- `supabase`: PostgreSQL 데이터베이스를 기반으로 하며, 인증, 스토리지, 웹 소켓, 서버리스 함수 등의 백엔드 기능을 제공
- `express`: 소규모 프로젝트에 적합하며 빠르고 유연한 웹 애플리케이션 개발에 용이
- `vercel`: 무료로 배포 가능하면서 supabase와의 연결성도 용이
- `Swagger`: 프론트엔드에게 명확한 API의 엔드포인트 전달 및 테스트 가능
- `ERD Cloud`: 손쉽게 테이블 설계가 가능하고 테이블 간의 연결 관계를 명확하게 보여주기에 파악이 용이

### 3. 느낀 점
- Supabase 자체가 서버리스로 이용가능한 서비스인데, 이걸 서버를 만들어서 일부 제어권을 가져오려고 하니 생각보다 힘들었음
(어디까지 자동화가 되어있고, 어디서부터 제어를 통해 해야하는지가 불분명했음)

### 4. 기능 (페이지 구성)

1. 로그인
2. 회원가입
3. 마이페이지
4. 여행 목록
5. 여행상세
6. 커뮤니티

시연 영상

### 5. 아쉬웠던 부분

- ..

### 6. 앞으로 학습할 것들, 나아갈 방향

- ..

### 7. 어려웠던 부분, 해결한 과정

#### 1) 회원가입 구현

- 이슈1: supabase에서 제공되는 OTP를 연결하여 auth.user에 자동으로 추가되는 유저 정보를 인증이 완료된 시점에서 user_info 테이블로 데이터를 넘기도록 연결하는 것
- 해결방법: SQL을 이용하여 인증이 완료되는 시점을 기준으로 자동으로 user_info테이블로 데이터가 업데이트 되도록 Trigger 설정 추가
- 이슈2: 미인증 상태로 회원가입을 중단한 유저가 동일한 계정으로 회원가입 다시 시도 할 때의 로직 구현 (auth.user에 대한 수정 권한이 따로 설정하지 않는 한 없음)
- 해결방법: rcp 함수를 추가하고, rcp를 통해 해당 user의 계정(이메일)이 auth.user에 존재하는지 확인 후 미인증이라면 해당 데이터 삭제 후 재등록

---
