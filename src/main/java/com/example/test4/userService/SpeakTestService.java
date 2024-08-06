package com.example.test4.userService;

import com.example.test4.entity.UserEntity;
import com.example.test4.entity.speakentity.SpeakTestHistoryEntity;
import com.example.test4.entity.speakentity.SpeakTestPaperEntity;
import com.example.test4.userRepsitory.SpeakTestHistoryRepository;
import com.example.test4.userRepsitory.SpeakTestPaperRepository;
import com.example.test4.userRepsitory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class SpeakTestService {

    @Autowired
    private SpeakTestHistoryRepository speakTestHistoryRepository;
    @Autowired
    private SpeakTestPaperRepository speakTestPaperRepository;
    @Autowired
    private UserRepository userRepository;

    public void paperSave(int paperId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // 로그인 userId 뽑아오기
        String userId = null;

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername(); // 기본적으로 username을 ID로 사용
        }

        SpeakTestHistoryEntity speakTestHistoryEntity = new SpeakTestHistoryEntity();

        SpeakTestPaperEntity testPaper = speakTestPaperRepository.findById((long) paperId)
                .orElseThrow(() -> new RuntimeException("Test paper not found"));
        speakTestHistoryEntity.setTest_paper(testPaper);

        UserEntity userEntity = userRepository.findById(userId);
        speakTestHistoryEntity.setUser_id(userEntity);

        speakTestHistoryRepository.save(speakTestHistoryEntity);  // 시험지ID랑 유저ID 히스토리 디비에 저장

    }
}
