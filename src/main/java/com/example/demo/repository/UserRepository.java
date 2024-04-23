package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT LPAD(MIN(TO_NUMBER(SUBSTR(NUSUARIO, 1, 10))) + 1, 10, '0') " +
            "FROM USUARIOS_REST WHERE LENGTH(NUSUARIO) = 10", nativeQuery = true)
    String findNextAvailableUserId();

    User findByNEMPLEADO(Integer NEMPLEADO);
}
