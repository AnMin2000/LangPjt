package com.example.test4.userController;

import com.example.test4.dto.UserDto;
import com.example.test4.userService.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) { this.loginService = loginService; }

    @GetMapping("/login")
    public String showLoginForm() { return "login"; }

    @PostMapping("/login")
    public String login(Model model, @ModelAttribute("userDto") UserDto userDto){

        Boolean state = loginService.login(userDto);

        if(state.equals(true))  return "main";
        else return "false";
    }
}
