package com.example.test4.userRepsitory;


import com.example.test4.entity.speakentity.SpeakTestHistoryEntity;
import com.example.test4.entity.speakentity.SpeakTestPaperEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpeakTestHistoryRepository extends JpaRepository<SpeakTestHistoryEntity, Long> {
    @Query("SELECT s.test_paper FROM SpeakTestHistoryEntity s WHERE s.user_id.id = :userId")
    List<SpeakTestPaperEntity> findTestPapersByUserId(@Param("userId") String userId);
}
