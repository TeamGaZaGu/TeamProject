package com.korit.nomoreback.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ResponseDto<T> {
    private int code;
    private String message;
    private T body;

    public static <T> ResponseDto<T> success(HttpStatus status, String message, T body) {
        return new ResponseDto<>(status.value(), message, body);
    }

    public static <T> ResponseDto<T> success(String message) {
        return new ResponseDto<>(HttpStatus.OK.value(), message, null);
    }

    public static <T> ResponseDto<T> success(T body) {
        return new ResponseDto<>(HttpStatus.OK.value(), "성공", body);
    }

    public static <T> ResponseDto<T> fail(HttpStatus status, String message, T body) {
        return new ResponseDto<>(status.value(), message, body);
    }

    public static <T> ResponseDto<T> fail(HttpStatus status, String message) {
        return new ResponseDto<>(status.value(), message, null);
    }
}
