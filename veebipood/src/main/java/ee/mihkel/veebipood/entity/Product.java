package ee.mihkel.veebipood.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Product {
    @Id
    private String name;
        private double price;
    private boolean active;
    private int stock;

    @ManyToOne // Many vasakul --> teisel tootel võib ka sama kategooria olla
    //            One paremal --> mul on 1 kategooria
    private Category category;

    // @ManyToMany
    // private List<Category> categories;
}
