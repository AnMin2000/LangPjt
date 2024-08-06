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

    public List<SpeakTestPaperEntity> quesCheck(){ // 시험을 한번이라도 안 봤으면 else 이동 한번이라도 봤으면 if 이동

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // 로그인 userId 뽑아오기
        String userId = null;

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername(); // 기본적으로 username을 ID로 사용
        }

        // ******************* 여기에 if else 추가해서 history 에 userId 가 있는지 없는지 비교하는 로직 추가
        // 1. history 에 현재 접속중인 userId의 시험지가 있다면 repository 에서 안 본 시험지 순서대로 갖고오는 로직 (아래랑 동일할듯 어차피 DB만 건들면 끝이라)
        // 2. history 에 현재 접속중인 userId의 시험지가 없다면 아래 그냥 쭉 출력하면됨

        List<SpeakTestPaperEntity> histroyList = speakTestHistoryRepository.findTestPapersByUserId(userId); //  <-- 이건 정장 작동 하니까 활용 잘해서 해봐
        System.out.println("****************"+!histroyList.isEmpty()+"*****************");

            List<SpeakTestPaperEntity> selectedPapers = new ArrayList<>();

            // Level 1, 상위 4개
            selectedPapers.addAll(speakTestPaperRepository.findTopNByLevel("1", PageRequest.of(0, 4)));

            // Level 2, 상위 3개
            selectedPapers.addAll(speakTestPaperRepository.findTopNByLevel("2", PageRequest.of(0, 3)));

            // Level 3, 상위 3개
            selectedPapers.addAll(speakTestPaperRepository.findTopNByLevel("3", PageRequest.of(0, 3)));

            // Level 4, 상위 3개
            selectedPapers.addAll(speakTestPaperRepository.findTopNByLevel("4", PageRequest.of(0, 3)));

            return selectedPapers;

    }


}
