package com.example.test4.userController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

// ajax 회원가입 예제로 써본거
@Controller
public class SignupController {

    @GetMapping("/signup")
    public String showFormSignUP(){ return "signup"; }

    @PostMapping("/signup")
    @ResponseBody
    public String signup(@RequestBody SignupRequest request) {
        // 여기서 회원가입 로직을 구현합니다.
        // 예를 들어, 데이터베이스에 사용자 정보를 저장할 수 있습니다.

        return "{\"success\": true}";
    }

    static class SignupRequest {
        private String username;
        private String password;

        // Getter와 Setter 메서드는 생략했습니다. 필요하다면 추가해주세요.
    }
}