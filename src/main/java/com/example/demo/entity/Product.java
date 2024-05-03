package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="PRODUCTOS_REST")
public class Product
{
    @Id
    private Integer SKU;
    @Column(nullable = false)
    private String DESCRIPCION;
    @Column(nullable=false)
    private Integer COSTO;
    @Column(nullable=false)
    private Integer PRECIO;
    @Column(nullable = false)
    private Integer DEPARTAMENTO;
    @Column(nullable = false)
    private Integer TIENDA;
    @Column(nullable = false)
    private Integer DESCUENTO;
    @Column(nullable = false)
    private Integer STATUS;
    @Column(nullable = false)
    private Integer CANTIDAD_TOTAL;
    @Column(nullable = false)
    private Integer CANTIDAD_DISPONIBLE;
}
