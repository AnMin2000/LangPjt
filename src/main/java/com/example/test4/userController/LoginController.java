package com.example.test4.userController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController { // 해당 경로로 요청이 들어오면 security 클래스로 넘겨서 Details -> DetailsService 로 이동이 돼 인증 진행

    @GetMapping("/login")
    public String showLoginForm() { return "login"; }

}