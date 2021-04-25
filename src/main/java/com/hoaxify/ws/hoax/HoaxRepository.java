package com.hoaxify.ws.hoax;

import com.hoaxify.ws.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.hoaxify.ws.shared.GenericResponse;

import java.util.List;

@Repository
public interface HoaxRepository extends JpaRepository<Hoax, Long>, JpaSpecificationExecutor<Hoax> {

	Page<Hoax> findByUser(User user, Pageable page);

	//Specification ile yapıldı bunlar filtreleme işlemlerinde Specification kullanılması önerilir
//	Page<Hoax> findByIdLessThan(Long id, Pageable page);

//	Page<Hoax> findByIdLessThanAndUser(Long id, User user, Pageable page);

//	Long countByIdGreaterThan(Long id);
//
//	Long countByIdGreaterThanAndUser(Long id, User user);
//
//	List<Hoax> findByIdGreaterThan(Long id, Sort sort);
//
//	List<Hoax> findByIdGreaterThanAndUser(Long id, User user, Sort sort);
}
