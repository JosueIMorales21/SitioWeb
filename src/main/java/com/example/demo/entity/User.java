package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="USUARIOS_REST")
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String NUSUARIO;
    @Column(nullable = false, unique = true)
    private Integer NEMPLEADO;
    @Column(nullable=false)
    private String NOMBRE;
    @Column(nullable=false)
    private String PASS;
    @Column(nullable = false)
    private Integer TIENDA;
    @Column(nullable = false)
    private Integer PERFIL;
}
