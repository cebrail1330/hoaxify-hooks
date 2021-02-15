package com.hoaxify.ws.user;

import javax.validation.Valid;


import com.hoaxify.ws.shared.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.vm.UserVM;

@RestController //spring boot

public class UserController {
	
	
	@Autowired
	UserService userService;

	@PostMapping("/api/1.0/users")
	public GenericResponse createUser(@Valid @RequestBody User user) {
		userService.save(user);
		return new GenericResponse("user created"); //json stringine dönderecek mesaj yayınlanacak
		
	}
	
	//Kullanıcıların veritabnından alınması
	@GetMapping("/api/1.0/users")
	Page<UserVM> getUsers(Pageable page, @CurrentUser User user){
		//veritabanından istenilen fieldlerin alınmasını sağlar
		//User tipindeki objeyi userVM'e dönüştürürecek 
		return userService.getUsers(page, user).map(UserVM:: new );//UserVM::objeleri new tek tek userVM'in constructorunna gönderecek
	}
	
}
