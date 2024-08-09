# SumTime

## 🗂️ 서비스 기획 의도 및 컨셉

현대 사회에서는 시간 관리와 생산성 향상이 중요한 과제로 떠오르고 있습니다. 이에 우리는 사용자들이 효율적으로 시간을 관리하고, 일상 업무에서 최대의 생산성을 발휘할 수 있도록 돕는 타임트래커 서비스를 기획했습니다.

SumTime 서비스는 사용자의 일정을 체계적으로 관리하고, 각 활동에 소비되는 시간을 실시간으로 기록하여 시간 낭비를 최소화하고 목표 달성을 도와줍니다. 또한, 사용자의 일일 통계를 제공하여 사용자의 시간 활용 패턴을 시각적으로 제공하여 더 나은 시간 관리 전략을 수립할 수 있도록 돕습니다.

서비스의 주요 컨셉은 다음과 같습니다:

1. **간편한 시간 기록**: 사용자는 몇 번의 클릭만으로 각 활동에 소요된 시간을 쉽게 기록할 수 있습니다.
2. **데이터 시각화**: 시간 활용 패턴을 그래프 및 차트로 시각화하여 사용자가 자신의 시간 사용을 한눈에 파악할 수 있도록 합니다.

## ✅ 기능 정의

1. **회원가입**
   - 회원가입 성공 시 로그인 페이지로 이동
2. **로그인**
   - 로그인 성공 시 메인 페이지로 이동
   - 메인 페이지 왼쪽에는 타임테이블, 오른쪽에는 투두 리스트를 확인할 수 있음
   - 투두 리스트의 생성, 수정, 삭제 과정은 모두 모달 컴포넌트에서 진행
3. **투두 리스트**

   - 투두 항목들은 이름, 설명란, 시작, 종료 버튼으로 구성됩니다.
   - 투두 항목들에 시작 시간이 있으면, 시작 버튼은 렌더링 되지 않습니다.
   - 투두 항목들에 종료 시간이 있으면, 종료 버튼은 렌더링 되지 않습니다.

   3-1. **투두 생성**

   1. 생성 버튼 클릭 시 생성 모달 생성. 모달 컴포넌트에서 생성 과정 진행
      - 속성
        - require
          - 투두 이름
          - 색
        - option
          - 시작 시간
          - 종료 시간
          - 카테고리 (중간 발표 이후 진행 예정)
      - (시간이 없으면 시작, 종료 버튼 생성 / 있으면 타임테이블에 바로 반영)

   3-2. **투두 수정**

   1. 투두 항목 클릭 시 수정 모달 생성. 모달 컴포넌트에서 수정 과정 진행 3-3. **투두 삭제**
   1. 투두 항목 클릭 시 수정 모달 생성. 모달 컴포넌트에서 삭제 과정 진행 3-4. **버튼 클릭으로 시작과 종료 시간을 정함** 3-5. **투두에서 변경사항이 있다면 타임 테이블에 바로 반영**
   1. 이름 수정 가능
   1. 시간 수정 가능

4. **타임테이블**
   - 투두들 중, 시작시간과 종료시간이 있는 요소들을 타임테이블에 보이게 함
5. **달력**
   - 해당 달의 달력이 보이고 날짜를 누르면 그 날의 투두 페이지(메인 페이지)로 이동함
6. **하루 요약 리포트**
   - 사용자의 하루에서 사용한 시간을 그래프로 보여줍니다.
   - 카테고리별로 시간 합산을 진행하고, 리포트를 보여줍니다. 예) 식사 2시간, 여가 1시간, 공부 4시간 등등
7. **루틴 기능**
   - 반복적으로 생성되는 투두를 미리 지정할 수 있는 기능
     - 예) 월, 화, 수 '운동하기'를 루틴으로 등록해두면 해당 요일의 투두 리스트에는 이미 '운동하기'가 등록되어 있음
     - 상세 기획
       - require
         - 루틴 이름
         - 색
         - 요일정보
8. **마이 페이지**
   - 회원 정보
     - 사용자의 정보를 확인하고 수정할 수 있는 기능
     - 이메일
     - 이름
     - 비밀번호 변경하기
9. **친구 목록** (추후 추가 예정)

## 📚 기술 스택

```
Next.js
Next-Auth
TanStack Query
Redux (적용 전)
Turso
Drizzle
```

## 📐 Wireframe

### 랜딩페이지

<img width="708" alt="landing page" src="https://github.com/user-attachments/assets/ffffb2fd-18f9-4205-94d6-140f911dc02c">

### 투두 페이지

<img width="708" alt="todo page" src="https://github.com/user-attachments/assets/2d7c6a63-209d-4678-ad92-386af7396df2">

### 투두 페이지 - 모달

<img width="708" alt="todo page - modal" src="https://github.com/user-attachments/assets/895aaeb2-f5db-4af6-993e-1d0ef294178f">

### 회원가입 페이지

<img width="708" alt="signup page" src="https://github.com/user-attachments/assets/dda03ffc-1853-4c04-8ca7-584c2ae27fc7">

### 로그인 페이지

<img width="708" alt="login page" src="https://github.com/user-attachments/assets/b1767b1e-ec34-4b9b-a0ad-60cdfdd25786">

## 🧩 ERD, DB 스키마

![erd](https://github.com/user-attachments/assets/6e5fa043-2edf-4586-90d0-27c20308e483)
