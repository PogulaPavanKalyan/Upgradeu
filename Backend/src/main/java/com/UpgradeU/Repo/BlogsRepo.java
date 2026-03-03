package com.UpgradeU.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.UpgradeU.Entity.BlogsEntity;

public interface BlogsRepo extends JpaRepository<BlogsEntity, Integer> {

}
