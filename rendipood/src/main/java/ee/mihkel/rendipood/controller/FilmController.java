package ee.mihkel.rendipood.controller;

import ee.mihkel.rendipood.entity.Film;
import ee.mihkel.rendipood.entity.FilmType;
import ee.mihkel.rendipood.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FilmController {

    @Autowired
    FilmRepository filmRepository;

    @PostMapping("films")
    public List<Film> addFilm(@RequestBody Film film) {
        // ID tuleb GeneratedValue
        // name --> tuleb
        // type --> tuleb
        film.setAvailable(true);
        film.setDaysOut(0);
        film.setRental(null);
        filmRepository.save(film);
        return filmRepository.findAll();
    }

    // localhost:8080/films/1
    @DeleteMapping("films/{filmId}")
    public List<Film> removeFilm(@RequestBody Long filmId) {
        filmRepository.deleteById(filmId);
        return filmRepository.findAll();
    }

    // localhost:8080/films?filmId=1&newType=OLD
    @PatchMapping("films")
    public List<Film> changeFilmType(@RequestParam Long filmId, FilmType newType) {
        Film film = filmRepository.findById(filmId).get();
        film.setType(newType);
        filmRepository.save(film);
        return filmRepository.findAll();
    }

    @GetMapping("films")
    public List<Film> getFilms() {
        return filmRepository.findAll();
    }

//    @GetMapping("films")
//    public List<Film> getAvailableFilms() {
//        List<Film> availableFilms = new ArrayList<>();
//        for (Film film: filmRepository.findAll()) {
//            if (film.isAvailable()) {
//                availableFilms.add(film);
//            }
//        }
//        return availableFilms;
//    }

    @GetMapping("available-films")
    public List<Film> getAvailableFilms() {
        return filmRepository.findByAvailableTrue();
    }

    @GetMapping("film-types")
    public FilmType[] getFilmTypes() {
        return FilmType.values();
    }
}
