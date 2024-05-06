package com.example.demo.service.impl;

import com.example.demo.dto.ProductDto;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public void updateProduct(ProductDto productDto) {
        Product existingProduct = productRepository.findBySKU(productDto.getSKU());

        if(existingProduct != null) {
            existingProduct.setSKU(productDto.getSKU());
            existingProduct.setDESCRIPCION(productDto.getDESCRIPCION());
            existingProduct.setCOSTO(productDto.getCOSTO());
            existingProduct.setPRECIO(productDto.getPRECIO());
            existingProduct.setDEPARTAMENTO(productDto.getDEPARTAMENTO());
            existingProduct.setTIENDA(productDto.getTIENDA());
            existingProduct.setDESCUENTO(productDto.getDESCUENTO());
            existingProduct.setCANTIDAD_TOTAL(productDto.getCANTIDAD_TOTAL());
            existingProduct.setCANTIDAD_DISPONIBLE(productDto.getCANTIDAD_DISPONIBLE());

            productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Producto no encontrado con el SKU: " + productDto.getSKU());
        }
    }

    @Override
    public List<ProductDto> findAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> convertEntityToDto(product))
                .collect(Collectors.toList());
    }

    private ProductDto convertEntityToDto(Product product) {
        if(product == null) {
            return null;
        }
        ProductDto productDto = new ProductDto();
        productDto.setSKU(product.getSKU());
        productDto.setDESCRIPCION(product.getDESCRIPCION());
        productDto.setCOSTO(product.getCOSTO());
        productDto.setPRECIO(product.getPRECIO());
        productDto.setDEPARTAMENTO(product.getDEPARTAMENTO());
        productDto.setTIENDA(product.getTIENDA());
        productDto.setDESCUENTO(product.getDESCUENTO());
        productDto.setCANTIDAD_TOTAL(product.getCANTIDAD_TOTAL());
        productDto.setCANTIDAD_DISPONIBLE(product.getCANTIDAD_DISPONIBLE());
        return productDto;
    }
}
