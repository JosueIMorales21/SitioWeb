package com.example.demo.service.impl;

import com.example.demo.dto.UserDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void save(UserDto userDto) {
        String nextUserId = generateNextUserId();

        if (!isUsernameUnique(userDto.getNEMPLEADO())) {
            throw new RuntimeException("El número de empleado ya existe.");
        }

        User user = new User(
                nextUserId,
                userDto.getNEMPLEADO(),
                userDto.getNOMBRE(),
                userDto.getPASS(),
                userDto.getPERFIL(),
                userDto.getTIENDA(),
                1
        );
        userRepository.save(user);
    }

    public void updateUser(UserDto userDto) {
        User existingUser = userRepository.findByNEMPLEADO(userDto.getNEMPLEADO());
        if (existingUser != null) {
            existingUser.setNOMBRE(userDto.getNOMBRE());
            existingUser.setPASS(userDto.getPASS());
            existingUser.setPERFIL(userDto.getPERFIL());
            existingUser.setTIENDA(userDto.getTIENDA());

            userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with id: " + userDto.getNEMPLEADO());
        }
    }

    public boolean isUsernameUnique(Integer nempleado) {
        return userRepository.findByNEMPLEADO(nempleado) == null;
    }

    private String generateNextUserId() {
        String maxUserId = userRepository.findMaxNUSUARIO();

        if (maxUserId == null) {
            return "0000000001";
        }

        int nextId = Integer.parseInt(maxUserId) + 1;

        return String.format("%010d", nextId);
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> convertEntityToDto(user))
                .collect(Collectors.toList());
    }

    @Override
    public String findNOMBREByNEMPLEADO(String NEMPLEADO) {
        User user = userRepository.findByNEMPLEADO(Integer.parseInt(NEMPLEADO));
        if (user != null) {
            return user.getNOMBRE();
        }
        return null;
    }


    private UserDto convertEntityToDto(User user) {
        if (user == null) {
            return null;
        }
        UserDto userDto = new UserDto();
        userDto.setNEMPLEADO(user.getNEMPLEADO());
        userDto.setNOMBRE(user.getNOMBRE());
        userDto.setPERFIL(user.getPERFIL());
        userDto.setPASS(user.getPASS());
        userDto.setTIENDA(user.getTIENDA());
        return userDto;
    }

    private User convertToEntity(UserDto userDto) {
        User user = new User();
        user.setNEMPLEADO(userDto.getNEMPLEADO());
        user.setNOMBRE(userDto.getNOMBRE());
        user.setPASS(userDto.getPASS());
        user.setPERFIL(userDto.getPERFIL());
        user.setTIENDA(userDto.getTIENDA());
        return user;
    }


}
