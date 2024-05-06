package com.example.demo.service;

import com.example.demo.dto.ProductDto;

import java.util.List;

public interface ProductService {
    void save(ProductDto productDto);

    List<ProductDto> findAllProducts();

    void updateProduct(ProductDto productDto);
}
