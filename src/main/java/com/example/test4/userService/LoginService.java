package com.example.test4.userService;

import com.example.test4.dto.UserDto;
import com.example.test4.entity.UserEntity;
import com.example.test4.userRepsitory.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final LoginRepository loginRepository;

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public Boolean login(UserDto userDto) {
        try {
            // 사용자 아이디를 기반으로 사용자 엔티티를 검색합니다.
            UserEntity userEntity = loginRepository.findById(userDto.getId());

            // 사용자 엔티티가 존재하고, 비밀번호가 일치하는지 확인합니다.
            return userEntity != null && userEntity.getPw().equals(userDto.getPw());
        } catch (IncorrectResultSizeDataAccessException e) {
            // 여러 개의 결과가 반환된 경우
            return false;
        }

    }
}
