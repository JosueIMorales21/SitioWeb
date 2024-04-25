package com.example.demo.service;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.User;

import java.util.List;

public interface UserService {
    void save(UserDto userDto);

    List<UserDto> findAllUsers();

    String findNOMBREByNEMPLEADO(String NEMPLEADO);

    void updateUser(UserDto userDto);
}
