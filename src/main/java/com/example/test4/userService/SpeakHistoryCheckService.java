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

    public List<?> quesCheck(){ // 시험을 한번이라도 안 봤으면 else 이동 한번이라도 봤으면 if 이동

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // 로그인 userId 뽑아오기
        String userId = null;

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userId = userDetails.getUsername(); // 기본적으로 username을 ID로 사용
        }
        List<SpeakTestPaperEntity> histroyList = speakTestHistoryRepository.findTestPapersByUserId(userId);
        // 여기에 추가로 speakTestPaper 테이블에서 위에서 나온 값 빼서 순서대로 다시 갖고오는 쿼리문으로 바꿔야지~

        if (!histroyList.isEmpty()) {  // history 가 존재

            // 디비 순서 :
            // 1. 우선 history 를 뒤져 이미 본 시험의 시험지 id 값을 가져온다 햇음
            // 2. 원래 testPaperRepo 에 있는 쿼리문에서 history 쿼리문을 뺀 결과값을 가져온다

            for (SpeakTestPaperEntity paper : histroyList) {
                System.out.println(paper.getId());
            }
           return histroyList;


        } else {
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


}
