package com.hoaxify.ws.user;


import static java.lang.annotation.ElementType.FIELD;

import static java.lang.annotation.RetentionPolicy.RUNTIME;


import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ FIELD }) //nerde kullanılacağını belirttik
@Retention(RUNTIME)
@Constraint(validatedBy = { UniqueUsernameValidator.class })//
public @interface UniqueUsername {
	String message() default "{hoaxify.constraint.username.UniqueUsername.message}"; //kullanıcıya verilecek emsaj

	Class<?>[] groups() default { };
	
	Class<? extends Payload>[] payload() default { };

	
}
