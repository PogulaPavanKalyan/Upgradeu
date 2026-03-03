package com.UpgradeU.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.UpgradeU.Filter.JWTFilter;

@Configuration
public class Security {
	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	public JWTFilter jwtFilter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) {

		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

		http.authorizeHttpRequests(req -> req
				.requestMatchers("/login/**", "/error", "/getimage/**")
				.permitAll()
				.anyRequest()
				.authenticated());
		http.sessionManagement(ses -> ses.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.csrf(csrf -> csrf.disable());
		http.formLogin(login -> login.disable());
		http.httpBasic(Customizer.withDefaults());
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
		return http.build();
	}

	@Bean
	public AuthenticationProvider authProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
		provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
		return provider;
	}

	@Bean
	public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
//		http://localhost:5173
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}

}
