package ee.mihkel.veebipood.service;

import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;


    public String signup(Person person) {
        personRepository.save(person);
        return "";
    }
}
