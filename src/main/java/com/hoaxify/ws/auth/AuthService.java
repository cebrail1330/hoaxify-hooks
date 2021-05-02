package com.hoaxify.ws.auth;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepository;
import com.hoaxify.ws.user.vm.UserVM;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthService {
    //kullanıcı bi,lgileri doğru olup olmadığını kontrol edecek
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;

    public AuthResponse authenticate(Credentials credentials) {
        User inDB = userRepository.findByUsername(credentials.getUsername());
        if (inDB == null) {
            throw new AuthException();
        }
        boolean matches = passwordEncoder.matches(credentials.getPassword(), inDB.getPassword()); //girlen şifre ile db'deki şifrenmin eşitliğine bakacak
        if (!matches) {
            throw new AuthException();

        }
        UserVM userVM = new UserVM(inDB);//user objesi üretecek
        //token üretecek
        Date expiresAt = new Date(System.currentTimeMillis() + 10 * 1000);//tokenin sonlanacağı süre
//        String token = Jwts.builder().setSubject("" + inDB.getId())
//                .signWith(SignatureAlgorithm.HS512, "my-app-cebrail")
//                .setExpiration(expiresAt)
//                .compact();
        String token = generateRandomToken();
        Token tokenEntity = new Token();
        tokenEntity.setToken(token);
        tokenEntity.setUser(inDB);
        tokenRepository.save(tokenEntity);

        AuthResponse response = new AuthResponse();
        response.setUser(userVM);
        response.setToken(token);
        return response;

    }

    @Transactional
    public UserDetails getUserDetails(String token) {
        Optional<Token> optionalToken = tokenRepository.findById(token);
        if (!optionalToken.isPresent()) {
            return null;
        }
        User user = optionalToken.get().getUser();
        return user;

//        //token içindeki id'i alacak
//        JwtParser parser = Jwts.parser().setSigningKey("my-app-cebrail");
//        try {
//            parser.parse(token);
//            Claims claims = parser.parseClaimsJws(token).getBody();
//            Long userId = new Long(claims.getSubject());
//            User user = userRepository.getOne(userId);
//            User newUser = (User) ((HibernateProxy) user).getHibernateLazyInitializer().getImplementation();
//            return newUser;
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
    }

    public String generateRandomToken() {
        //kendi tokenimiz
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public void clearToken(String token) {
        tokenRepository.deleteById(token);
    }
}
