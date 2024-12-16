package ee.mihkel.rendipood.service;

import ee.mihkel.rendipood.entity.Film;
import ee.mihkel.rendipood.entity.Rental;
import ee.mihkel.rendipood.repository.FilmRepository;
import ee.mihkel.rendipood.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentalService {

    @Autowired
    RentalRepository rentalRepository;

    @Autowired
    FilmRepository filmRepository;

                    // Kariibi mere piraadid, Old
    public List<Rental> startRental(List<Film> films) {
        Rental rental = new Rental(); // ID generationType Identity ----> andmebaas genereerib ID
        // id --> 0
        // sum --> 0
        // lateFee --> 0
        Rental dbRental = rentalRepository.save(rental);
        // id --> Andmebaasist saadud ID
        // sum --> 0
        // lateFee --> 0
        int sum = 0;
        for (Film film: films) {
            Film dbFilm = filmRepository.findById(film.getId()).get();
//            film.setId(); // FRONT-ENDIST
            dbFilm.setDaysOut(film.getDaysOut()); // FRONT-ENDIST
//            film.setName(); // ANDMEBAASIST
//            film.setType(); // ANDMEBAASIST
            dbFilm.setAvailable(false); // AUTOMAATSELT
            dbFilm.setRental(dbRental); // AUTOMAATSELT
            sum += calculateSum(film);
            filmRepository.save(dbFilm); // andmebaasist läheb film salvestuma, mitte enam front-endist
        }
        dbRental.setSum(sum);
        rentalRepository.save(dbRental);
        return rentalRepository.findAll();
    }

    private final int PREMIUM_PRICE = 4;
    private final int BASIC_PRICE = 3;

    private int calculateSum(Film film) {
        switch (film.getType()) {
            case NEW -> {
                return film.getDaysOut() * PREMIUM_PRICE;
            }
            case REGULAR -> {
                if (film.getDaysOut() <= 3) {
                    return BASIC_PRICE;
                }
                return BASIC_PRICE + (film.getDaysOut()-3) * BASIC_PRICE;
            }
            case OLD -> {
                if (film.getDaysOut() <= 5) {
                    return BASIC_PRICE;
                }
                return BASIC_PRICE + (film.getDaysOut()-5) * BASIC_PRICE;
            }
            default -> {
                return 0;
            }
        }
    }

    public List<Rental> endRental(List<Film> films) {
        return rentalRepository.findAll();
    }
}
