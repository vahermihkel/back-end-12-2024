package ee.mihkel.veebipood.repository;

import ee.mihkel.veebipood.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

// CrudRepostiory
// JpaRepository --> annab mulle CRUD,  sorteerimise, pagineerimise, kõigi kustutamie

public interface ProductRepository extends JpaRepository<Product, String> {

    //@Query ....   SELECT * FROM category WHERE product.category =
    //List<Product> findByCategory_Id(Long id);


    // avalehel
    List<Product> findByActiveTrueOrderByNameAsc();

    // admin lehel
    List<Product> findByOrderByNameAsc();

    List<Product> findByCategory_IdAndActiveTrueOrderByNameAsc(Long id);
}
