package com.hoaxify.ws.user;

import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.vm.UserUpdateVM;
import com.hoaxify.ws.user.vm.UserVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    Page<UserVM> getUsers(Pageable page, @CurrentUser User user) {
        //veritabanından istenilen fieldlerin alınmasını sağlar
        //User tipindeki objeyi userVM'e dönüştürürecek
        return userService.getUsers(page, user).map(UserVM::new);//UserVM::objeleri new tek tek userVM'in constructorunna gönderecek
    }

    //belirli bir user'ı getirecek
    @GetMapping("/users/{username}")
    UserVM getUser(@PathVariable String username) {
        User user = userService.getByUsername(username);
        return new UserVM(user);
    }

    @PutMapping("/users/{username}")
    //principal o an ki kullanıcıyı alır
    @PreAuthorize("#username == principal.username") //farklı kullanıcılar birbirinin kullanıcı bilgilerini değiştiremecek
    UserVM updateUser(@Valid @RequestBody UserUpdateVM updatedUser, @PathVariable String username) {
        User user = userService.updateUser(username, updatedUser);
        return new UserVM(user);
    }

    @DeleteMapping("/users/{username}")
    @PreAuthorize(value = "#username == principal.username")
    GenericResponse deleteUser(@PathVariable String username){
        userService.deleteUser(username);
        return new GenericResponse("user is removed");
    }

}
