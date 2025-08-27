package com.korit.nomoreback.event;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Getter
@Component
public class ChatOnlineUsersState {

    private final Map<Integer, Set<Integer>> onlineUsersByMoim = new ConcurrentHashMap<>();

    public void addOnlineUserByMoimId(Integer moimId, Integer userId) {
        onlineUsersByMoim.computeIfAbsent(moimId, k -> ConcurrentHashMap.newKeySet()).add(userId);
    }

    public void removeOnlineUserByMoimId(Integer moimId, Integer userId) {
        Set<Integer> onlineUserSet = onlineUsersByMoim.get(moimId);
        onlineUserSet.remove(userId);
        onlineUsersByMoim.put(moimId, onlineUserSet);
        System.out.println("!!!!");
        System.out.println(onlineUsersByMoim);
    }

}
