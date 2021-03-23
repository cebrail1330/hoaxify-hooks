package com.hoaxify.ws.user;

import javax.validation.Valid;


import com.hoaxify.ws.shared.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.vm.UserVM;

//Kullanıcı ile ilgili büütün http'lerin ilk ulaştığı yer endpoint

@RestController //spring boot
@RequestMapping("api/1.0")
public class UserController {
	@Autowired
	UserService userService;

	//@RequestBody gelen requestin içindeki body almaya yarar
	//GenericResponse geri dönüşte kullanıcıya gösterilecek mesaj
	@PostMapping("/users")
	public GenericResponse createUser(@Valid @RequestBody User user) {
		userService.save(user);
		return new GenericResponse("user created"); //json stringine dönderecek mesaj yayınlanacak
		
	}
	
	//Kullanıcıların veritabnından alınması
	@GetMapping("/users")
	Page<UserVM> getUsers(Pageable page, @CurrentUser User user){
		//veritabanından istenilen fieldlerin alınmasını sağlar
		//User tipindeki objeyi userVM'e dönüştürürecek 
		return userService.getUsers(page, user).map(UserVM:: new );//UserVM::objeleri new tek tek userVM'in constructorunna gönderecek
	}

	//belirli bir user'ı getirecek
	@GetMapping("/users/{username}")
	UserVM getUser(@PathVariable String username){
		User user = userService.getByUsername(username);
		return new UserVM(user);
	}

	
}
