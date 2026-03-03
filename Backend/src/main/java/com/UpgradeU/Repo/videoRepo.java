package com.UpgradeU.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.videoEntity;

public interface videoRepo extends JpaRepository<videoEntity, Integer>{

	@Query("select v from videoEntity v where v.course=:c ")
	 List<videoEntity> findByCourse(Course c);
	 
	 @Query("select v from videoEntity v where v.course.id=:id")
	List<videoEntity> getList(int id);

	List<videoEntity> findByCourseId(Long courseId);

}
