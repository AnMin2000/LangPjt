package com.example.test4.userService;

import com.example.test4.dto.UserDto;
import com.example.test4.userRepsitory.RegisterRepository;
import com.example.test4.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    private final RegisterRepository registerRepository;

    @Autowired
    public RegisterService(RegisterRepository registerRepository) {
        this.registerRepository = registerRepository;
    }

    public Boolean registerUser(UserDto userDto) {
        // 여기에 실제 회원가입 로직을 구현합니다.
        // 예를 들어, 비밀번호 해싱, 중복 사용자 확인 등의 작업을 수행할 수 있습니다.

        UserEntity newUser = new UserEntity();
        newUser.setId(userDto.getId());
        newUser.setPw(userDto.getPw());

        registerRepository.save(newUser);
        return true;
    }
}