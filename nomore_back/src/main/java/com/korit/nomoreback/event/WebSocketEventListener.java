package com.korit.nomoreback.event;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.converter.GenericMessageConverter;
import org.springframework.messaging.core.GenericMessagingTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final ChatOnlineUsersState chatOnlineUsersState;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {

        Map<String, Object> nativeHeaders = (Map<String, Object>) ((GenericMessage) event.getMessage()
                .getHeaders().get("simpConnectMessage")).getHeaders().get("nativeHeaders");

        System.out.println(nativeHeaders);

        Object moimRaw = nativeHeaders.get("moimId");
        Object userRaw = nativeHeaders.get("userId");

        if (moimRaw == null || userRaw == null) {
            System.out.println("연결에 필요한 정보 없음.!!! 연결 무시됨");
            return;
        }

        List<Object> moimIdList = List.copyOf((List<Object>) moimRaw);
        List<Object> userIdList = List.copyOf((List<Object>) userRaw);

        if (moimIdList.isEmpty() || userIdList.isEmpty()) {
            System.out.println("연결에 필요한 정보 없음. 연결 무시됨");
            return;
        }

        Integer moimId = Integer.parseInt((String) moimIdList.get(0));
        Integer userId = Integer.parseInt((String) userIdList.get(0));

        chatOnlineUsersState.addOnlineUserByMoimId(moimId, userId);
    }

}
