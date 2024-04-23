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
        String nextUserId = generateNextUserId(userDto);
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

    private String generateNextUserId(UserDto userDto) {
        // Format NEMPLEADO to generate NUSUARIO
        return formatNEMPLEADO(userDto.getNEMPLEADO());
    }

    private String formatNEMPLEADO(Integer NEMPLEADO) {
        return String.format("%010d", NEMPLEADO);
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
        return userDto;
    }

}
