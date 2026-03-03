package com.UpgradeU.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.UpgradeU.Entity.Course;

public interface CourseRepo extends JpaRepository<Course, Long> {
	
	@Query("""
		    SELECT c FROM Course c
		    WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :c, '%'))
		       OR LOWER(c.category) LIKE LOWER(CONCAT('%', :c, '%'))
		       OR STR(c.price) LIKE CONCAT('%', :c, '%')
		""")
	List<Course> searchCourses(String c);


	
	
}
