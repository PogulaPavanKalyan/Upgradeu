package com.UpgradeU.Repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.JpaRepositoryConfigExtension;

import com.UpgradeU.Entity.Users;
import com.UpgradeU.enums.Role;

public interface UserRepo extends JpaRepository<Users, Integer>{
	
	@Query("Select p from Users p where p.username=:Username")
	Users FindByUsername(String Username);
    List<Users> findByRole(Role role);
   
}
