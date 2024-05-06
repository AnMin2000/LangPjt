package com.example.test4.springbootwebrtcpeer2peer;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Component // 스프링 컨텍스트에서 빈으로 자동 등록되도록 함
@Slf4j // 로깅을 위한 어노테이션
public class SocketHandler {

  private final SocketIOServer server; // Socket.IO 서버를 사용하기 위한 인스턴스
  private static final Map<String, String> users = new HashMap<>(); // 사용자 정보를 저장하기 위한 맵
  private static final Map<String, String> rooms = new HashMap<>(); // 방 정보를 저장하기 위한 맵

  // 생성자
  public SocketHandler(SocketIOServer server) {
    this.server = server;
    server.addListeners(this); // 이벤트 핸들러를 등록  <- 이게 있어야 @OnConnect, @OnEvent 같은 이벤트 처리기 등록 가능
    server.start(); // 서버 시작
  }

  // 클라이언트가 연결될 때 호출되는 메서드
  @OnConnect
  public void onConnect(SocketIOClient client) {
    System.out.println("Client connected: " + client.getSessionId()); // 클라이언트 연결 로그 출력
    String clientId = client.getSessionId().toString();
    users.put(clientId, null); // 사용자 맵에 클라이언트 아이디 추가
  }

  // 클라이언트가 강제 종료 했을 때 호출되는 메서드
  @OnDisconnect
  public void onDisconnect(SocketIOClient client) {
    String clientId = client.getSessionId().toString(); // 클라이언트 아이디 가져오기
    String room = users.get(clientId); // 클라이언트가 속한 방 가져오기
    if (!Objects.isNull(room)) { // 방이 존재하는 경우
      System.out.println(String.format("Client disconnected: %s from : %s", clientId, room)); // 클라이언트 연결 해제 로그 출력

       users.remove(clientId,room); // 사용자 맵에서 클라이언트 제거

      if (rooms.containsKey(room) && rooms.get(room).equals(clientId)) { // 이건 방장 --> 이거 발생하면 room의 밸류 값을 갖고 있는 users 목록을 새로고침 해야 됨
        // 키와 값이 모두 일치할 때 제거
        rooms.remove(room, clientId);

        System.out.println("방 '" + room + "'의 클라이언트 '" + clientId + "'가 제거되었습니다.");
        System.out.println("테스트" + clientId);
        client.leaveRoom(room); // 클라이언트를 방에서 나가게 함 --> 이걸 써야 나갔을 때 화면이 꺼짐
        client.getNamespace().getRoomOperations(room).sendEvent("userDisconnected1", clientId); // 해당 방에 속한 클라이언트들에게 이벤트 전송

      } else { // 이건 팀원

        System.out.println("방 '" + room + "'에 클라이언트 '" + clientId + "'가 존재하지 않습니다.");
        System.out.println(rooms);
        client.leaveRoom(room); // 클라이언트를 방에서 나가게 함 --> 이걸 써야 나갔을 때 화면이 꺼짐
        client.getNamespace().getRoomOperations(room).sendEvent("userDisconnected2", clientId); // 해당 방에 속한 클라이언트들에게 이벤트 전송
      }
      System.out.println("현재 방 : " + rooms);

    }
    printLog("onDisconnect", client, room); // 로그 출력
  }

  // 클라이언트가 방에 참가할 때 호출되는 메서드
  @OnEvent("joinRoom") // 단순히 방 참여 했을 때 호출 되는 메서드
  public void onJoinRoom(SocketIOClient client, String room) {
    int connectedClients = server.getRoomOperations(room).getClients().size(); // 해당 방에 연결된 클라이언트 수 확인
    if (connectedClients == 0) { // 방에 클라이언트가 없는 경우
      client.joinRoom(room); // 방에 클라이언트를 추가
      client.sendEvent("created", room); // 클라이언트에게 'created' 이벤트 전송
      users.put(client.getSessionId().toString(), room); // 사용자 맵에 클라이언트 추가
      rooms.put(room, client.getSessionId().toString()); // 방 맵에 방과 클라이언트 아이디 추가

    } else if (connectedClients == 1) { // 방에 클라이언트가 한 명 있는 경우
      client.joinRoom(room); // 방에 클라이언트를 추가
      client.sendEvent("joined", room); // 클라이언트에게 'joined' 이벤트 전송
      users.put(client.getSessionId().toString(), room); // 사용자 맵에 클라이언트 추가
      client.sendEvent("setCaller", rooms.get(room)); // 클라이언트에게 'setCaller' 이벤트 전송
    } else { // 방에 클라이언트가 이미 두 명 있는 경우
      client.sendEvent("full", room); // 클라이언트에게 'full' 이벤트 전송
    }
    printLog("onReady", client, room); // 로그 출력
  }

