package com.example.test4.springbootwebrtcpeer2peer;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

  // '/' 경로에 대한 요청을 'index.html'로 포워딩하기 위한 ViewController 설정
  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/").setViewName("forward:/index.html");
  }

  // CORS (Cross-Origin Resource Sharing) 설정 추가
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    // 모든 경로에 대한 CORS 허용 설정
    registry.addMapping("/**").allowedOriginPatterns("*");
  }
}
