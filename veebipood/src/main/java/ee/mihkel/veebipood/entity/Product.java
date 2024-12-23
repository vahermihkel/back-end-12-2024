package ee.mihkel.veebipood.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
public class Product {
    @Id
    private String name;
    private double price;
    private boolean active;
    private int stock;

    @ManyToOne // Many vasakul --> teisel tootel võib ka sama kategooria olla
    //            One paremal --> mul on 1 kategooria
    private Category category;

    // 4 valikut kuidas seoseid teha:
    // @ManyToMany --> Many paremal, siis peab olema List
    // @OneToMany --> Many paremal, siis peab olema List
    // @ManyToOne --> vasakul pool Many ja see tähendab, et jagatakse seda tabelit
    //              jagamine --> teisel tootel võib ka sama võõrvõti olla
    // @OneToOne --> vasakul on One ja kui keegi teine võtab sama võõrvõtme
    //              siin kasutusele, siis läheb errorisse

    @OneToOne(cascade = CascadeType.ALL) // kui toode kustutatakse, siis ka nutrients kustub
    private Nutrients nutrients;

//    {
//        "name": "Coca",
//            "price": 1.1,
//            "active": true,
//            "stock": 50,
//            "category": {
//                "id": 1 --> piisab ID-st sest ta on juba andmebaasis olemas
//            },
//            "nutrients": {
//                ---> ID-d ei pane, sest ta läheb andmebaasi koos tootega, aga
//                ülejäänud omadused pean panema
//                "proteins": 2,
//                "carbohydrates": 10,
//                "fats": 5
//            }
//    }

    // @ManyToMany
    // private List<Category> categories;
}
