package com.example.test4.config;

import com.example.test4.handler.CustomAuthenticationFailureHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/test", "/login", "/loginProc", "/join", "/joinProc","/begin","/speak/**").permitAll() // 이 부분 원래 /joinProc 제거하면 안 돌아가야함 나중에 오류 해결
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .requestMatchers("/my/**").hasAnyRole("ADMIN", "USER") // 추가적인 url 은 admin, user 만 가능
                        .anyRequest().authenticated() // 기타 요청은 인증된 사용자만 접근 가능
                );


        http
                .formLogin((auth) -> auth.loginPage("/login") // 인가 되지 않은 페이지에 들어가면 자동 /login 경로로 리다이렉트 + 로그인 성공시 자동 "/" 경로로 리다이렉트 되기 때문에 따로 지정해줘야함
                        .loginProcessingUrl("/loginProc")  // 이게 그건 거 같아 spring security 대신 로그인 하는 post 경로가 이거다! 라고 알려주는거?
                        .failureHandler(new CustomAuthenticationFailureHandler()) // 로그인 실패 시 handler 로 리다이렉트
                        .successHandler((request, response, authentication) -> {
                            for (GrantedAuthority auth2 : authentication.getAuthorities()) {
                                if (auth2.getAuthority().equals("ROLE_ADMIN")) {
                                    response.sendRedirect("/admin"); // admin 권한을 가진 사용자는 /admin으로 리다이렉트
                                    return;
                                }
                            }
                            response.sendRedirect("/main"); // admin 권한이 아닌 사용자는 /test로 리다이렉트
                        })
                        .permitAll()
                );

        http
                .csrf((auth) -> auth.disable()); // -> security 최신 버전은 자동 csrf enable 설정이 디폴트임 -> 배포전 <input type="hidden" name="_csrf" value="{{_csrf.token}}"/> 처리 해주기

        http
                .sessionManagement((auth) -> auth
                        .maximumSessions(1)  // 다중 로그인 최대 1개로 제한
                        .maxSessionsPreventsLogin(true)); // 새로운 로그인 차단

        http
                .sessionManagement((auth) -> auth
                        .sessionFixation().changeSessionId()); // 세션은 고정하고 쿠키에 전달할 때 쿠키 id 값 요청 시 변경

        http
                .logout((auth) -> auth.logoutUrl("/logout")
                        .logoutSuccessUrl("/test"));

        return http.build();
    }
}
