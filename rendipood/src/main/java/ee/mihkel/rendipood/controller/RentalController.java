package ee.mihkel.rendipood.controller;

import ee.mihkel.rendipood.dto.FilmDTO;
import ee.mihkel.rendipood.entity.Film;
import ee.mihkel.rendipood.entity.Rental;
import ee.mihkel.rendipood.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RentalController {

    @Autowired
    RentalService rentalService;

    @PostMapping("start-rental")
    public Rental startRental(@RequestBody List<Film> films) {
        return rentalService.startRental(films);
    }

    @PostMapping("end-rental") // TODO: ei saa filme panna, kuna kuhugi peab minema mitu päeva tegelikult oli
    public List<Rental> endRental(@RequestBody List<FilmDTO> filmsDTOs) {
        return rentalService.endRental(filmsDTOs);
    }
}
