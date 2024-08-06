package com.example.test4.userService;

import com.example.test4.entity.speakentity.SpeakTestHistoryEntity;
import com.example.test4.entity.speakentity.SpeakTestPaperEntity;
import com.example.test4.userRepsitory.SpeakTestHistoryRepository;
import com.example.test4.userRepsitory.SpeakTestPaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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

        List<SpeakTestHistoryEntity> userList = speakTestHistoryRepository.findAll();


        if (!userList.isEmpty()) {
//            System.out.println("존재");
//            return null; // 존재할 경우 추가 로직 반환
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
