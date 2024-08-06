package com.example.test4.userController;

import com.example.test4.userService.SpeakTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class SpeakTestController {

    @Autowired
    private SpeakTestService speakTestService;

    @GetMapping("/speak")
    public String speak() {
        return "speak";
    }

    @PostMapping("/speak")  // post 방식에서 파라미터를 받아올 수 있는 방법은 이렇게 {{id}} 자체를 보내서 받아오는 방법이랑 Ajax 밖에 없는 거 같음 흠..
    public ResponseEntity<Map<String, String>> handleSpeak(@RequestParam(name = "id", required = false, defaultValue = "0") int paperId) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Submission successful!");

        speakTestService.paperSave(paperId);
        return ResponseEntity.ok(response);
    }


    private String getContentForId(int id) {
        // ID에 따라 적절한 콘텐츠를 반환합니다. 예를 들어:
        return switch (id) {
            case 1 -> "Content for Image 1";
            case 2 -> "Content for Image 2";
            // 추가적인 케이스를 추가합니다.
            default -> "Content for Image" + id;
        };
    }
}

