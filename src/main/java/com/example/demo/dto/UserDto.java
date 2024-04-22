package com.example.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
    private String NUSUARIO;
    @NotEmpty
    private Integer NEMPLEADO;
    @NotEmpty
    private String NOMBRE;
    @NotEmpty
    private String PASS;
    @NotNull
    private Integer PERFIL;
    @NotNull
    private Integer TIENDA;
    @NotNull
    private Integer STATUS;
}
