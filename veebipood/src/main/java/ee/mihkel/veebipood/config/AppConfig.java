package ee.mihkel.veebipood.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;


@Configuration
public class AppConfig {

    // @Bean --> võimaldab @Autowired teha
    @Bean
    public ModelMapper getModelMapper() {
        return new ModelMapper();
    }

//    @Bean
//    public Scanner getScanner() {
//        return new Scanner(System.in);
//    }
//
//    @Bean
//    public Random getRandom() {
//        return new Random();
//    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
