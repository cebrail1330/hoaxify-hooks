package com.hoaxify.ws.auth;

import com.hoaxify.ws.shared.GenericResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/api/1.0/auth")
    AuthResponse handleAuthentication(@RequestBody Credentials credentials) {
        //Kullanıcıya token  döndeerecek
        return authService.authenticate(credentials);
    }

    @PostMapping("api/1.0/logout")
    GenericResponse handleLogout(@RequestHeader(name="Authorization") String authorization) {
        String token = authorization.substring(7);
        authService.clearToken(token);
        return new GenericResponse("Logout success");
    }

}
