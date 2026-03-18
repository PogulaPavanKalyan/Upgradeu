package com.UpgradeU.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.UpgradeU.Entity.StudentVideoProgress;

public interface StudentVideoProgressRepo
        extends JpaRepository<StudentVideoProgress, Long> {

    Optional<StudentVideoProgress> findByStudentIdAndVideoId(Integer studentId, int videoId);
}