package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Order;
import ee.mihkel.veebipood.entity.OrderRow;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    // localhost:8080/orders?email=m@m.com
    // Õiges arenduses ei tagasta pärast Tellimuse lisamist kõiki Tellimusi.
    @PostMapping("orders")
    public List<Order> addOrder(@RequestParam String email, @RequestBody List<OrderRow> orderRows) {
        // hiljem võtame emaili Tokeni küljest (pärast sisselogimist)
        return orderService.addOrder(orderRows, email);
    }

    @GetMapping("orders")
    public List<Order> getOrders() {
        return orderService.getOrders();
    }
}
