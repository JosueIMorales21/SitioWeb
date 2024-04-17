package com.example.demo.security;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String NEMPLEADO) throws UsernameNotFoundException {
        try {
            int empleadoId = Integer.parseInt(NEMPLEADO);
            User user = userRepository.findByNEMPLEADO(empleadoId);

            if (user != null) {
                return new org.springframework.security.core.userdetails.User(user.getNEMPLEADO().toString(),
                        user.getPASS(),
                        mapRolesToAuthorities(user.getPERFIL().toString()));
            } else {
                throw new UsernameNotFoundException("Invalid username or password.");
            }
        } catch (NumberFormatException e) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(String perfil) {
        String roleName = getRoleNameByPerfil(perfil);
        return Collections.singletonList(new SimpleGrantedAuthority(roleName));
    }

    private String getRoleNameByPerfil(String perfil) {
        return switch (perfil) {
            case "15" -> "ROLE_ADMIN";
            case "10" -> "ROLE_USER";
            default -> "";
        };
    }
}
