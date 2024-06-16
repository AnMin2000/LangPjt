package com.example.test4.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil { // JWT 발급 및 검증 클래스

    private SecretKey secretKey;

    public JWTUtil(@Value("${spring.jwt.secret}")String secret) {

        // application.properties 에 저장해둔 secret 키를 객체 변수로 암호화 한거임
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    // ------------------------------------------ 검증 메서드 -----------------------------------------------
    public String getUsername(String token) {
        // 토큰이 추출(userName)
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
    }

    public String getCategory(String token) {

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    public String getRole(String token) {
        // 위와 동일
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public Boolean isExpired(String token) {
        // 토큰이 소멸 됐는지 확인  -> true 리턴 시 토큰 만료 (발급 받은 날짜가 유효 기간 보다 이전인지 확인)
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }
    // ------------------------------------------ 검증 메서드 -----------------------------------------------
    public String createJwt(String category, String username, String role, Long expiredMs) { // 토큰 생성 메서드

        return Jwts.builder()
                .claim("category", category) // access 및 refresh 토큰 구분자
                .claim("username", username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))  // 현재 발행 시간
                .expiration(new Date(System.currentTimeMillis() + expiredMs)) // 토큰 만료 시간
                .signWith(secretKey) // 암호화 진행
                .compact();
    }
}