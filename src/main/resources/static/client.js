const LOCAL_IP_ADDRESS = "172.20.10.2"; // change it 172.20.10.2
// console.log("입력") 웹페이지에 로그가 뜸
const getElement = id => document.getElementById(id); // index.html의 id값을 참조하겠다.
const [btnConnect, btnToggleVideo, btnToggleAudio, divRoomConfig, roomDiv,
  roomNameInput, localVideo, remoteVideo, btnRandom, toggleCancel, btnCreate,
  toggleRefresh] =
    ["btnConnect", "toggleVideo", "toggleAudio", "roomConfig", "roomDiv", "roomName",
  "localVideo", "remoteVideo", "btnRandom", "toggleCancel", "btnCreate", "toggleRefresh"].map(getElement);  //index.html의 id값을 매핑하겠다.
let remoteDescriptionPromise, roomName, localStream, remoteStream,
    rtcPeerConnection, isCaller; // 변수 선언
// var : 재선언 가능+업데이트 가능, let : 재선언 불가+업데이트 가능, const : 재선언 불가+업데이트 불가

const iceServers = {
  iceServers: [
    {urls: `stun:${LOCAL_IP_ADDRESS}:3478`}, // 본인의 로컬 IP를 보내고 Public IP를 받아옴 // c/c 직접적인 연결
    {
      urls: `turn:${LOCAL_IP_ADDRESS}:3478`,  // 본인의 로컬 IP를 보내고 Public IP를 받아옴 // 방화벽 뚫기 등 중재 역할
      username: "username",
      credential: "password"
    }
  ]
};

const streamConstraints = {audio: true, video: true}; // 미디어 스트림 제약 설정 -> getUserMedia() 메서드와 사용

let socket = io.connect(`https://${LOCAL_IP_ADDRESS}`, {secure: true}); // web 소켓 연결 + 보안 설정
// let socket = io.connect("http://192.168.0.3:8000");

btnToggleVideo.addEventListener("click", () => toggleTrack("video")); // 클릭시 toggle 함수 호출
btnToggleAudio.addEventListener("click", () => toggleTrack("audio")); // 클릭시 toggle 함수 호출

function toggleTrack(trackType) { // localSteam이 null 일때 강제 강제 종료 -> 불필요한 작업 최소화
  if (!localStream) {
    return;
  }

  const track = trackType === "video" ? localStream.getVideoTracks()[0] // video or audio 체크
      : localStream.getAudioTracks()[0];
  const enabled = !track.enabled;  //현재 트랙의 활성화 상태를 반전 시킴
  track.enabled = enabled; // 대입

  const toggleButton = getElement(
      `toggle${trackType.charAt(0).toUpperCase() + trackType.slice(1)}`); // html에서  toggle의 trackType을 갖고와서 첫글자 대문자 반환
  const icon = getElement(`${trackType}Icon`); // html에서 icon의 trackType을 갖고옴
  toggleButton.classList.toggle("disabled-style", !enabled); // !enable 일경우 disable 스타일 적용
  toggleButton.classList.toggle("enabled-style", enabled);   // enable 일경우 enable 스타일 적용
  icon.classList.toggle("bi-camera-video-fill",  //video가 enable 일경우 활성화
      trackType === "video" && enabled);
  icon.classList.toggle("bi-camera-video-off-fill",  // "가 !enable 일경우 비활성화
      trackType === "video" && !enabled);
  icon.classList.toggle("bi-mic-fill", trackType === "audio" && enabled);         // 같음
  icon.classList.toggle("bi-mic-mute-fill", trackType === "audio" && !enabled);   // 같음
}

