package com.example.test4.userService;

import com.example.test4.entity.UserEntity;
import com.example.test4.entity.speakentity.SpeakQuestionEntity;
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

import java.util.List;

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

    public void score(int paperId, List<Integer> arrScore, List<String> arrText){ // 점수 테이블에 등록하는 로직

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // 로그인 userId 뽑아오기
        String userId = null;

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername(); // 기본적으로 username을 ID로 사용
        }

        SpeakQuestionEntity speakQuestionEntity = new SpeakQuestionEntity(); // 본 테이블
        SpeakTestHistoryEntity speakTestHistoryEntity = new SpeakTestHistoryEntity(); // paperId 하고 userId 넣어서 id 찾으면 됨
        // 세번째(1) : (스피킹 시험지 엔티티)에 주키에 paperId만 넣어서 [스피킹 문제 테이블]에서의 주키와 일치하는 엔티티를 모조리 뽑아서 [스피킹 점수 테이블]에 넣는다
    }
}
