package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Order;
import ee.mihkel.veebipood.entity.OrderRow;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.models.PaymentLink;
import ee.mihkel.veebipood.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class OrderController {

    @Autowired
    OrderService orderService;

    // localhost:8080/orders?email=m@m.com
    // Õiges arenduses ei tagasta pärast Tellimuse lisamist kõiki Tellimusi.
    @PostMapping("orders")
    public PaymentLink addOrder(@RequestBody List<OrderRow> orderRows) {
        // hiljem võtame emaili Tokeni küljest (pärast sisselogimist)
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Order order = orderService.addOrder(orderRows, email);
        return orderService.getPaymentLink(order);
    }


    // Mitteõnnestuv:
    // ?order_reference=6355301&payment_reference=6480f805a2c2374e0455a7ca9792fd51a76820c53d1d00c25718e00e8d5d3afd
    // Õnnestuv:
    // ?order_reference=6355302&payment_reference=46337c90a30d14c574d96dfb64b98b559b70f65c8d3fbd51c91e0e99495cdb87

    @GetMapping("check-payment")
    public Boolean checkPayment(@RequestParam String paymentRef) {
        return orderService.checkPayment(paymentRef);
    }

    @GetMapping("orders")
    public List<Order> getOrders() {
        return orderService.getOrders();
    }
}
