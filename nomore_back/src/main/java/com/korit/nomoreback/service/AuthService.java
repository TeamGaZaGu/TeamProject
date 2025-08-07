package com.korit.nomoreback.service;

import com.korit.nomoreback.domain.user.User;
import com.korit.nomoreback.domain.user.UserMapper;
import com.korit.nomoreback.dto.auth.SignupReqDto;
import com.korit.nomoreback.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Transactional(rollbackFor = Exception.class)
    public User signup(SignupReqDto dto) throws BindException {
        User foundUser = userMapper.findByNicName(dto.getNickName());
        if (foundUser != null) {
            BindingResult bindingResult = new BeanPropertyBindingResult(foundUser, "");
            FieldError fieldError = new FieldError("nickName", "nickName", "이미 존재하는 사용자이름 입니다.");
            bindingResult.addError(fieldError);
            throw new BindException(bindingResult);
        }

        User signupUser = dto.toEntity();
        userMapper.insert(signupUser);
        jwtUtil.generateAccessToken(signupUser);
        return signupUser;
    }
}