  @OnEvent("randomRoom")
  public void onRandomRoom(SocketIOClient client) {
    int connectedClients;
    String roomNum;
    boolean isRoomsEmpty = rooms.isEmpty(); // 비어있으면 true, 존재하면 false
    boolean check = false;
    if(isRoomsEmpty){
      client.sendEvent("empty", (Object) null);
    }
    else {
      for (Map.Entry<String, String> entrySet : rooms.entrySet()) {
        roomNum = entrySet.getKey();
        connectedClients = server.getRoomOperations(roomNum).getClients().size(); // 해당 방에 연결된 클라이언트 수 확인
        System.out.println("방 번호 : " + roomNum +", 사람 인원 테스트 : " + connectedClients );
        if (connectedClients == 1) {
          client.joinRoom(roomNum); // 방에 클라이언트를 추가 ------------> 아래쪽 어딘가 문제가 있음
          client.sendEvent("joined", roomNum); // 클라이언트에게 'joined' 이벤트 전송
          users.put(client.getSessionId().toString(), roomNum); // 사용자 맵에 클라이언트 추가
          client.sendEvent("setCaller", rooms.get(roomNum)); // 클라이언트에게 'setCaller' 이벤트 전송
          check = true;
          break;
        }
      }
      if (!check) {
        client.sendEvent("empty", (Object) null); // 클라이언트에게 'empty' 이벤트 전송
      }
    }
  }
  // 클라이언트가 준비되었음을 알릴 때 호출되는 메서드
  @OnEvent("ready") // 연결 설정 및 미디어 스트림 같은 작업들이 모두 완료 됐을 때 호출 되는 메서드
  public void onReady(SocketIOClient client, String room, AckRequest ackRequest) {
    client.getNamespace().getBroadcastOperations().sendEvent("ready", room); // 모든 클라이언트에게 'ready' 이벤트 전송
    printLog("onReady1", client, room); // 로그 출력
  }

  // 제안을 전송할 때 호출되는 메서드
  @OnEvent("offer")  // 이것으로 클라이언트끼리 SDP 교환
  public void onOffer(SocketIOClient client, Map<String, Object> payload) { //payload : 통신에 필요한 정보가 담겨 있음
    String room = (String) payload.get("room"); // 방 정보 가져오기
    Object sdp = payload.get("sdp");
    client.getNamespace().getRoomOperations(room).sendEvent("offer", sdp); // 해당 방에 속한 클라이언트들에게 SDP 제안 전송
    printLog("onOffer", client, room); // 로그 출력
  }

  // ICE 후보를 전송할 때 호출되는 메서드
  @OnEvent("candidate") // ICE 후보 전송 (IP 주소, 포트번호)
  public void onCandidate(SocketIOClient client, Map<String, Object> payload) {
    String room = (String) payload.get("room"); // 방 정보 가져오기
    client.getNamespace().getRoomOperations(room).sendEvent("candidate", payload); // 해당 방에 속한 클라이언트들에게 이벤트 전송
    printLog("onCandidate", client, room); // 로그 출력
  }

  // 응답을 전송할 때 호출되는 메서드
  @OnEvent("answer") // SDP에 대한 응답 전송
  public void onAnswer(SocketIOClient client, Map<String, Object> payload) {
    String room = (String) payload.get("room"); // 방 정보 가져오기
    Object sdp = payload.get("sdp");
    client.getNamespace().getRoomOperations(room).sendEvent("answer", sdp); // 해당 방에 속한 클라이언트들에게 SDP 응답 전송
    printLog("onAnswer", client, room); // 로그 출력
  }

  // 방에서 나갈 때 호출되는 메서드
  @OnEvent("leaveRoom")
  public void onLeaveRoom(SocketIOClient client) {
    String clientId = client.getSessionId().toString(); // 클라이언트 아이디 가져오기
    String room = users.get(clientId); // 클라이언트가 속한 방 가져오기
    //client.leaveRoom(room); // 클라이언트를 방에서 나가게 함
    // leaveRoom을 사용했을 때 무언가를 처리하고 싶을 때 처리
    printLog("onLeaveRoom", client, room); // 로그 출력

  }


  // 로그 출력 메서드
  private static void printLog(String header, SocketIOClient client, String room) {
    if (room == null) return; // 방 정보가 없는 경우 메서드 종료
    int size = 0;
    try {
      size = client.getNamespace().getRoomOperations(room).getClients().size(); // 해당 방에 속한 클라이언트 수 가져오기
    } catch (Exception e) {
      SocketHandler.log.error("error ", e); // 에러 발생 시 로그 출력
    }
    SocketHandler.log.info("#ConncetedClients - {} => room: {}, count: {}", header, room, size); // 방 정보와 연결된 클라이언트 수를 로그로 출력
  }
}
