package com.example.test4.entity.speakentity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Table(name = "SpeakTestPaper")
@Getter
@Setter
public class SpeakTestPaperEntity {

    @Id //엔티티클래스 기본키 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동생성
    private Long id;

    private String picture;
    private String level;
    private String language;
    // Getters and setters
}
