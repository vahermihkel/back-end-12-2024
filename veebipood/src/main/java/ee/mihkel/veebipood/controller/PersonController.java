package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.dto.AuthToken;
import ee.mihkel.veebipood.dto.EmailPassword;
import ee.mihkel.veebipood.dto.PersonDTO;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class PersonController {

    @Autowired
    PersonService personService;

    @PostMapping("login")
    public AuthToken login(@RequestBody EmailPassword emailPassword) {
        return personService.login(emailPassword);
    }

    @PostMapping("signup")
    public AuthToken signup(@RequestBody Person person) {
        return personService.signup(person);
    }

    @GetMapping("person")
    public Person getPerson() {
        return personService.getPerson();
    }

    @PutMapping("person")
    public Person editPerson(@RequestBody Person person) {
        return personService.editPerson(person);
    }

    @GetMapping("public-persons")
    public List<PersonDTO> getPublicPersons() {
        return personService.getPublicPersons();
    }
}
