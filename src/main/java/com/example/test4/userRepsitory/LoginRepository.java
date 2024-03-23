package com.example.test4.userRepsitory;

import com.example.test4.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface LoginRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findById(String userId);
}
