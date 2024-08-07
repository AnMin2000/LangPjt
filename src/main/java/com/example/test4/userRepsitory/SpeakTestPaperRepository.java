package com.example.test4.userRepsitory;

import com.example.test4.entity.speakentity.SpeakTestPaperEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SpeakTestPaperRepository extends JpaRepository<SpeakTestPaperEntity, Long> {
    @Query("""
    SELECT s 
    FROM SpeakTestPaperEntity s 
    WHERE s.level = :level 
    AND (
        :userId IS NULL 
        OR NOT EXISTS (
            SELECT 1 
            FROM SpeakTestHistoryEntity h 
            WHERE h.user_id.id = :userId 
            AND h.test_paper.id = s.id
        )
    )
    ORDER BY s.id ASC
    """)
    List<SpeakTestPaperEntity> findTopNByLevel(
            @Param("level") String level,
            @Param("userId") String userId,
            Pageable pageable
    );

}
