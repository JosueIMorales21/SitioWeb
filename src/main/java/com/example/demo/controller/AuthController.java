package com.example.demo.controller;

import com.example.demo.dto.ProductDto;
import com.example.demo.dto.UserDto;
import com.example.demo.service.ProductService;
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
    private final ProductService productService;

    public AuthController(UserService userService, ProductService productService) {
        this.userService = userService;
        this.productService = productService;
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

    @ModelAttribute("product")
    public ProductDto productDto(){
        return new ProductDto();
    }

    @GetMapping("/admin")
    public String adminTemplate(Model model, Principal principal) {
        List<UserDto> users = userService.findAllUsers();
        List<ProductDto> products = productService.findAllProducts();
        model.addAttribute("users", users);
        model.addAttribute("products", products);

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
    public String admin(@ModelAttribute("user") UserDto userDto, @ModelAttribute("product") ProductDto productDto, RedirectAttributes redirectAttributes, @RequestParam(required = false) String action) {
        try {
            if ("register".equals(action)) {
                userService.save(userDto);
                redirectAttributes.addFlashAttribute("success", true);
                redirectAttributes.addFlashAttribute("message", "Usuario registrado correctamente.");
            } else if ("update".equals(action)) {
                userService.updateUser(userDto);
                redirectAttributes.addFlashAttribute("success", true);
                redirectAttributes.addFlashAttribute("message", "Usuario actualizado correctamente.");
            } else if ("registerProd".equals(action)) {
                productService.save(productDto);
                redirectAttributes.addFlashAttribute("success", true);
                redirectAttributes.addFlashAttribute("message", "Producto registrado correctamente.");
            } else if ("updateProduct".equals(action)) {
                productService.updateProduct(productDto);
                redirectAttributes.addFlashAttribute("success", true);
                redirectAttributes.addFlashAttribute("message", "Producto actualizado correctamente");
            }
        } catch (RuntimeException e) {
            redirectAttributes.addFlashAttribute("error", true);
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
        }
        return "redirect:/admin";
    }

    @GetMapping("/user")
    public String userTemplate() {
        return "user";
    }

}