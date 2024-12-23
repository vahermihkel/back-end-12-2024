package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {

    @Autowired
    PersonService personService;

    @PostMapping("login")
    public String login() {
        return "";
    }

    @PostMapping("signup")
    public String signup(@RequestBody Person person) {
        return personService.signup(person);
    }
}
