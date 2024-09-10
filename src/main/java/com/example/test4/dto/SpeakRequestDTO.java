package com.example.test4.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor // 매개변수 없는 기본 생성자 자동 생성
public class SpeakRequestDTO {
    private List<Integer> arrScore;
    private List<String> arrText;
}
