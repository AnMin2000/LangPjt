package com.example.test4.userService;

import com.example.test4.dto.CustomUserDetails;
import com.example.test4.entity.UserEntity;
import com.example.test4.userRepsitory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService { // 해당 userName을 갖고있는 사람이 있는지 검색

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity userData = userRepository.findById(username);

        if (userData != null) {

            return new CustomUserDetails(userData);
        }

        return null;
    }
}
