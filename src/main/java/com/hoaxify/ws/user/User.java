package com.hoaxify.ws.user;

import com.hoaxify.ws.hoax.Hoax;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data //hibernate=> tablolar arası ilişk sağlar gerekirse tablo oluşturur tipleri ayarlar yeni birşeyler eklemeyi sağlar
@Entity //database oluşturması için

public class User implements UserDetails {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //otomatik id nin artması için
    private Long id;

    @NotNull(message = "{hoaxify.constraints.NotNull.message}")
    @Size(min = 4, max = 255)
    @UniqueUsername
    private String username;

    @NotNull
    @Size(min = 4, max = 255)
    private String displayName;

    @NotNull
    @Size(min = 8, max = 255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoaxify.constrain.password.Pattern.message}")
    //şifre kontrolü için
    private String password;

    @Lob //255 karakterden daha uzun stringler alabilecek
    private String image;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Hoax> hoaxes;

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
