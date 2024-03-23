package com.example.test4.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Table(name = "user")
@Getter
@Setter
public class UserEntity {

    @Id //엔티티클래스 기본키 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동생성
    private Long pin;

    @Column(length = 10)
    private String id;
    @Column(length = 10)
    private String pw;

    // Getters and setters
}
