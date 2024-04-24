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
    public User save(UserDto userDto) {
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
        return userRepository.save(user);
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
    public User findByNempleado(String NEMPLEADO) {
        return userRepository.findByNEMPLEADO(Integer.parseInt(NEMPLEADO));
    }

    @Override
    public UserDto findByNOMBRE(String NOMBRE) {
        return null;
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> convertEntityToDto(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(Long.valueOf(id));
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

}
