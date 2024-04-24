package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.Principal;
import java.util.List;

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

    @ModelAttribute("user")
    public UserDto userDto() {
        return new UserDto();
    }

    @GetMapping("/admin")
    public String adminTemplate(Model model, Principal principal) {
        List<UserDto> users = userService.findAllUsers();
        model.addAttribute("users", users);

        String username = principal.getName();
        String nombre = userService.findNOMBREByNEMPLEADO(username);

        if (nombre != null) {
            model.addAttribute("name", nombre);
        } else {
            model.addAttribute("name", "User");
        }
        return "admin";
    }

    @PostMapping("/admin")
    public String admin(@ModelAttribute("user") UserDto userDto, RedirectAttributes redirectAttributes, @RequestParam(required = false) String action) {
        try {
            if ("register".equals(action)) {
                userService.save(userDto);
                redirectAttributes.addAttribute("success", true);
                redirectAttributes.addAttribute("type", "register");
            } else if ("update".equals(action)) {
                userService.updateUser(userDto);
                redirectAttributes.addAttribute("success", true);
                redirectAttributes.addAttribute("type", "update");
            }
            return "redirect:/admin";
        } catch (RuntimeException e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
            redirectAttributes.addAttribute("error", true);
            return "redirect:/admin";
        }
    }


    @GetMapping("/user")
    public String userTemplate() {
        return "user";
    }

}