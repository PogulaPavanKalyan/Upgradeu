package com.UpgradeU.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.UpgradeU.Entity.ExamAttemptEntity;

public interface ExamAttemptRepo extends JpaRepository<ExamAttemptEntity, Long> {
	List<ExamAttemptEntity> findByUserId(Long userId);

}

