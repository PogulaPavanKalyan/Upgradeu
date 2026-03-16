package com.UpgradeU.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.UpgradeU.Entity.Exam;
public interface ExamRepo extends JpaRepository<Exam, Long> {

    Exam findByVideo_Id(int videoId);
}
