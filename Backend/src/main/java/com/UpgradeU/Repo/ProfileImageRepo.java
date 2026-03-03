package com.UpgradeU.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.UpgradeU.Entity.ProfileImageEntity;
import com.UpgradeU.Entity.Users;

public interface ProfileImageRepo extends JpaRepository<ProfileImageEntity, Long>{
	
	
  @Query("select p from ProfileImageEntity p where p.user.id=:id")
  ProfileImageEntity FindByuserid(Integer id);

}
