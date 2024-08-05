package com.example.test4.userController;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class SpeakController {

    @GetMapping("/speak")
    public String speak() {
        return "speak";
    }

    @PostMapping("/speak")
    public ResponseEntity<Map<String, String>> handleSpeak() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Submission successful!");

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

