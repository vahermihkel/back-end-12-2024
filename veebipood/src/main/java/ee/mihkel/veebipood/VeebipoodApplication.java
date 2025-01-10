package ee.mihkel.veebipood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VeebipoodApplication {

	public static void main(String[] args) {
		SpringApplication.run(VeebipoodApplication.class, args);
	}

}

// E 16.12
// Decathlon --> veahaldus  ExceptionCatcher  inputist sisestamisel
// Decathlon --> Order By punktisumma (läbi back-endi, eraldi nupp, repositoryst)
// Võimalda sportlasi muuta --> suurem rõhk front-endile

// N 19.12
// E 23.12
// R 27.12 9.00-12.15
// E 30.12 13.00-16.15 autentimine
// N 02.01 13.00-16.15 autentimine --> Context, kaitseme front-endis URL
// N 09.01 13.00-16.15 autentimine --> kaitseme back-endis API endpointe
// R 10.01 13.00-16.15 autentimine --> rollid

// front-endis tõlge
