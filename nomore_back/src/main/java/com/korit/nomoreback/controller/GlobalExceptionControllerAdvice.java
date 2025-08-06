package com.korit.nomoreback.controller;

import com.korit.nomoreback.dto.response.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionControllerAdvice {

    @ExceptionHandler(BindException.class)
    public ResponseEntity<ResponseDto<?>> validException(BindException e) {
        Map<String, String> errorMap = e.getFieldErrors()
                .stream()
                .collect(Collectors
                        .toMap(
                                (fieldError) -> fieldError.getField(),
                                fieldError -> fieldError.getDefaultMessage()
                        ));
        return ResponseEntity.badRequest().body(ResponseDto.fail(HttpStatus.BAD_REQUEST, "요청 데이터 유효성 검사 오류", errorMap));
    }
}
