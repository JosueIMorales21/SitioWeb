package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("index")
    public String home(){
        return "redirect:login";
    }

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }


    @GetMapping("/user")
    public String userTemplate(){
        return "user";
    }

    @GetMapping("/admin")
    public String adminTemplate(Model model, Principal principal){
        String username = principal.getName();
        System.out.println("Fetching user for NEMPLEADO: " + username);  // Logging
        String nombre = userService.findNOMBREByNEMPLEADO(username);

        if (nombre != null) {
            System.out.println("Found NOMBRE: " + nombre);  // Logging
            model.addAttribute("name", nombre);
        } else {
            System.out.println("NOMBRE not found");  // Logging
            model.addAttribute("name", "User");
        }
        return "admin";
    }



}