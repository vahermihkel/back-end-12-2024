package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//import java.util.ArrayList;
//import java.util.Arrays;
import java.util.List;

@RestController
public class ProductController {
    @Autowired
    ProductRepository productRepository; // selle abil suhtleme andmabaasiga

//    List<Product> tooted = new ArrayList<>(Arrays.asList(
//            new Product("Coca", 1.1, true, 150),
//            new Product("Fanta", 1.0, true, 100),
//            new Product("Sprite", 0.9, false, 0)
//    ));

    // localhost:8080/products
    @GetMapping("products")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    // localhost:8080/products
    @PostMapping("products")
    public List<Product> addProduct(@RequestBody Product newProduct) {
        //tooted.add(newProduct);
        if (productRepository.findById(newProduct.getName()).isEmpty()) {
            newProduct.setActive(true);
            if (newProduct.getStock() < 0) {
                newProduct.setStock(0);
            }
            productRepository.save(newProduct);
        }
        return productRepository.findAll();
    }

    @DeleteMapping("products/{productName}")
    public List<Product> deleteProduct(@PathVariable String productName) {
        productRepository.deleteById(productName);
        return productRepository.findAll();
    }

    @PutMapping("products")
    public List<Product> editProduct(@RequestBody Product newProduct) {
        if (productRepository.findById(newProduct.getName()).isPresent()) {
            productRepository.save(newProduct); // INSERT INTO products
        }
        return productRepository.findAll(); // SELECT * FROM products
    }

    @GetMapping("products-by-category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return productRepository.findByCategory_Id(categoryId);
    }

    // Patch - ühe kindla välja muutmine
    @PatchMapping("change-stock")
    public List<Product> changeStock(@RequestBody Product changedProduct) {
        if (productRepository.findById(changedProduct.getName()).isPresent()) {
            productRepository.save(changedProduct);
        }
        return productRepository.findAll();
    }
}
