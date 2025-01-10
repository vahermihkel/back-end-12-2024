package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.dto.ProductNutrientsumDTO;
import ee.mihkel.veebipood.entity.Category;
import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.repository.CategoryRepository;
import ee.mihkel.veebipood.repository.ProductRepository;
import ee.mihkel.veebipood.service.ProductService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

//import java.util.ArrayList;
//import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Log4j2
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository; // selle abil suhtleme andmabaasiga

    @Autowired
    private CategoryRepository categoryRepository;

//    List<Product> tooted = new ArrayList<>(Arrays.asList(
//            new Product("Coca", 1.1, true, 150),
//            new Product("Fanta", 1.0, true, 100),
//            new Product("Sprite", 0.9, false, 0)
//    ));

    @GetMapping("product/{productName}")
    public Product getProduct(@PathVariable String productName) {
        return productRepository.findById(productName).orElseThrow();
    }

    // localhost:8080/public-products?page=0&size=2
    @GetMapping("public-products")
    public Page<Product> getPublicProducts(Pageable pageable) {
        //log.info(pageable.getPageNumber());
        return productRepository.findByActiveTrue(pageable);
    }

    @GetMapping("products-by-category/{categoryId}")
    public Page<Product> getProductsByCategory(@PathVariable Long categoryId, Pageable pageable) {
        return productRepository.findByCategory_IdAndActiveTrueOrderByNameAsc(categoryId, pageable);
    }

    // localhost:8080/products
    @GetMapping("products")
    public List<Product> getProducts() {
        return productRepository.findByOrderByNameAsc();
    }

    // default väärtused:
    // numbriline - 0
    // boolean - false
    // String - null
    // object (võõrvõti) - null

    // 4ga algavad - front-end viga
    // 400 - bad request ehk üldine viga
    // 401/403 - autentimine
    // 404 - URL valesti
    // 405 - vale method
    // 415 - valel kujul body (pole JSON)

    // 5ga algavad - back-end viga
    // back-end viskab exceptioni välja

    // localhost:8080/products
    @PostMapping("products")
    public List<Product> addProduct(@RequestBody Product newProduct) {
        //tooted.add(newProduct);
        if (newProduct.getName() == null || newProduct.getName().isEmpty()) {
            log.error("Wanted to add product but name was empty by user 123: {}", newProduct);
            throw new RuntimeException("Nimi on puudu");
        }
        if (newProduct.getCategory() == null || newProduct.getCategory().getId() == null || newProduct.getCategory().getId() <= 0) {
            log.error("Wanted to add product but category was empty by user 123: {}", newProduct);
            throw new RuntimeException("Kategooria on puudu");
        }
        if (productRepository.findById(newProduct.getName()).isEmpty()) {
            newProduct.setActive(true);
            if (newProduct.getStock() < 0) {
                log.error("Wanted to add product with negative stock, changed it to 0 by user 123: {}", newProduct);
                newProduct.setStock(0);
            }
            productRepository.save(newProduct);
            log.info("Product saved by user 123: {}", newProduct);
        }
            return productRepository.findByOrderByNameAsc();
    }

    @DeleteMapping("products/{productName}")
    public List<Product> deleteProduct(@PathVariable String productName) {
        productRepository.deleteById(productName);
        return productRepository.findByOrderByNameAsc();
    }

    @PutMapping("products")
    public List<Product> editProduct(@RequestBody Product newProduct) {
        if (productRepository.findById(newProduct.getName()).isPresent()) {
            productRepository.save(newProduct); // INSERT INTO products
        }
        return productRepository.findByOrderByNameAsc(); // SELECT * FROM products
    }

    // Patch - ühe kindla välja muutmine
    @PatchMapping("change-stock")
    public List<Product> changeStock(@RequestBody Product changedProduct) {
                                            // võtan andmebaasist primaatvõtme alusel
        Optional<Product> productOptional = productRepository.findById(changedProduct.getName());
        Product product = productOptional.orElseThrow();
        product.setStock(changedProduct.getStock());
        productRepository.save(product);

//        Optional<Product> productOptional = productRepository.findById(changedProduct.getName());
//        if (productOptional.isPresent()) {
//            Product product = productOptional.get();
//            product.setStock(changedProduct.getStock());
//            productRepository.save(product);
//        }
        return productRepository.findByOrderByNameAsc();
    }

    // localhost:8080/increase-stock?name=Coca
    @PatchMapping("increase-stock")
    public List<Product> increaseStock(@RequestParam String name) {
        Product product = productRepository.findById(name).orElseThrow();
        product.setStock(product.getStock() + 1);
        productRepository.save(product);
        return productRepository.findByOrderByNameAsc();
    }

    // localhost:8080/decrease-stock?name=Coca
    @PatchMapping("decrease-stock")
    public List<Product> decreaseStock(@RequestParam String name) {
        Product product = productRepository.findById(name).orElseThrow();
        if (product.getStock() > 0) {
            product.setStock(product.getStock() - 1);
            productRepository.save(product);
            // TODO: Viska exception kui on 0
        }
        return productRepository.findByOrderByNameAsc();
    }

    @GetMapping("all-stock")
    public int allStock() {
        List<Product> products = productRepository.findAll();
        int sum = 0;
        for (Product p: products) {
            sum += p.getStock();
        }
        return sum;
    }

    @GetMapping("products-nutrients")
    public List<ProductNutrientsumDTO> productsNutrients() {
        List<Product> products = productRepository.findAll();
        return productService.calculateNutrientsSum(products);
    }

    @PatchMapping("product-category")
    public List<Product> updateProductCategory(@RequestParam String productName, Long categoryId) {
        Product product = productRepository.findById(productName).orElseThrow();
        Category category = categoryRepository.findById(categoryId).orElseThrow();
        product.setCategory(category);
        productRepository.save(product);
        return productRepository.findByOrderByNameAsc();
    }


}
