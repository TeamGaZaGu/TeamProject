package com.korit.nomoreback.config;

import com.korit.nomoreback.security.handler.OAuth2SuccessHandler;
import com.korit.nomoreback.service.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;

    @Bean
<<<<<<< HEAD
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/signin/**", "/oauth2/**").permitAll()
                        .anyRequest().authenticated()
=======
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOriginPattern(CorsConfiguration.ALL);
        corsConfiguration.addAllowedMethod(CorsConfiguration.ALL);
        corsConfiguration.addAllowedHeader(CorsConfiguration.ALL);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults());
        http.csrf(csrf -> csrf.disable());
        http.formLogin(formLogin -> formLogin.disable());
        // Restful API -> 무상태성
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Filter Setting
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeHttpRequests(auth -> {
            auth.requestMatchers("/oauth2/**").permitAll();
            auth.requestMatchers("/api/auth/**").permitAll();
            auth.requestMatchers("/api/search/category").permitAll();
            auth.requestMatchers("/api/search/district").permitAll();
            auth.requestMatchers("/api/create").permitAll();
            auth.anyRequest().authenticated();
        });

        http.exceptionHandling(handling ->
                handling.authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(401);
                        }
>>>>>>> origin/46-모임-생성-기능-구현
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("http://localhost:5173/auth/signin")
                        .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService))
                        .successHandler(successHandler)
                );

        return http.build();
    }

}
