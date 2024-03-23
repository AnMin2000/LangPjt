package com.example.test4.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor // 매개변수 없는 기본 생성자 자동 생성
public class UserDto {
    private String id;
    private String pw;
}
