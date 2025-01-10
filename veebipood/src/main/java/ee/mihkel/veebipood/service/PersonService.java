package ee.mihkel.veebipood.service;

import ee.mihkel.veebipood.dto.AuthToken;
import ee.mihkel.veebipood.dto.EmailPassword;
import ee.mihkel.veebipood.dto.PersonDTO;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.repository.PersonRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import javax.crypto.SecretKey;
import java.util.*;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;

    @Autowired
    ModelMapper modelMapper;

    public AuthToken signup(Person person) {
        if (person.getFirstName().length() < 2 || person.getFirstName().length() > 30) {
            throw new RuntimeException("FIRST_NAME_LENGTH_ERROR");
        }

        if (person.getLastName().length() < 3 || person.getLastName().length() > 30) {
            throw new RuntimeException("LAST_NAME_LENGTH_ERROR");
        }

        if (person.getPassword().length() < 6 || person.getPassword().length() > 20) {
            throw new RuntimeException("PASSWORD_LENGTH_ERROR");
        }

        // m@x.ee
        if (person.getEmail().length() < 6 || person.getEmail().length() > 40) {
            throw new RuntimeException("EMAIL_LENGTH_ERROR");
        }

        Optional<Person> optionalPersonEmail = personRepository.findById(person.getEmail());
        if (optionalPersonEmail.isPresent()) {
            throw new RuntimeException("EMAIL_EXISTS_ERROR");
        };

        person.setAdmin(false);

        personRepository.save(person);
        AuthToken token = new AuthToken();
        token.setToken(person.getEmail());
        token.setExpiration(new Date());

        return token;
    }

    public AuthToken login(EmailPassword emailPassword) {
        Optional<Person> optionalPerson = personRepository.findById(emailPassword.getEmail());
        if (optionalPerson.isEmpty()) {
            throw new RuntimeException("EMAIL_WRONG_ERROR");
        }
        if (!optionalPerson.get().getPassword().equals(emailPassword.getPassword())) {
            throw new RuntimeException("PASSWORD_WRONG_ERROR");
        }
//        AuthToken token = new AuthToken();
//        Person person = optionalPerson.get();
//        token.setToken(generateToken(person));
//        token.setExpiration(new Date());
//        token.setAdmin(person.isAdmin());
//        return token;
        return generateToken(optionalPerson.get());
    }

    private AuthToken generateToken(Person person) {
        Date expiration = new Date((new Date()).getTime() + 3 * 60 * 1000);
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode("nz85wGYIqsd0JK23hhg5iYhEM9dLI2CAlCegPyx5XQs="));

        Map<String, String> claims = new HashMap<>();
        claims.put("email", person.getEmail());

        String token = Jwts.builder()
                .expiration(expiration)
                .signWith(key) // tokeni valideerimiseks (kas on meie token)
                .claims(claims)  // tokeni küljes olevad andmed
                .compact();
        AuthToken authToken = new AuthToken();
        authToken.setToken(token);
        authToken.setExpiration(expiration); // expiration aeg
        authToken.setAdmin(person.isAdmin());
        return authToken;
    }

    public Person getPerson(String token) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode("nz85wGYIqsd0JK23hhg5iYhEM9dLI2CAlCegPyx5XQs="));

        String id = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("email").toString();
        return personRepository.findById(id).orElseThrow();
    }

    public Person editPerson(Person person) {
        Optional<Person> personOptional = personRepository.findById(person.getEmail());
        if (personOptional.isEmpty()) {
            throw new RuntimeException("Ei saa muuta, kuna sellist e-maili pole!");
        }
        if (person.getPassword().length() < 6) {
            throw new RuntimeException("Parool on liiga lühike!");
        }
        if (person.getFirstName().length() < 2) {
            throw new RuntimeException("Eesnimi on liiga lühike!");
        }
        if (person.getLastName().length() < 2) {
            throw new RuntimeException("Perenimi on liiga lühike!");
        }
        return personRepository.save(person);
    }

//    public List<PersonDTO> getPublicPersons() {
//        List<Person> persons = personRepository.findAll();
//        List<PersonDTO> personDTOs = new ArrayList<>();
//        for (Person p: persons) {
//            PersonDTO personDTO = new PersonDTO();
//            personDTO.setFirstName(p.getFirstName());
//            personDTO.setLastName(p.getLastName());
//            personDTO.setEmail(p.getEmail());
//            personDTOs.add(personDTO);
//        }
//        return personDTOs;
//    }

    public List<PersonDTO> getPublicPersons() {
//        ModelMapper modelMapper = new ModelMapper(); <-- selle asemel on @Autowired
        return Arrays.asList(modelMapper.map(personRepository.findAll(), PersonDTO[].class));
//        PersonDTO[] personDTOs = {};
//        modelMapper.map(personRepository.findAll(), personDTOs);
//        return List.of(personDTOs);
    }
}
