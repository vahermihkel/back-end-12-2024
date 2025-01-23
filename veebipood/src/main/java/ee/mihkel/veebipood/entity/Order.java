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
@SequenceGenerator(name = "seq", initialValue = 6355300, allocationSize = 1)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    private Long id;
    private Date created;
    private double totalSum;

    @ManyToOne
    private Person person;

    private String payment; // settled, failed, cancelled, voided

    @OneToMany(cascade = CascadeType.ALL) // CascadeType.ALL ainult siis kui @One on alguses
    private List<OrderRow> orderRows;
}
