package com.korit.nomoreback.config;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:5173")
                .addInterceptors(new JwtHandshakeInterceptor(jwtUtil, userMapper))
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/pub");
        registry.enableSimpleBroker("/sub");
    }

    // JWT Interceptor
    private static class JwtHandshakeInterceptor implements HandshakeInterceptor {

        private final JwtUtil jwtUtil;
        private final UserMapper userMapper;

        public JwtHandshakeInterceptor(JwtUtil jwtUtil, UserMapper userMapper) {
            this.jwtUtil = jwtUtil;
            this.userMapper = userMapper;
        }

        @Override
        public boolean beforeHandshake(org.springframework.http.server.ServerHttpRequest request,
                                       org.springframework.http.server.ServerHttpResponse response,
                                       WebSocketHandler wsHandler,
                                       Map<String, Object> attributes) {

            System.out.println("=== WebSocket Handshake 시작 ===");

            if (request instanceof org.springframework.http.server.ServletServerHttpRequest servletRequest) {
                // 헤더 대신 query parameter에서 access_token 읽기
                String token = servletRequest.getServletRequest().getParameter("access_token");
                System.out.println("받은 access_token: " + token);

                if (token != null) {
                    Integer userId = jwtUtil.getUserId(token); // 토큰에서 userId 추출
                    System.out.println("토큰에서 추출한 userId: " + userId);

                    if (userId != null) {
                        User user = userMapper.findById(userId);
                        System.out.println("DB에서 조회한 User: " + user);

                        if (user != null) {
                            attributes.put("user", user); // 세션에 user 저장
                            System.out.println("WebSocket 세션 attributes에 user 저장 완료");
                        } else {
                            System.out.println("DB에 user 없음");
                        }
                    } else {
                        System.out.println("토큰에서 userId 추출 실패");
                    }
                } else {
                    System.out.println("access_token 없음");
                }
            }

            System.out.println("=== WebSocket Handshake 종료 ===");
            return true;
        }

        @Override
        public void afterHandshake(org.springframework.http.server.ServerHttpRequest request,
                                   org.springframework.http.server.ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Exception exception) {

        }
    }
}
