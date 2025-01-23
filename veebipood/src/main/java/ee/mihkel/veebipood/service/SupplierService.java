package ee.mihkel.veebipood.service;

import ee.mihkel.veebipood.models.Supplier1Product;
import ee.mihkel.veebipood.models.Supplier3Product;
import ee.mihkel.veebipood.models.Supplier3Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class SupplierService {

    @Autowired
    RestTemplate restTemplate;

    public List<Supplier1Product> getSupplier1Products() {
//        RestTemplate restTemplate = new RestTemplate();
        String url = "https://fakestoreapi.com/products";
        ResponseEntity<Supplier1Product[]> response = restTemplate.exchange(url, HttpMethod.GET, null, Supplier1Product[].class);
        List<Supplier1Product> products = List.of(response.getBody());
        products = products.stream().filter(e -> e.rating.rate > 4).toList();
        return products;
    }

    public String getSupplier2Products() {
//        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.escuelajs.co/api/v1/products";
        ResponseEntity response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
        return response.getBody().toString();
    }

    public List<Supplier3Product> getSupplier3Products() {
//        RestTemplate restTemplate = new RestTemplate();
        String url = "https://dummyjson.com/products";
        ResponseEntity<Supplier3Response> response = restTemplate.exchange(url, HttpMethod.GET, null, Supplier3Response.class);
        List<Supplier3Product> products = response.getBody().getProducts();
        products = products.stream().filter(e -> e.rating > 4.5).toList();
        return products;
    }
}
