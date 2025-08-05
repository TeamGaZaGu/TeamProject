package com.korit.nomoreback.security.jwt;

import com.korit.nomoreback.security.model.PrincipalUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {
    private final Key secretKey = Keys.hmacShaKeyFor("SuperSecretKeyForJwtSigning1234567890".getBytes());

    private final long expiration = 1000 * 60 * 60;

    public String generateToken(PrincipalUser user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("email", user.getUser().getEmail()) // 필요에 따라 claim 추가
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }
}
