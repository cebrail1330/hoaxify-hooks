package com.hoaxify.ws.shared;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ElementType.PARAMETER}) //nerde kullanılacağını belirttik
@Retention(RUNTIME)
@AuthenticationPrincipal
public @interface CurrentUser {

}