btnConnect.onclick = () => { // 방입장
  if (roomNameInput.value === "") {
    alert("Room can not be null!"); // 방 이름을 적었는지 확인
  } else {
    // 무슨 조건이던간에 여기가 무조건 실행됨 이 코드 비어있거나 + 중복 아닐때만으로 수정
    roomName = roomNameInput.value;  // rooName 변수에 저장
    socket.emit("joinRoom", roomName); // 서버에 joinRoom 전송**** 여기 코드에서 접속할 때 꽉찬방일때 일반적인 disconnect만 되게 설정(현제는 sessionId까지 꺼짐ㅁㅁ)
    divRoomConfig.classList.add("d-none"); // 숨김 처리 -> classList(d-none) : div 제거 역할
    roomDiv.classList.remove("d-none"); // 표시 처리
  }
};

btnCreate.onclick = () => { // 방 생성
  if (roomNameInput.value === "") {
    alert("Room can not be null!"); // 방 이름을 적었는지 확인
  } else {
    // 무슨 조건이던간에 여기가 무조건 실행됨 이 코드 비어있거나 + 중복 아닐때만으로 수정
    roomName = roomNameInput.value;  // rooName 변수에 저장
    socket.emit("createRoom", roomName); // 서버에 joinRoom 전송**** 여기 코드에서 접속할 때 꽉찬방일때 일반적인 disconnect만 되게 설정(현제는 sessionId까지 꺼짐ㅁㅁ)
    divRoomConfig.classList.add("d-none"); // 숨김 처리 -> classList(d-none) : div 제거 역할
    roomDiv.classList.remove("d-none"); // 표시 처리
  }
}

btnRandom.onclick = () => { // 랜덤 방 입장
  // 이 코드도 무조건 실행됨 중복이거나 비어있지 않을 때만 실행
    socket.emit("randomRoom"); // 서버에 joinRoom 전송

  // // 클라이언트 측 코드
  socket.on("joined", (roomNum) => {   // 'joined' 이벤트를 수신하고 roomNum을 설정합니다.
    roomName = roomNum; // 서버에서 보낸 roomNum을 roomName에 저장
  });

    divRoomConfig.classList.add("d-none"); // 숨김 처리 -> classList(d-none) : div 제거 역할
    roomDiv.classList.remove("d-none"); // 표시 처리
};

toggleCancel.onclick = () => {
  // "나가시겠습니까?"라는 알림창 표시
  const userConfirmed = confirm("나가시겠습니까?");

  if (userConfirmed) {

    // 사용자가 "예"를 선택한 경우
    socket.emit("leaveRoom", roomName); // 서버에 leaveRoom 이벤트 전송
    socket.emit("onDisconnect");
    roomName = null; // 나가면 room 번호 초기화
    location.reload(); // 페이지 새로고침
  }
}


let usersMap;
let newData;
let previousValues = new Map();

// 테이블을 업데이트할 새로운 데이터를 가져오는 함수가 있다고 가정합니다.
function fetchDataAndUpdateTable() {
  // 서버에서 새로운 데이터를 가져오거나 기존 데이터를 조작합니다.
  // 예시로 newData가 업데이트된 데이터라고 가정합니다.

  socket.emit("printRoom");
  socket.on('printRoom', (data) => {

    try {
      // JSON 문자열을 객체로 파싱
      const parsedData = JSON.parse(data);
      // 객체를 Map 객체로 변환
      usersMap = new Map(Object.entries(parsedData));

      // Map 객체의 키들을 얻음
      const keys = Array.from(usersMap.keys());

      // 새로운 데이터를 담을 배열
      newData = [];

      // 현재 사용 중인 값들을 추적
      let currentValues = new Map();

      // 키를 순회하면서 newData 배열에 객체를 추가
      keys.forEach((key) => {
        const value = usersMap.get(key);
        if (value !== null) {
          // 현재 처리 중인 값 추적
          currentValues.set(value, key);

          // newData 배열에서 동일한 value 값을 가진 객체가 있는지 확인
          const existingEntry = newData.find(entry => entry.name === value);
          if (existingEntry) {
            // 동일한 value 값이 존재하면 currentMembers 값을 "X"로 변경
            existingEntry.currentMembers = "X";
          } else {
            // 동일한 value 값이 없으면 새로운 객체를 추가
            newData.push({
              name: value,
              host: key,
              level: "새로운 LV",
              currentMembers: "○"
            });
          }
        }
      });

      // 이전에 존재했던 값들 중 현재 존재하지 않는 값들을 처리
      previousValues.forEach((key, value) => {
        if (!currentValues.has(value)) {
          // newData 배열에서 해당 값을 찾아 currentMembers 값을 "○"로 변경
          const entry = newData.find(entry => entry.name === value);
          if (entry) {
            entry.currentMembers = "○";
          }
        }
      });

      // 현재 값들을 이전 값으로 저장
      previousValues = currentValues;

      updateTable();
      console.log(newData);
    } catch (e) {
      console.error("Error parsing data:", e);
    }
  });
}

