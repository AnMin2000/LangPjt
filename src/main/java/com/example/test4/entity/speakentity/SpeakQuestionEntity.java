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
        private Long pin;

        @ManyToOne
        @JoinColumn(name = "paper_id", referencedColumnName = "id") // 외래 키 열과 참조 열을 명시
        private SpeakTestPaperEntity paper_id;
        private String question;
        private String picture;
        // Getters and setters

}
