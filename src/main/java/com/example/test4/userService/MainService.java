package com.example.test4.userService;

import com.example.test4.entity.speakentity.SpeakTestHistoryEntity;
import com.example.test4.userRepsitory.MainRepository;
import com.example.test4.userRepsitory.UserRepository;
import org.eclipse.jdt.internal.compiler.batch.Main;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;

@Service
public class MainService {

    @Autowired
    private MainRepository mainRepository;




}
