## 🦈 낙시고 - 낚시 예약 사이트
<a href="https://fishing-reservation-54646.web.app/#/">사이트 바로가기</a>
<br><br><br>
### 🖥️ 프로젝트 개요
낙시고는 낚시가 취미인 개발자가 자신의 취미를 웹페이지로 만들고자 시작한 프로젝트입니다.<br> 
이 웹 애플리케이션은 낚시를 즐기는 사람들을 위한 커뮤니티 플랫폼으로서, 사용자들은 선박 등록과 예약을 편리하게 관리할 수 있습니다.
<br><br><br>
### ⚙️ 기술 스택
- 프론트앤드: Vue.js
  - 컴포넌트: 컴포넌트 기반의 아키텍처를 활용하여 UI를 구성하였습니다. 컴포넌트를 기반으로 개발을 진행하여 코드의 재사용성을 높이고 유지 보수를 용이하게 만들었습니다.
  - 라우터: Vue Router를 활용하여 페이지 간의 이동 및 네비게이션을 관리했습니다. 라우터를 이용하여 다중 페이지 애플리케이션을 개발하고 사용자 경험을 향상시켰습니다. 이를 통해 사용자가 원하는 페이지로 쉽게 이동할 수 있도록 지원했습니다.
  - 상태 관리: Vuex를 통해 애플리케이션의 상태를 중앙에서 효율적으로 관리하고 데이터의 일관성을 유지하여 다양한 컴포넌트 간에 데이터를 공유하였습니다.
  - 백앤드 통신: 프론트앤드와 백앤드 간의 데이터 통신은 fetch API를 활용했습니다. 이를 통해 RESTful API를 호출하여 백엔드로부터 데이터를 비동기적으로 가져와 애플리케이션에 반영했습니다.
  - 라우터가드: 인증 상태를 확인하여 페이지 접근은 제어하였습니다.

- 백앤드: firebase
  - 실시간 데이터 베이스(Realtime Database): Firebase의 실시간 데이터 베이스를 활용하여 실시간으로 데이터를 동기화하고 저장했습니다.
  - 스토리지 (Storage): Firebase 스토리지를 활용하여 사용자가 업로드한 파일을 안전하게 저장하고 관리했으며, 이미지, 비디오, 오디오 파일 등을 스토리지에 업로드하고 애플리케이션에서 사용했습니다.
  - 인증 (Authentication): Firebase의 인증 기능을 사용하여 사용자를 관리하고 인증했습니다.

- KAKAO MAP API:
  - 카카오지도 API를 활용하여 출항지의 위치를 동적으로 지도 상에 표현했습니다.
  - API를 통해 출항지의 위도와 경도 정보를 가져와 지도 위에 마커로 표시했으며, 사용자는 지도를 활용하여 출항지의 위치를 시각적으로 확인할 수 있습니다.

- 배포: firebase
  - 호스팅 (Hosting): Firebase의 호스팅 기능을 활용하여 프로젝트를 웹에 배포하였습니다.
<br><br><br>
### 🔧 주요 기능
- 로그인 및 회원가입: 사용자는 자체 회원가입을 통해 계정을 생성하거나 테스트용으로 제공되는 아이디를 사용하여 로그인할 수 있습니다.

  테스트용 아이디:
  - ID: user1@test.com, PW: test123
  - ID: test@test.com, PW: test123
  - ID: test1@test.com, PW: test123
  - ID: test2@test.com, PW: test123
  - ID: test3@test.com, PW: test123

<img width="300" src="https://github.com/kdh990315/fishing-reservation/assets/104114383/995dfa7f-4459-4861-9ae8-5ee00a224b8b" alt="로그인-로그아웃 섹션"><br><br><br>

- 선박 등록: 로그인한 사용자는 자신이 소유한 선박을 등록할 수 있습니다. 등록된 선박은 다른 사용자들에게 예약이 가능한 상태가 됩니다.

<img width="300" src="https://github.com/kdh990315/fishing-reservation/assets/104114383/2c2b0099-5f83-44be-beea-4e9805e3c04c" alt="선박 등록"><br><br><br>

- 선박 삭제 : 로그인한 사용자는 선박을 등록했다면 삭제할 수 있습니다. 삭제된 선박 정보와 이미지는 firebase의 실시간 데이터 베이스 및 스토리지에서 삭제됩니다.

<img width="150" src="https://github.com/kdh990315/fishing-reservation/assets/104114383/88eb4ebc-ff68-48dc-901c-e6dba4f7ef4f" alt="선박 삭제"><br><br><br>

- 선박 예약: 등록된 선박은 다른 사용자들에게 예약이 받을 수 있으며, 사용자는 편리한 예약 시스템을 통해 선박을 예약할 수 있습니다.

<img width="300" src="https://github.com/kdh990315/fishing-reservation/assets/104114383/6fbfd9c6-3e8c-45af-b766-df148604b15c" alt="선박 예약"><br><br><br>

- 검색 기능: 사용자는 선박을 특정 조건으로 검색할 수 있습니다. 검색 기능을 통해 사용자는 원하는 조건에 맞는 선박을 빠르게 찾을 수 있습니다.

<img width="400" src="https://github.com/kdh990315/fishing-reservation/assets/104114383/96024119-5fb2-44af-a384-5a0a6b0dd1df" alt="선박 검색"><br><br><br>

- 선박 필터링 기능: 사용자는 등록된 선박을 다양한 기준으로 필터링할 수 있습니다. 필터링 기능을 통해 사용자는 원하는 조건에 맞게 선박을 정렬하고 선택할 수 있습니다.

<img width="300" src="https://github.com/kdh990315/fishing-reservation/assets/104114383/73c72606-004c-4449-85e0-d74a897e120b" alt="선박 필터"><br><br><br>

- slider hook 활용: javascript로 slide animation 효과를 만들어 어느 컴포넌트던 함수를 호출하여 사용할 수 있게 만들었습니다.

<img width="800" src="https://github.com/kdh990315/fishing-reservation/assets/104114383/b6f88ad9-b9c9-4eb9-ad34-eb1d285693e3" alt="슬라이드 "><br><br><br>

- 예약 관리 기능(추가): 사용자가 선박을 예약하면 월별로 보기쉽게 예약자 관리를 할 수 있습니다.

<img width="300" src="https://github.com/kdh990315/fishing-reservation/assets/104114383/260452dd-84af-482f-a416-52cefc691e69" alt="예약 관리"><br><br><br>
