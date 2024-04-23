package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT MAX(u.NUSUARIO) FROM User u")
    String findMaxNUSUARIO();

    User findByNEMPLEADO(Integer NEMPLEADO);
}
