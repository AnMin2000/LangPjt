package com.example.test4.entity.speakentity;

import com.example.test4.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Table(name = "SpeakTestHistory",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"test_paper", "user_id"})
        })
@Getter
@Setter
public class SpeakTestHistoryEntity {

    @Id //엔티티클래스 기본키 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동생성
    private Long id;

    @ManyToOne
    @JoinColumn(name = "test_paper", referencedColumnName = "id")
    private SpeakTestPaperEntity test_paper;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user_id;
    // Getters and setters
}
