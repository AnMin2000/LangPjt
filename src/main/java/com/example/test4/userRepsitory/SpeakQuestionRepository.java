package com.example.test4.userRepsitory;

import com.example.test4.entity.speakentity.SpeakQuestionEntity;
import com.example.test4.entity.speakentity.SpeakTestPaperEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface SpeakQuestionRepository extends JpaRepository<SpeakQuestionEntity, Long> {
    @Query("SELECT sq.picture FROM SpeakQuestionEntity sq WHERE sq.paper_id = :paperId")
    List<String> findPictureByPaperId(@Param("paperId") SpeakTestPaperEntity paper);

    @Query("SELECT sq.question FROM SpeakQuestionEntity sq WHERE sq.paper_id = :paperId")
    List<String> findTextByPaperId(@Param("paperId") SpeakTestPaperEntity paper);
}
