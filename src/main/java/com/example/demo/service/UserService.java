package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.User;

import java.util.List;

public interface UserService {
    void save(UserDto userDto);

    User findByNempleado(String nempleado);

    UserDto findByNOMBRE(String NOMBRE);

    List<UserDto> findAllUsers();
    void deleteUser(Integer id);

    String findNOMBREByNEMPLEADO(String NEMPLEADO);

    void updateUser(UserDto userDto);
}
