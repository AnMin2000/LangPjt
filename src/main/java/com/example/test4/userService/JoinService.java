package com.example.test4.userService;

import com.example.test4.dto.JoinDTO;
import com.example.test4.entity.UserEntity;
import com.example.test4.userRepsitory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void joinProcess(JoinDTO joinDTO) {


        //db에 이미 동일한 username을 가진 회원이 존재하는지?
        boolean isUser = userRepository.existsById(joinDTO.getUsername());
        if (isUser) {
            return;
        }


        UserEntity data = new UserEntity();

        data.setId(joinDTO.getUsername());
        data.setPw(bCryptPasswordEncoder.encode(joinDTO.getPassword()));
        data.setRole("ROLE_USER");


        userRepository.save(data);
    }

}
