package com.example.test4.userRepsitory;

import com.example.test4.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Boolean existsById(String username);
    UserEntity findById(String username);
}
