package com.example.test4.userController;

import com.example.test4.entity.speakentity.SpeakQuestionEntity;
import com.example.test4.userService.SpeakLoadTestService;
import com.example.test4.userService.SpeakTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class SpeakTestController {

    @Autowired
    private SpeakTestService speakTestService;

    @Autowired
    private SpeakLoadTestService speakLoadTestService;

    @GetMapping("/speak")
    public String speak(@RequestParam(name = "id") int paperId, Model model) {

        List<String> loadPicture = speakLoadTestService.loadPicture(paperId);
        List<String> loadText = speakLoadTestService.loadText(paperId);


        model.addAttribute("picture", loadPicture);
        model.addAttribute("text", loadText);
        return "speak";
    }

    @PostMapping("/speak")  // post 방식에서 파라미터를 받아올 수 있는 방법은 이렇게 {{id}} 자체를 보내서 받아오는 방법이랑 Ajax 밖에 없는 거 같음 흠..
    public ResponseEntity<Map<String, String>> handleSpeak(@RequestParam(name = "id", required = false, defaultValue = "0") int paperId) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Submission successful!");

        speakTestService.paperSave(paperId);
        return ResponseEntity.ok(response);
    }

}

