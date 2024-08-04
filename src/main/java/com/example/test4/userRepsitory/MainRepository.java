package com.example.test4.userRepsitory;


import com.example.test4.entity.speakentity.SpeakTestHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface MainRepository extends JpaRepository<SpeakTestHistoryEntity, Long> {
}
