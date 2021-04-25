package com.hoaxify.ws.configuration;

import java.io.IOException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) //kullanıcın yetkisi varmı diye kontrol edecek
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

	@Autowired
	UserAuthService userAuthService;
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();//gizli bir input var onu iptal etmek için
		
		//browserın açtığı header kaldırmak için kendi authenticationEntryPoint'ımızı yazdık
		http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());
		
		http.headers().frameOptions().disable();
		
		//gelen requestin doğru almasını sağlar
		http.authorizeRequests()
				.antMatchers(HttpMethod.POST, "/api/1.0/auth").authenticated()
				.antMatchers(HttpMethod.PUT, "/api/1.0/users/{username}").authenticated()
				.antMatchers(HttpMethod.POST, "/api/1.0/hoaxes").authenticated()
				.antMatchers(HttpMethod.POST, "/api/1.0/hoax-attachments").authenticated()
		.and()
		.authorizeRequests().anyRequest().permitAll();//bunun dışında kalan herhangi bir request'e bakmayacak
		
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);//session üretmeyecek
	}
	
	//gelen username kontrolü için
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userAuthService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
