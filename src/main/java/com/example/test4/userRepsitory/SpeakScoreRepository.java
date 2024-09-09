package com.example.test4.userRepsitory;

import com.example.test4.entity.speakentity.SpeakScoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpeakScoreRepository extends JpaRepository<SpeakScoreEntity,Long> {
}
