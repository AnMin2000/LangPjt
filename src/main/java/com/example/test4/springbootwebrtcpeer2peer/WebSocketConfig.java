package com.example.test4.springbootwebrtcpeer2peer;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// WebSocket 설정을 위한 Configuration 클래스
@Configuration
public class WebSocketConfig {

  // application.properties에서 읽어온 소켓 호스트 주소
  @Value("${socket.host}")
  private String host;

  // application.properties에서 읽어온 소켓 포트 번호
  @Value("${socket.port}")
  private int port;

  // SocketIOServer 빈을 생성하는 메서드
  @Bean
  public SocketIOServer socketIOServer() throws Exception {
    // SocketIO 서버 구성 객체 생성
    com.corundumstudio.socketio.Configuration config =
            new com.corundumstudio.socketio.Configuration();
    // 호스트 주소 설정
    config.setHostname(host);
    // 포트 번호 설정
    config.setPort(port);
    // SocketIOServer 객체를 생성하여 반환
    return new SocketIOServer(config);
  }
}
