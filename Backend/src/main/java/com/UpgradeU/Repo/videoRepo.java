package com.UpgradeU.Repo;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.VideoEntity;


public interface VideoRepo extends JpaRepository<VideoEntity, Integer>{

	@Query("select v from VideoEntity v where v.course=:c ")
	 List<VideoEntity> findByCourse(Course c);
	 
	 @Query("select v from VideoEntity v where v.course.id=:id")
	List<VideoEntity> getList(int id);

	List<VideoEntity> findByCourseId(Long courseId);

}
