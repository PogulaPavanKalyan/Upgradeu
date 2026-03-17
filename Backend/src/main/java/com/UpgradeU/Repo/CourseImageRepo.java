package com.UpgradeU.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.UpgradeU.Entity.CourseImageEntity;


import java.util.Optional;

public interface CourseImageRepo  extends JpaRepository<CourseImageEntity, Integer>{
    Optional<CourseImageEntity> findByCourseId(Long courseId);
}
