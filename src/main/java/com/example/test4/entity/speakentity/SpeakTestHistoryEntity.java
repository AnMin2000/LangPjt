package com.example.test4.entity.speakentity;

import com.example.test4.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Table(name = "SpeakTestHistoryEntity")
@Getter
@Setter
public class SpeakTestHistoryEntity {

    @Id //엔티티클래스 기본키 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 자동생성
    private Long id;

    @Column(unique = true)
    private String test_paper;
    @Column(unique = true)
    private String test_history;

    @ManyToOne // 다대일
    @JoinColumn(name = "user_id", referencedColumnName = "id") //
    private UserEntity user;
    // Getters and setters
}
