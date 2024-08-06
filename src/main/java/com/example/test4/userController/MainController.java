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

        List<?> selectedPapers = speakHistoryCheckService.quesCheck();

        // 데이터를 나누어 모델에 추가

        if(!selectedPapers.isEmpty()){ // history 차 있으면

            // 비지니스 로직 다 완성되면 여기 코드도 아래 처럼 채워넣어서 돌리면 됨

        }

        else{ // history 가 비어 있으면 (원래는 이렇게 짜면 안됨 testpaper도 비어져있을 수도 있으므로)
        model.addAttribute("firstPicture", selectedPapers.getFirst());
        model.addAttribute("pictures1", selectedPapers.subList(1, 4));  // 2번째, 3번째, 4번째
        model.addAttribute("pictures2", selectedPapers.subList(4, 7));  // 5번째, 6번째, 7번째
        model.addAttribute("pictures3", selectedPapers.subList(7, 10)); // 8번째, 9번째, 10번째
        model.addAttribute("pictures4", selectedPapers.subList(10, 13)); // 11번째, 12번째, 13번째
        }
        return "main";  // 차있으면 true 비어있으면 false
    }

    @GetMapping("/webRTC")
    public String redirectToHome(RedirectAttributes redirectAttributes) {
        return "redirect:/";
    }


}
