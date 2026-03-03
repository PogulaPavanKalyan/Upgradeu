package com.UpgradeU.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.UpgradeU.Entity.BackgroundImagesEntity;

public interface BackgroundImageRepo extends JpaRepository<BackgroundImagesEntity, Integer> {

}
