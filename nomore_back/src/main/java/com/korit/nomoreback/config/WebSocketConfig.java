package com.korit.nomoreback.config;

import com.korit.nomoreback.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;

import java.util.Map;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtUtil jwtUtil;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:5173")
                .addInterceptors(new JwtHandshakeInterceptor(jwtUtil))
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/pub");
        registry.enableSimpleBroker("/sub");
    }

    // JWT + moimId/userId 세팅 Interceptor
    private static class JwtHandshakeInterceptor implements HandshakeInterceptor {

        private final JwtUtil jwtUtil;

        public JwtHandshakeInterceptor(JwtUtil jwtUtil) {
            this.jwtUtil = jwtUtil;
        }

        @Override
        public boolean beforeHandshake(ServerHttpRequest request,
                                       ServerHttpResponse response,
                                       WebSocketHandler wsHandler,
                                       Map<String, Object> attributes) {

            if (request instanceof ServletServerHttpRequest servletRequest) {
                String accessToken = servletRequest.getServletRequest().getParameter("access_token");
                String moimId = servletRequest.getServletRequest().getParameter("moimId");
                String userId = servletRequest.getServletRequest().getParameter("userId");

                // JWT 검증
                if (accessToken != null) {
                    Integer parsedUserId = jwtUtil.getUserId(accessToken);
                    if (parsedUserId != null) {
                        attributes.put("userId", parsedUserId.toString());
                    }
                }

                // moimId/userId 세팅
                if (moimId != null) attributes.put("moimId", moimId);
                if (userId != null) attributes.put("userId", userId);
            }
            return true;
        }

        @Override
        public void afterHandshake(ServerHttpRequest request,
                                   ServerHttpResponse response,
                                   WebSocketHandler wsHandler,
                                   Exception exception) {
            // 처리 없음
        }
    }
}
