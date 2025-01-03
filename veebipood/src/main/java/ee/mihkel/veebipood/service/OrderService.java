package ee.mihkel.veebipood.service;

import ee.mihkel.veebipood.entity.Order;
import ee.mihkel.veebipood.entity.OrderRow;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    public List<Order> addOrder(List<OrderRow> orderRows, String email) {
        Order order = new Order();
        order.setCreated(new Date());
        order.setTotalSum(calculateTotalSum(orderRows));
        Person person = new Person();
        person.setEmail(email);
        order.setPerson(person); // primaarvõti on email
        order.setOrderRows(orderRows);
        orderRepository.save(order);
        return orderRepository.findAll();
    }

    private double calculateTotalSum(List<OrderRow> orderRows) {
        double sum = 0;
        for (OrderRow row: orderRows) {
            sum += row.getQuantity() * row.getProduct().getPrice();
        }
        return sum;
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
}
