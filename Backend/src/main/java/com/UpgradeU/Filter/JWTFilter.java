package com.UpgradeU.Filter;

import java.io.IOException;
import java.security.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.UpgradeU.Service.MyUserDetailsService;
import com.UpgradeU.Service.jwtservice;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class JWTFilter  extends OncePerRequestFilter{
	
	@Autowired
	private jwtservice jwtservices;
	
	@Autowired
	private ApplicationContext context;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		 String path=request.getServletPath();
		 
		 if (path.startsWith("/login")  || path.startsWith("/getimage")) {
			    filterChain.doFilter(request, response);
			    return;
			}
		 
		 String token=null;
		 String authHeader=request.getHeader("Authorization");
		 String username=null;
		 
		 if(authHeader !=null&& authHeader.startsWith("Bearer "));
		 {
			 token=authHeader.substring(7);
			 username=jwtservices.extractUsername(token);
		 }
		
		 
		 if(username !=null && SecurityContextHolder.getContext().getAuthentication()==null)
		 {
			 UserDetails userDetails=context.getBean(MyUserDetailsService.class).loadUserByUsername(username);
			 
			 if(jwtservices.validate(token,userDetails))
			 {
			UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
			
			authToken.setDetails(userDetails);
			
			SecurityContextHolder.getContext().setAuthentication(authToken);
			
			 }
			 
			 filterChain.doFilter(request, response);
		 }
	}
	
	
	
	
	


}
