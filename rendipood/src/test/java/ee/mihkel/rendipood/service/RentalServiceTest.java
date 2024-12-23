package ee.mihkel.rendipood.service;

import ee.mihkel.rendipood.entity.Film;
import ee.mihkel.rendipood.entity.FilmType;
import ee.mihkel.rendipood.entity.Rental;
import ee.mihkel.rendipood.repository.FilmRepository;
import ee.mihkel.rendipood.repository.RentalRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class RentalServiceTest {

    @Mock
    RentalRepository rentalRepository;

    @Mock
    FilmRepository filmRepository;

    @InjectMocks
    RentalService rentalService;

    List<Film> films = new ArrayList<>();
    Film film = new Film();

    @BeforeEach
    void setUp() {
        film.setId(1L); // front-endist
        film.setDaysOut(7); //front-endist
        films.add(film);

        when(filmRepository.findById(1L)).thenReturn(Optional.of(film));
        Rental dbRental = new Rental();
        dbRental.setId(1L);
        when(rentalRepository.save(any())).thenReturn(dbRental);
    }

    @Test
    void givenFilmTypeIsNewAndRentedForSevenDays_WhenStartingRental_ThenSumIs28() {
        // GIVEN
        film.setType(FilmType.NEW); // nüüd on vaja seda ka panna, sest me ei võta andmebaasist

        // WHEN
        Rental rental = rentalService.startRental(films);

        // THEN
        assertEquals(28, rental.getSum());
    }

    // GIVEN_WHEN_THEN
    @Test
    void givenFilmTypeIsOldAndRentedForSevenDays_WhenStartingRental_ThenSumIs9() {
        film.setType(FilmType.OLD); // nüüd on vaja seda ka panna, sest me ei võta andmebaasist

        Rental rental = rentalService.startRental(films);
        assertEquals(9, rental.getSum());
    }

    @Test
    void endRental() {
    }
}