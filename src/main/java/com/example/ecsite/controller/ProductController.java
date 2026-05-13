package com.example.ecsite.controller;

import com.example.ecsite.entity.Product;
import com.example.ecsite.repository.ProductRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/api/products")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/api/products")
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @DeleteMapping("/api/products/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }

    @PutMapping("/api/products/{id}")
     public Product updateProduct(
        @PathVariable Long id,
        @RequestBody Product updatedProduct) {

    Product product = productRepository.findById(id).orElseThrow();

    product.setName(updatedProduct.getName());
    product.setPrice(updatedProduct.getPrice());
    product.setDescription(updatedProduct.getDescription());

    return productRepository.save(product);
    }
}