package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.User;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);

    User findByNempleado(String nempleado);

    UserDto findByNOMBRE(String NOMBRE);

    List<UserDto> findAllUsers();

    String findNOMBREByNEMPLEADO(String NEMPLEADO);
}
