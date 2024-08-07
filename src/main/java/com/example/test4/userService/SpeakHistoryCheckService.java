package com.example.test4.userService;

import com.example.test4.entity.speakentity.SpeakTestHistoryEntity;
import com.example.test4.entity.speakentity.SpeakTestPaperEntity;
import com.example.test4.userRepsitory.SpeakTestHistoryRepository;
import com.example.test4.userRepsitory.SpeakTestPaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SpeakHistoryCheckService {

    @Autowired
    private SpeakTestHistoryRepository speakTestHistoryRepository;

    @Autowired
    private SpeakTestPaperRepository speakTestPaperRepository;

    public List<SpeakTestPaperEntity> quesCheck(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // 로그인 userId 뽑아오기
        String userId = null;

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername(); // 기본적으로 username을 ID로 사용
        }


        List<SpeakTestPaperEntity> selectedPapers = new ArrayList<>();

        // 추가적으로 사용자 lv에 따라서 메인 시험지에 띄울 방법을 생각해야됨 그냥 이 줄에 동일한 알고리즘 하나 추가해서 하든지 여러가지 방법?

        // Level 1, 상위 4개
        selectedPapers.addAll(speakTestPaperRepository.findTopNByLevel("1", userId, PageRequest.of(0, 4)));

        // Level 2, 상위 3개
        selectedPapers.addAll(speakTestPaperRepository.findTopNByLevel("2", userId,  PageRequest.of(0, 3)));

        // Level 3, 상위 3개
        selectedPapers.addAll(speakTestPaperRepository.findTopNByLevel("3", userId, PageRequest.of(0, 3)));

        // Level 4, 상위 3개
        selectedPapers.addAll(speakTestPaperRepository.findTopNByLevel("4", userId, PageRequest.of(0, 3)));

        return selectedPapers;

    }

}
