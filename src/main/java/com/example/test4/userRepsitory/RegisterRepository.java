package com.example.test4.userRepsitory;

import com.example.test4.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterRepository extends JpaRepository<UserEntity, Long> {
    // 추가적인 쿼리 메소드가 필요하다면 여기에 작성할 수 있습니다.
}
