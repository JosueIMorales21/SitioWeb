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
public class ProductDto
{
    @NotEmpty
    private Integer SKU;
    @NotEmpty
    private String DESCRIPCION;
    @NotEmpty
    private Integer COSTO;
    @NotEmpty
    private Integer PRECIO;
    @NotEmpty
    private Integer DEPARTAMENTO;
    @NotEmpty
    private Integer TIENDA;
    @NotEmpty
    private Integer DESCUENTO;
    @NotEmpty
    private Integer STATUS;
    @NotEmpty
    private Integer CANTIDAD_TOTAL;
    @NotEmpty
    private Integer CANTIDAD_DISPONIBLE;
}
