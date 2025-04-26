package com.brettspiel.exception;

import com.brettspiel.utils.R;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.ArrayList;
import java.util.Objects;

/**
 * Created by Quach Thanh Phong
 * On 4/20/2023 - 5:26 PM
 */
@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public R<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error(e.getMessage());
        return R.failed(Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage());
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseBody
    public R<?> handlerNoFoundException(Exception e) {
        log.error(e.getMessage());
        return R.failed("Invalid request.");
    }

    @ExceptionHandler(DuplicateKeyException.class)
    @ResponseBody
    public R<?> handleDuplicateKeyException(DuplicateKeyException e) {
        log.error(e.getMessage());
        return R.failed("Invalid data.");
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseBody
    public R<?> handleConstraintViolationException(ConstraintViolationException e) {
        log.error(e.getMessage());
        return R.failed(new ArrayList<>(e.getConstraintViolations()).getFirst().getMessage());
    }

    @ExceptionHandler(BindException.class)
    @ResponseBody
    public R<?> handleBindException(BindException e) {
        log.error(e.getMessage());
        return R.failed(Objects.requireNonNull(e.getFieldError()).getDefaultMessage());
    }

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public R<?> error(Exception e) {
        log.error(e.getMessage());
        return R.failed(e.getMessage());
    }

}
