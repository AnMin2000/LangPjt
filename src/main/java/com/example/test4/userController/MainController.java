package com.example.test4.userController;

import com.example.test4.entity.speakentity.SpeakTestPaperEntity;
import com.example.test4.userService.SpeakHistoryCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class MainController {

    @Autowired
    private SpeakHistoryCheckService speakHistoryCheckService;
    @GetMapping("/main")
    public String showMainForm(Model model) {

        List<SpeakTestPaperEntity> selectedPapers = speakHistoryCheckService.quesCheck();

        // 데이터를 나누어 모델에 추가

        // 다 개소리고 그냥 받아와서 쓰면 됨 어차피 List 형식이 testPaper 일 수밖에 없음

        model.addAttribute("firstPicture", selectedPapers.getFirst());
        model.addAttribute("pictures1", selectedPapers.subList(1, 4));  // 2번째, 3번째, 4번째
        model.addAttribute("pictures2", selectedPapers.subList(4, 7));  // 5번째, 6번째, 7번째
        model.addAttribute("pictures3", selectedPapers.subList(7, 10)); // 8번째, 9번째, 10번째
        model.addAttribute("pictures4", selectedPapers.subList(10, 13)); // 11번째, 12번째, 13번째

        return "main";  // 차있으면 true 비어있으면 false
    }

    @GetMapping("/webRTC")
    public String redirectToHome(RedirectAttributes redirectAttributes) {
        return "redirect:/";
    }


}
