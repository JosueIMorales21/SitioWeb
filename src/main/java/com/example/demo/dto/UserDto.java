package com.example.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto
{
    @NotEmpty
    private Integer NEMPLEADO;
    @NotEmpty
    private String NOMBRE;
    @NotEmpty
    private Integer PERFIL;
    @NotEmpty(message = "Password should not be empty")
    private String PASS;
}
