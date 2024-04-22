package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.security.Principal;

@Controller
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("index")
    public String home() {
        return "redirect:login";
    }

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }


    @GetMapping("/user")
    public String userTemplate() {
        return "user";
    }

    @GetMapping("/admin")
    public String adminTemplate(Model model, Principal principal) {
        String username = principal.getName();
        String nombre = userService.findNOMBREByNEMPLEADO(username);

        if (nombre != null) {
            model.addAttribute("name", nombre);
        } else {
            model.addAttribute("name", "User");
        }
        return "admin";
    }


    @ModelAttribute("user")
    public UserDto userDto() {
        return new UserDto();
    }

    @PostMapping("/admin")
    public String registerUser(@ModelAttribute("user")UserDto userDto) {
        userService.save(userDto);
        return "redirect:/admin?success";
    }

}