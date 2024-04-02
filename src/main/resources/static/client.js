const LOCAL_IP_ADDRESS = "172.20.10.2"; // change it 172.20.10.2

const getElement = id => document.getElementById(id); // index.html의 id값을 참조하겠다.
const [btnConnect, btnToggleVideo, btnToggleAudio, divRoomConfig, roomDiv, roomNameInput, localVideo, remoteVideo] = ["btnConnect",
  "toggleVideo", "toggleAudio", "roomConfig", "roomDiv", "roomName",
  "localVideo", "remoteVideo"].map(getElement);  //index.html의 id값을 매핑하겠다.
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

const streamConstraints = {audio: true, video: true};

let socket = io.connect(`https://${LOCAL_IP_ADDRESS}`, {secure: true});
// let socket = io.connect("http://192.168.0.3:8000");

btnToggleVideo.addEventListener("click", () => toggleTrack("video"));
btnToggleAudio.addEventListener("click", () => toggleTrack("audio"));

function toggleTrack(trackType) {
  if (!localStream) {
    return;
  }

  const track = trackType === "video" ? localStream.getVideoTracks()[0]
      : localStream.getAudioTracks()[0];
  const enabled = !track.enabled;
  track.enabled = enabled;

  const toggleButton = getElement(
      `toggle${trackType.charAt(0).toUpperCase() + trackType.slice(1)}`);
  const icon = getElement(`${trackType}Icon`);
  toggleButton.classList.toggle("disabled-style", !enabled);
  toggleButton.classList.toggle("enabled-style", enabled);
  icon.classList.toggle("bi-camera-video-fill",
      trackType === "video" && enabled);
  icon.classList.toggle("bi-camera-video-off-fill",
      trackType === "video" && !enabled);
  icon.classList.toggle("bi-mic-fill", trackType === "audio" && enabled);
  icon.classList.toggle("bi-mic-mute-fill", trackType === "audio" && !enabled);
}

btnConnect.onclick = () => {
  if (roomNameInput.value === "") {
    alert("Room can not be null!");
  } else {
    roomName = roomNameInput.value;
    socket.emit("joinRoom", roomName);
    divRoomConfig.classList.add("d-none");
    roomDiv.classList.remove("d-none");
  }
};

const handleSocketEvent = (eventName, callback) => socket.on(eventName,
    callback);

handleSocketEvent("created", e => {
  navigator.mediaDevices.getUserMedia(streamConstraints).then(stream => {
    localStream = stream;
    localVideo.srcObject = stream;
    isCaller = true;
  }).catch(console.error);
});

handleSocketEvent("joined", e => {
  navigator.mediaDevices.getUserMedia(streamConstraints).then(stream => {
    localStream = stream;
    localVideo.srcObject = stream;
    socket.emit("ready", roomName);
  }).catch(console.error);
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

handleSocketEvent("answer", e => {
  if (isCaller && rtcPeerConnection.signalingState === "have-local-offer") {
    remoteDescriptionPromise = rtcPeerConnection.setRemoteDescription(
        new RTCSessionDescription(e));
    remoteDescriptionPromise.catch(error => console.log(error));
  }
});

handleSocketEvent("userDisconnected", (e) => {
  remoteVideo.srcObject = null;
  isCaller = true;
});

handleSocketEvent("setCaller", callerId => {
  isCaller = socket.id === callerId;
});

handleSocketEvent("full", e => {
  alert("room is full!");
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
