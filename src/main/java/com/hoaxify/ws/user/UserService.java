package com.hoaxify.ws.user;


import com.hoaxify.ws.error.NotFoundException;
import com.hoaxify.ws.file.FileService;
import com.hoaxify.ws.user.vm.UserUpdateVM;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

//ara katman
@Service
public class UserService {

    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    FileService fileService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FileService fileService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileService = fileService;
    }

    public void save(User user) {
        String encryptedPassword = this.passwordEncoder.encode(user.getPassword()); //şifreyi gizleyecek
        user.setPassword(encryptedPassword);
        userRepository.save(user);

    }

    public Page<User> getUsers(Pageable page, User user) {
        if (user != null) {
            return userRepository.findByUsernameNot(user.getUsername(), page);
        }
        return userRepository.findAll(page); //sayfalandırma yapacak
    }

    public User getByUsername(String username) {
        User inDB = userRepository.findByUsername(username);
        if (inDB == null) {
            throw new NotFoundException();
        }
        return inDB;
    }

    public User updateUser(String username, UserUpdateVM updatedUser) {
        User inDb = getByUsername(username); //üsteki metoddan userName getirecek
        inDb.setDisplayName(updatedUser.getDisplayName());//yeni displayname eklenecek
        if (updatedUser.getImage() != null) {
            String oldImageName = inDb.getImage();
            //inDb.setImage(updatedUser.getImage());

            //Dosyaya kaydetme işlemi yapılacak
            try {
                String storedFileName = fileService.writeBase64EncodedStringToFile(updatedUser.getImage());
                inDb.setImage(storedFileName); //resmin adını yazacak
            } catch (IOException e) {
                e.printStackTrace();
            }
            fileService.deleteProfileImage(oldImageName);

        }
        return userRepository.save(inDb);
    }

    public void deleteUser(String username) {
        User inDB = userRepository.findByUsername(username);
        //fileService.deleteProfileImage(inDB.getImage());
        fileService.deleteAllStoredFilesForUser(inDB);
        userRepository.delete(inDB);
    }

}
