package com.example.test4.userController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MainController {

    @GetMapping("/main")
    public String showMainForm() { return "main"; }

    @GetMapping("/webRTC")
    public String redirectToHome(RedirectAttributes redirectAttributes) {
        return "redirect:/";
    }
}
