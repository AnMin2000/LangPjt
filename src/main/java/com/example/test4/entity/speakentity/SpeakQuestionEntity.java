package com.example.test4.entity.speakentity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Table(name = "SpeakQuestion")
@Getter
@Setter
public class SpeakQuestionEntity {

        @Id //엔티티클래스 기본키 지정
        @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동생성
        private Long id;
        private String question;
        private String picture;
        // Getters and setters

}
