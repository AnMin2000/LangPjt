package com.example.test4.userController;

import com.example.test4.entity.speakentity.SpeakTestHistoryEntity;
import com.example.test4.userRepsitory.MainRepository;
import com.example.test4.userService.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class MainController {

    @Autowired
    private MainService mainService;
    @GetMapping("/main")
    public String showMainForm() {

       return "main";  // 차있으면 true 비어있으면 false
    }

    @GetMapping("/webRTC")
    public String redirectToHome(RedirectAttributes redirectAttributes) {
        return "redirect:/";
    }


}
