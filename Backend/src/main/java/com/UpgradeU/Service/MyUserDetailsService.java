package com.UpgradeU.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.UpgradeU.Entity.Users;
import com.UpgradeU.Repo.UserRepo;

@Service
public class MyUserDetailsService  implements UserDetailsService{
	
	@Autowired
	private UserRepo userRepo;
	
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users details=userRepo.FindByUsername(username);
		
		if(details==null)
		{
			throw new UsernameNotFoundException("v");
		}
		return new principal(details);
	}
	
	

}
