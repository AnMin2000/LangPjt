package com.example.test4.userService;

import com.example.test4.entity.speakentity.SpeakQuestionEntity;
import com.example.test4.entity.speakentity.SpeakTestPaperEntity;
import com.example.test4.userRepsitory.SpeakQuestionRepository;
import com.example.test4.userRepsitory.SpeakTestPaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SpeakLoadTestService {
    @Autowired
    private SpeakQuestionRepository speakQuestionRepository;
    @Autowired
    private SpeakTestPaperRepository speakTestPaperRepository;
    public List<String> loadPicture(int paperId){

        SpeakTestPaperEntity paper = speakTestPaperRepository.findById((long)paperId)
                .orElseThrow(() -> new RuntimeException("Paper not found with ID: " + paperId));

        return speakQuestionRepository.findPictureByPaperId(paper);
    }

    public List<String> loadText(int paperId){

        SpeakTestPaperEntity paper = speakTestPaperRepository.findById((long)paperId)
                .orElseThrow(() -> new RuntimeException("Paper not found with ID: " + paperId));

        return speakQuestionRepository.findTextByPaperId(paper);
    }
}
