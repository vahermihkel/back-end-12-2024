package ee.mihkel.veebipood.repository;

import ee.mihkel.veebipood.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

// CrudRepostiory
// JpaRepository --> annab mulle CRUD,  sorteerimise, pagineerimise, kõigi kustutamie

public interface ProductRepository extends JpaRepository<Product, String> {

    //@Query ....   SELECT * FROM category WHERE product.category =
    //List<Product> findByCategory_Id(Long id);


    // avalehel
    Page<Product> findByActiveTrueOrderByNameAsc(Pageable pageable);

    Page<Product> findByActiveTrue(Pageable pageable);

    // admin lehel
    List<Product> findByOrderByNameAsc();

    Page<Product> findByCategory_IdAndActiveTrueOrderByNameAsc(Long id, Pageable pageable);

    // SELECT * FROM product WHERE active = true SORT price ASC
//    Page<Product> findByActiveTrueOrderByPriceAsc(Pageable pageable);
//
//    Page<Product> findByCategory_IdAndActiveTrueOrderByPriceAsc(Long id, Pageable pageable);
//
//    Page<Product> findByActiveTrueOrderByPriceDesc(Pageable pageable);
//
//    Page<Product> findByCategory_IdAndActiveTrueOrderByPriceDesc(Long id, Pageable pageable);


    Product findFirstByPriceNotNullOrderByPriceDesc();
}
