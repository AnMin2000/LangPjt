package com.example.test4.userController;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

@Controller
public class ApiController {

    @GetMapping("/call-fastapi")
    public ResponseEntity<String> callFastApi() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://127.0.0.1:5000/greet";

        // FastAPI 엔드포인트로 GET 요청을 보냄
        String response = restTemplate.getForObject(url, String.class);

        // 결과를 반환
        return ResponseEntity.ok(response);
    }
}