// 테이블을 업데이트하는 함수
function updateTable() {
  // 테이블의 tbody 요소를 선택합니다.
  const tableBody = document.querySelector("#selectRoom tbody");

  // 테이블의 tbody 내부의 기존 행을 지웁니다.
  tableBody.innerHTML = '';

  // 새로운 데이터를 순회하며 테이블 행을 생성합니다.
  newData.forEach(room => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${room.name}</td>
      <td>${room.host}</td>
      <td>${room.level}</td>
      <td>${room.currentMembers}</td>
    `;

    // 행 클릭 시 해당 value 값을 콘솔에 출력하는 이벤트 리스너 추가
    newRow.addEventListener('click', () => {

      roomName = room.name.toString();  // rooName 변수에 저장
      socket.emit("joinRoom", roomName); // 서버에 joinRoom 전송**** 여기 코드에서 접속할 때 꽉찬방일때 일반적인 disconnect만 되게 설정(현제는 sessionId까지 꺼짐ㅁㅁ)
      divRoomConfig.classList.add("d-none"); // 숨김 처리 -> classList(d-none) : div 제거 역할
      roomDiv.classList.remove("d-none"); // 표시 처리

    });

    newRow.classList.add('cursor-pointer');

    tableBody.appendChild(newRow);
  });
  applyScrollbarStyles();
}

// 스크롤바가 있는지 여부를 확인하고 해당 CSS 파일을 추가하는 함수
function applyScrollbarStyles() {
  const table = document.getElementById('selectRoom');
  if (table.scrollHeight <= table.clientHeight) {
    // 스크롤바가 없을 때 CSS 파일을 제거합니다.
    const styleCSS = document.querySelector('link[href="style.css"]');
    if (styleCSS) {
      // style.css 파일에서 특정 CSS 규칙을 찾아서 삭제합니다.
      const styleSheet = styleCSS.sheet;
      const rules = styleSheet.cssRules || styleSheet.rules;
      for (let i = 0; i < rules.length; i++) {
        if (
            rules[i].selectorText === 'th:nth-child(1)' ||
            rules[i].selectorText === 'th:nth-child(2)' ||
            rules[i].selectorText === 'th:nth-child(3)' ||
            rules[i].selectorText === 'th:nth-child(4)'
        ) {
          styleSheet.deleteRule(i);
          i--; // 삭제 후 인덱스 보정
        }
      }
    }
  }
}


toggleRefresh.addEventListener('click', () => {
  // 업데이트된 데이터를 가져와서 테이블을 업데이트하는 함수를 호출합니다.
  fetchDataAndUpdateTable();
  applyScrollbarStyles();
});

// 페이지 로드 시 스크롤바 여부에 따라 CSS를 적용합니다.
window.addEventListener('load', () => {
  fetchDataAndUpdateTable();
  applyScrollbarStyles();
});

// 윈도우 크기 변경 시 스크롤바 여부에 따라 CSS를 적용합니다.
window.addEventListener('resize', () => {
  fetchDataAndUpdateTable();
  applyScrollbarStyles();
});

const handleSocketEvent = (eventName, callback) => socket.on(eventName,
    callback); // 아래 여러 핸들 소켓 이벤트들을 처리하기 위해 정의 // 첫번째 eventName, callback은 이름 정의 두번째는 호출

handleSocketEvent("created", e => {
  navigator.mediaDevices.getUserMedia(streamConstraints).then(stream => {  // 미디어 장치 접근
    localStream = stream;  // 미디어 스트림 할당
    localVideo.srcObject = stream;  // 비디오 요소에 미디어 스트림 연결(카메라 영상 표시)
    isCaller = true; // 방 생성 했다는 의미
  }).catch(console.error);
});

handleSocketEvent("joined", e => {
  navigator.mediaDevices.getUserMedia(streamConstraints).then(stream => {
    localStream = stream;
    localVideo.srcObject = stream;
    socket.emit("ready", roomName); // roomName 과 함께 ready를 서버로 보냄
  }).catch(console.error);
});

handleSocketEvent("ready", e => {
  if (isCaller) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    rtcPeerConnection.onicecandidate = onIceCandidate;
    rtcPeerConnection.ontrack = onAddStream;
    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
    rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream);
    rtcPeerConnection
        .createOffer()
        .then(sessionDescription => {
          rtcPeerConnection.setLocalDescription(sessionDescription);
          socket.emit("offer", {
            type: "offer", sdp: sessionDescription, room: roomName,
          });
        })
        .catch(error => console.log(error));
  }
});

handleSocketEvent("offer", e => {
  if (!isCaller) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    rtcPeerConnection.onicecandidate = onIceCandidate;
    rtcPeerConnection.ontrack = onAddStream;
    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
    rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream);

    if (rtcPeerConnection.signalingState === "stable") {
      remoteDescriptionPromise = rtcPeerConnection.setRemoteDescription(
          new RTCSessionDescription(e));
      remoteDescriptionPromise
          .then(() => {
            return rtcPeerConnection.createAnswer();
          })
          .then(sessionDescription => {
            rtcPeerConnection.setLocalDescription(sessionDescription);
            socket.emit("answer", {
              type: "answer", sdp: sessionDescription, room: roomName,
            });
          })
          .catch(error => console.log(error));
    }
  }
});

handleSocketEvent("candidate", e => {
  if (rtcPeerConnection) {
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: e.label, candidate: e.candidate,
    });

    rtcPeerConnection.onicecandidateerror = (error) => {
      console.error("Error adding ICE candidate: ", error);
    };

    if (remoteDescriptionPromise) {
      remoteDescriptionPromise
      .then(() => {
        if (candidate != null) {
          return rtcPeerConnection.addIceCandidate(candidate);
        }
      })
      .catch(error => console.log(
          "Error adding ICE candidate after remote description: ", error));
    }
  }
});

handleSocketEvent("answer", e => {
  if (isCaller && rtcPeerConnection.signalingState === "have-local-offer") {
    remoteDescriptionPromise = rtcPeerConnection.setRemoteDescription(
        new RTCSessionDescription(e));
    remoteDescriptionPromise.catch(error => console.log(error));
  }
});

handleSocketEvent("userDisconnected1", (e) => {
  remoteVideo.srcObject = null;
  isCaller = true;
  location.reload(); // 페이지 새로고침


  // roomName = null; // 나가면 room 번호 초기화
});
handleSocketEvent("userDisconnected2", (e) => {

  remoteVideo.srcObject = null;
  isCaller = true;

  // roomName = null; // 나가면 room 번호 초기화
});

handleSocketEvent("setCaller", callerId => {
  isCaller = socket.id === callerId;
});

handleSocketEvent("full", e => {
  alert("인원 초과!");
  window.location.reload();
});

handleSocketEvent("empty", e => {
  alert("생성 돼 있는 방이 없음!");
  window.location.reload();
});

const onIceCandidate = e => {
  if (e.candidate) {
    console.log("sending ice candidate");
    socket.emit("candidate", {
      type: "candidate",
      label: e.candidate.sdpMLineIndex,
      id: e.candidate.sdpMid,
      candidate: e.candidate.candidate,
      room: roomName,
    });
  }
}

const onAddStream = e => {
  remoteVideo.srcObject = e.streams[0];
  remoteStream = e.stream;
}


