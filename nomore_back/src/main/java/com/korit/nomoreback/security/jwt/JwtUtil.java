package com.korit.nomoreback.security.jwt;

import com.korit.nomoreback.domain.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final long EXPIRED_TIME = 60000 * 60 * 12;  // 12시간
    private final Key KEY;

    public JwtUtil(@Value("${jwt.secret}") String secret) {
        KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    public String generateAccessToken(User user) {
        return Jwts.builder()
                .subject("access_token")
                .issuer("jinhyuk")
                .expiration(new Date(new Date().getTime() + EXPIRED_TIME))
                .claim("userId", user.getUserId())
                .signWith(KEY)
                .compact();
    }

    public String validateBearerToken(String token) {
        boolean isNull = token == null;
        if(isNull) {
            return null;
        }

        final String TOKEN_NAME = "Bearer ";
        boolean isNotStartedBearer = !token.startsWith(TOKEN_NAME);
        if(isNotStartedBearer) {
            return null;
        }

        return token.substring(TOKEN_NAME.length());
    }

    public Claims getClaims(String token) {
        try {
            return Jwts.parser().setSigningKey(KEY).build()
                    .parseClaimsJws(token).getBody();
        } catch (JwtException jwtException) {
            return null;
        }
    }


    public Integer getUserId(String token) {
        Claims claims = getClaims(token);
        if (claims == null) return null;

        Object userIdObj = claims.get("userId");
        if (userIdObj == null) return null;

        try {
            // 숫자 또는 문자열 모두 Integer로 변환
            return Integer.valueOf(userIdObj.toString());
        } catch (NumberFormatException e) {
            return null;
        }
    }

}









