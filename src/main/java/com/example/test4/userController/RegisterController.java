package com.example.test4.userController;

import com.example.test4.dto.UserDto;
import com.example.test4.userService.RegisterService;
import com.example.test4.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class RegisterController {

    private final RegisterService registerService; // final을 써야 코드가 불변해 코드의 안정성 향상 -> 의존성 주입 필수

    @Autowired
    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @GetMapping("/begin")
    public String showBeginForm() { return "begin"; }

    // GetMapping과 PostMapping을 사용하고 싶으면 ResquestMapping으로 통합하여 사용
    @GetMapping("/register")
    public String showRegisterForm() {
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(Model model, @ModelAttribute("userDto") UserDto userDto) {
        //  서비스를 통해 회원가입 시도
        Boolean state = registerService.registerUser(userDto);

        if (state.equals(true)) {
            // 가입 성공 시
            model.addAttribute("message", "회원가입이 완료되었습니다.");
            return "begin";
        } else {
          // 가입 실패 시
           model.addAttribute("error", "회원가입에 실패했습니다.");
           return "register";
        }
    }

}