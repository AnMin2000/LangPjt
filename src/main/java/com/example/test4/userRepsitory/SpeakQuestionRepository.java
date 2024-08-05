package com.example.test4.userRepsitory;

import com.example.test4.entity.speakentity.SpeakQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeakQuestionRepository extends JpaRepository<SpeakQuestionEntity, Long> {
}
