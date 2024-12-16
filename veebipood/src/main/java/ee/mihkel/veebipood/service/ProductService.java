package ee.mihkel.veebipood.service;

import ee.mihkel.veebipood.dto.ProductNutrientsumDTO;
import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<ProductNutrientsumDTO> calculateNutrientsSum(List<Product> products) {
        List<ProductNutrientsumDTO> list = new ArrayList<>();
        for (Product p: products) {

            ProductNutrientsumDTO productDTO = new ProductNutrientsumDTO();
            productDTO.setName(p.getName());

            if (p.getNutrients() != null) {
                int sum = 0;
                sum += p.getNutrients().getProteins();
                sum += p.getNutrients().getCarbohydrates();
                sum += p.getNutrients().getFats();
                productDTO.setSum(sum);
            } else {
                productDTO.setSum(0);
            }

            list.add(productDTO);
        }
        return list;
    }
}
