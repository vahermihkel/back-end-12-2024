package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.models.Supplier1Product;
import ee.mihkel.veebipood.models.Supplier3Product;
import ee.mihkel.veebipood.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SupplierController {

    @Autowired
    SupplierService supplierService;

    @GetMapping("supplier1")
    public List<Supplier1Product> getSupplier1Products() {
        return supplierService.getSupplier1Products();
    }

    // KOJU
    @GetMapping("supplier2")
    public String getSupplier2Products() {
        return supplierService.getSupplier2Products();
    }

    @GetMapping("supplier3")
    public List<Supplier3Product> getSupplier3Products() {
        return supplierService.getSupplier3Products();
    }

    // KOJU supplier4, supplier5 --> ise fake tooted internetist
}
