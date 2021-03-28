package com.hoaxify.ws.user;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data //hibernate=> tablolar arası ilişk sağlar gerekirse tablo oluşturur tipleri ayarlar yeni birşeyler eklemeyi sağlar
@Entity //database oluşturması için

public class User implements UserDetails{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue //otomatik id nin artması için
	private Long id;
	
	@NotNull(message="{hoaxify.constraints.NotNull.message}")
	@Size(min = 4, max= 255)
	@UniqueUsername
	private String username;
	
	@NotNull
	@Size(min = 4, max= 255)
	private String displayName;
	
	@NotNull
	@Size(min = 8, max= 255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message="{hoaxify.constrain.password.Pattern.message}") //şifre kontrolü için
	private String password;
	
	@Lob //255 karakterden daha uzun stringler alabilecek
	private String image;
	
	
	/*@Override
	public String toString() {
		return "User [username=" + username + ", displayName=" + displayName + ", password=" + password + "]";
	}*/


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user"); //Rolo_ ile başlaması gerekiyor
	}


	@Override
	public boolean isAccountNonExpired() {
		return true;
	}


	@Override
	public boolean isAccountNonLocked() {
		return true;
	}


	@Override
	public boolean isCredentialsNonExpired() {
		return true;

	}


	@Override
	public boolean isEnabled() {
		return true;
	}
	 
}
