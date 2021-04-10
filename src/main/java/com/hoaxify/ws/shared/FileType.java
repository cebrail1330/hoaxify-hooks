package com.hoaxify.ws.shared;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;


@Target({ FIELD }) //nerde kullanılacağını belirttik
@Retention(RUNTIME)
@Constraint(validatedBy = { FileTypeValidator.class })
public @interface FileType {

	String message() default "{hoaxify.constraint.FileType.message}"; //kullanıcıya verilecek emsaj

	Class<?>[] groups() default { };
	
	Class<? extends Payload>[] payload() default { };
	
	String[] types();

}
