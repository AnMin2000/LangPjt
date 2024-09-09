package com.example.test4.entity.speakentity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Table(name = "SpeakScore")
@Getter
@Setter
public class SpeakScoreEntity {

    @Id //엔티티클래스 기본키 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동생성
    private Long pin;

    @ManyToOne
    @JoinColumn(name = "history", referencedColumnName = "id")
    private SpeakTestHistoryEntity history; // 시험 내역

    @ManyToOne
    @JoinColumn(name = "question", referencedColumnName = "pin")
    private SpeakQuestionEntity question; // 시험 내역

    private int score; // 점수
    private String input; // 사용자 입력 값
}
