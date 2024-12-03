package com.brettspiel.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Locale;

/**
 * Created by Quach Thanh Phong
 * On 9/16/2024 - 9:26 AM
 */
@Component
public class MessageUtils {

    @Autowired
    private MessageSource messageSource;



    public String translateMessage(String message, Object... args){
        Locale locale = LocaleContextHolder.getLocale();
        return messageSource.getMessage(message, args, locale);
    }

    public String translateMessage(String message, Locale locale, Object... args){
        return messageSource.getMessage(message, args, locale);
    }

}
