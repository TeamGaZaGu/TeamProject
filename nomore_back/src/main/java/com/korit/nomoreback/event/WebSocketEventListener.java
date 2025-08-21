package com.korit.nomoreback.event;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessagingTemplate template;
    private final Map<Integer, Set<String>> onlineUsersByMoim = new ConcurrentHashMap<>();

    // Connect 이벤트
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        Map<String, Object> sessionAttrs = accessor.getSessionAttributes();
        if (sessionAttrs == null) return;

        String moimIdStr = (String) sessionAttrs.get("moimId");
        String userId = (String) sessionAttrs.get("userId");

        if (moimIdStr == null || userId == null) {
            System.out.println("❌ moimId or userId header 없음 (connect)");
            return;
        }

        try {
            Integer moimId = Integer.parseInt(moimIdStr);
            onlineUsersByMoim.computeIfAbsent(moimId, k -> ConcurrentHashMap.newKeySet()).add(userId);

            // 온라인 유저 리스트 브로드캐스트
            template.convertAndSend("/sub/chat/" + moimId + "/online",
                    onlineUsersByMoim.get(moimId).stream().map(String::valueOf).toList());

            System.out.println("✅ 접속: moimId=" + moimId + ", userId=" + userId);
        } catch (NumberFormatException e) {
            System.out.println("❌ moimId 숫자 변환 실패 (connect): " + e.getMessage());
        }
    }

    // Disconnect 이벤트
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        Map<String, Object> sessionAttrs = accessor.getSessionAttributes();
        if (sessionAttrs == null) return;

        String moimIdStr = (String) sessionAttrs.get("moimId");
        String userId = (String) sessionAttrs.get("userId");

        if (moimIdStr == null || userId == null) {
            System.out.println("❌ moimId or userId header 없음 (disconnect)");
            return;
        }

        try {
            Integer moimId = Integer.parseInt(moimIdStr);
            Set<String> online = onlineUsersByMoim.getOrDefault(moimId, ConcurrentHashMap.newKeySet());
            online.remove(userId);

            template.convertAndSend("/sub/chat/" + moimId + "/online",
                    online.stream().map(String::valueOf).toList());

            System.out.println("✅ 접속 해제: moimId=" + moimId + ", userId=" + userId);
        } catch (NumberFormatException e) {
            System.out.println("❌ moimId 숫자 변환 실패 (disconnect): " + e.getMessage());
        }
    }
}
