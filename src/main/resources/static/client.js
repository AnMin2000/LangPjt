const LOCAL_IP_ADDRESS = "172.20.10.2"; // change it 172.20.10.2
// console.log("입력") 웹페이지에 로그가 뜸
const getElement = id => document.getElementById(id); // index.html의 id값을 참조하겠다.
const [btnConnect, btnToggleVideo, btnToggleAudio, divRoomConfig, roomDiv,
  roomNameInput, localVideo, remoteVideo, btnRandom, toggleCancel] =
    ["btnConnect", "toggleVideo", "toggleAudio", "roomConfig", "roomDiv", "roomName",
  "localVideo", "remoteVideo", "btnRandom", "toggleCancel"].map(getElement);  //index.html의 id값을 매핑하겠다.
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

btnConnect.onclick = () => { // 방생성 + 방입장
  if (roomNameInput.value === "") {
    alert("Room can not be null!"); // 방 이름을 적었는지 확인
  } else {
    roomName = roomNameInput.value;  // rooName 변수에 저장
    socket.emit("joinRoom", roomName); // 서버에 joinRoom 전송
    divRoomConfig.classList.add("d-none"); // 숨김 처리 -> classList(d-none) : div 제거 역할
    roomDiv.classList.remove("d-none"); // 표시 처리
  }
};

btnRandom.onclick = () => { // 랜덤 방 입장
    socket.emit("randomRoom"); // 서버에 joinRoom 전송

  // 클라이언트 측 코드
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
    socket.emit("onDisconnect")
    roomName = null; // 나가면 room 번호 초기화
    location.reload(); // 페이지 새로고침
  }
}


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
  alert("room is full!");
  window.location.reload();
});

handleSocketEvent("empty", e => {
  alert("생성 돼 있는 방이 없음");
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
