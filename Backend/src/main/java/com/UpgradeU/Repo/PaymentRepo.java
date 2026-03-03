package com.UpgradeU.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.UpgradeU.Entity.PaymentEntity;
import com.UpgradeU.Entity.Users;

public interface PaymentRepo extends JpaRepository<PaymentEntity, Integer> {

	@Query("select p from PaymentEntity p where p.user=:u")
	List<PaymentEntity> findByUser(Users u);

}
