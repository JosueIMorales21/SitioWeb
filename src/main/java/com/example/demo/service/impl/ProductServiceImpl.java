package com.example.demo.service.impl;

import com.example.demo.dto.ProductDto;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void save(ProductDto productDto) {
        Product product = new Product(
                productDto.getSKU(),
                productDto.getDESCRIPCION(),
                productDto.getCOSTO(),
                productDto.getPRECIO(),
                productDto.getDEPARTAMENTO(),
                productDto.getTIENDA(),
                productDto.getDESCUENTO(),
                1,
                productDto.getCANTIDAD_TOTAL(),
                productDto.getCANTIDAD_DISPONIBLE()
        );
        productRepository.save(product);
    }
}
