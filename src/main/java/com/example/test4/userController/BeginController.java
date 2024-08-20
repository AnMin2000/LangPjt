package com.example.test4.userController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BeginController {

    @GetMapping("/begin")
    public String admin() {
        return "begin";
    }

}
