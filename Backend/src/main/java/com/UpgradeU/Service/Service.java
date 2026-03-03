package com.UpgradeU.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;


import com.UpgradeU.Dto.LoginDTO;
import com.UpgradeU.Repo.UserRepo;

public class Service {
	
	@Autowired
	private jwtservice jwtservice;
	
	@Autowired
	private UserRepo uRepo;
	
	@Autowired
	private AuthenticationManager authManager;
	
	public String verify(LoginDTO login) {
		Authentication auth=authManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(),login.getPassword()));
		
		if(auth !=null)
		{
			return jwtservice.generateToken(login.getUsername());
		}
	return null;
	
}
	

}
