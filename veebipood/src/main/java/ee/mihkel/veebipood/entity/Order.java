package ee.mihkel.veebipood.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders") // "Order" on PosgtreSQL-s reserveeritud (ka User on)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date created;
    private double totalSum;

    @ManyToOne
    private Person person;

    @OneToMany(cascade = CascadeType.ALL) // CascadeType.ALL ainult siis kui @One on alguses
    private List<OrderRow> orderRows;
}
