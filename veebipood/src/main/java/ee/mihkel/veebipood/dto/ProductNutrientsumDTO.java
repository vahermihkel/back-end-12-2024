package ee.mihkel.veebipood.dto;

import lombok.Data;

@Data
public class ProductNutrientsumDTO {
    private String name; // aga võin ka kõik ülejäänud toote küljest võtta
    private int sum; // selle lisan juurde ja selle nimel tegin uue mudeli
}
