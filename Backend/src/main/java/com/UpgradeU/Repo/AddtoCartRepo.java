package com.UpgradeU.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.UpgradeU.Entity.AddtoCartEntity;
import com.UpgradeU.Entity.Users;

public interface AddtoCartRepo extends JpaRepository<AddtoCartEntity,Integer>{

	@Query("select p from AddtoCartEntity p where p.user=:v")
	List<AddtoCartEntity> findByUser(Users v);

}
