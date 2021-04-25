package com.hoaxify.ws.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

//JpaRepository<User, Long> long id nin tipi save okuma işşlemleri yapılacak
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    //userlar listelenirken username olmayanları getirecek
    Page<User> findByUsernameNot(String username, Pageable page);

}
