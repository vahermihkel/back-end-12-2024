package ee.mihkel.veebipood.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Log4j2
@Component
public class JwtFilter extends BasicAuthenticationFilter {

    public JwtFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        log.info(request.getMethod());
        log.info(request.getRequestURL());
        log.info(request.getRequestURI());
        log.info(response.getStatus());

        // if alla <--- Tokeni valideerimine
        Authentication authentication = new UsernamePasswordAuthenticationToken("UNIKAALSUSE_TUNNUS", "NIMI", new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        super.doFilterInternal(request, response, filterChain);
    }
}
