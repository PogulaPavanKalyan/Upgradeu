package com.UpgradeU.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UpgradeU.Entity.Course;
import com.UpgradeU.Repo.CourseRepo;

@Service
public class courseService {
	
	@Autowired
	private CourseRepo repo;
	
	

	public Course addCourse(Course course) {
		return repo.save(course);
		
	}

	public Course getCourseByCourse(long courseID) {
	
		return repo.findById(courseID).orElseThrow();
	}

	public List<Course> getCourseByCourseAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}


	

	public Course editcourse(Course course) {
			 Course i =repo.findById(course.getId())
		     .orElseThrow(()->new RuntimeException("Course not found"));
			 
			 
			 i.setCourse_duration(course.getCourse_duration());
			 i.setTitle(course.getTitle());
			 i.setMode(course.getMode());
			 i.setCourse_Name(course.getCourse_Name());
			 i.setDescription(course.getDescription());
			 i.setPrice(course.getPrice());
			 i.setCategory(course.getCategory());
			 i.setThumbnailimage(course.getThumbnailimage());
			 i.setVideo(course.getVideo());
			 i.setDate(course.getDate());
			 
			
			 
			 
			 return repo.save(i);
		 }
	
	public void deleteCourse(Long courseId) {
		repo.deleteById(courseId);
	}
}
