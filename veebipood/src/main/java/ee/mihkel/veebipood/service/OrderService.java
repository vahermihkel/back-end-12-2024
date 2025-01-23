package ee.mihkel.veebipood.service;

import ee.mihkel.veebipood.entity.Order;
import ee.mihkel.veebipood.entity.OrderRow;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.models.EveryPayBody;
import ee.mihkel.veebipood.models.EveryPayCheck;
import ee.mihkel.veebipood.models.EveryPayResponse;
import ee.mihkel.veebipood.models.PaymentLink;
import ee.mihkel.veebipood.repository.OrderRepository;
import ee.mihkel.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    RestTemplate restTemplate;

    @Value("${everypay.username}")
    private String everypayUsername;

    @Value("${everypay.password}")
    private String everypayPassword;

    @Value("${everypay.base-url}")
    private String everypayBaseUrl;

    @Value("${everypay.customer-url}")
    private String everypayCustomerUrl;


    public Order addOrder(List<OrderRow> orderRows, String email) {
        Order order = new Order();
        order.setCreated(new Date());
        order.setTotalSum(calculateTotalSum(orderRows));
        Person person = new Person();
        person.setEmail(email);
        order.setPerson(person); // primaarvõti on email
        order.setOrderRows(orderRows);
        return orderRepository.save(order);
    }

    private double calculateTotalSum(List<OrderRow> orderRows) {
        double sum = 0;
        for (OrderRow row: orderRows) {
            Product product = productRepository.findById(row.getProduct().getName()).orElseThrow();
            sum += row.getQuantity() * product.getPrice();
        }
        return sum;
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public PaymentLink getPaymentLink(Order order) {
        String url = everypayBaseUrl + "/payments/oneoff";

        EveryPayBody body = new EveryPayBody();
        body.setAccount_name("EUR3D1");
        body.setNonce("dase3213a" + ZonedDateTime.now() + Math.random());
        body.setTimestamp(ZonedDateTime.now().toString());
        body.setAmount(order.getTotalSum());
        body.setOrder_reference(order.getId().toString());
        body.setCustomer_url(everypayCustomerUrl);
        body.setApi_username(everypayUsername);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBasicAuth(everypayUsername, everypayPassword);

        HttpEntity<EveryPayBody> entity = new HttpEntity<>(body, headers);

        ResponseEntity<EveryPayResponse> response = restTemplate.exchange(url, HttpMethod.POST, entity, EveryPayResponse.class);
        PaymentLink link = new PaymentLink();
        link.setLink(response.getBody().getPayment_link());
        return link;
    }

    public Boolean checkPayment(String paymentRef) {
        String url = everypayBaseUrl + "/payments/" + paymentRef
                +  "?api_username=" + everypayUsername + "&detailed=false";

        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(everypayUsername, everypayPassword);

        HttpEntity<HttpHeaders> entity = new HttpEntity<>(headers);

        ResponseEntity<EveryPayCheck> response = restTemplate.exchange(url, HttpMethod.GET, entity, EveryPayCheck.class);

        EveryPayCheck responseBody = response.getBody();
        if (responseBody == null) {
            return false;
        }

        Long orderId = Long.valueOf(responseBody.getOrder_reference());
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setPayment(responseBody.getPayment_state());
        orderRepository.save(order);

        return responseBody.getPayment_state().equals("settled");
    }
}
