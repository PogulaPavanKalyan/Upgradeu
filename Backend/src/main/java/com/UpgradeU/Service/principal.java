package com.UpgradeU.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import com.UpgradeU.Entity.Users;

public class principal implements UserDetails {
	
	private final Users user;
	
	public principal(Users user)
	{
		this.user=user;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return List.of(new SimpleGrantedAuthority("ROLE_"+user.getRole()));
	}

	@Override
	public @Nullable String getPassword() {
	
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		
		return user.getUsername();
	}

	
}
