package com.example.test4.userRepsitory;

import com.example.test4.entity.RefreshEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface RefreshRepository extends JpaRepository<RefreshEntity, Long> {

    Boolean existsByRefresh(String refresh); // 존재하는지 확인하는 메소드

    @Transactional
    void deleteByRefresh(String refresh); // 리프레시 토큰 삭제 메서드
}