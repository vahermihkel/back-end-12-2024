package ee.mihkel.veebipood.config;

import ee.mihkel.veebipood.security.JwtFilter;
import jakarta.servlet.GenericFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors().and().headers().xssProtection().disable().and()
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((auth -> auth
//                .requestMatchers(HttpMethod.POST, "/products").authenticated()
//                .anyRequest().permitAll()));
//                        .requestMatchers(HttpMethod.GET, "/products").permitAll()
                        .requestMatchers(HttpMethod.GET, "/product/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/public-products/**").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/products-by-category/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/categories").permitAll()
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/signup").permitAll()
                        .requestMatchers(HttpMethod.GET, "/swagger-ui.html").permitAll()
                        .requestMatchers(HttpMethod.GET, "/v3/api-docs").permitAll()
                        .requestMatchers(HttpMethod.GET, "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/electricity-prices").permitAll()
                        .requestMatchers(HttpMethod.GET, "/parcel-machines").permitAll()
                        .requestMatchers(HttpMethod.GET, "/check-payment").permitAll()
                        .requestMatchers(HttpMethod.GET, "/supplier1").permitAll()
                        .requestMatchers(HttpMethod.GET, "/supplier2").permitAll()
                        .requestMatchers(HttpMethod.GET, "/supplier3").permitAll()
                        .requestMatchers(HttpMethod.POST, "/products").hasAuthority("admin")
                        .requestMatchers(HttpMethod.DELETE, "/products/**").hasAuthority("admin")
                        .requestMatchers(HttpMethod.POST, "/categories").hasAuthority("admin")
                        .requestMatchers(HttpMethod.DELETE, "/categories/**").hasAuthority("admin")
                        .requestMatchers(HttpMethod.PUT, "/products").hasAuthority("admin")
                        .requestMatchers(HttpMethod.PATCH, "/**").hasAuthority("admin")
                        .anyRequest().authenticated()))
                .addFilterBefore(jwtFilter, BasicAuthenticationFilter.class);

        return http.build();
    }
}
