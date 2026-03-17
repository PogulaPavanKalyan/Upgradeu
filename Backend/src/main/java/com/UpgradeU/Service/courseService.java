package com.UpgradeU.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.VideoEntity;
import com.UpgradeU.Repo.CourseRepo;
import com.UpgradeU.Repo.VideoRepo;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class courseService {
	
	@Autowired
	private CourseRepo repo;
	
	@Autowired
	private VideoRepo ve;
	

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
	

	    @Transactional
	    public void deleteCourse(Long courseId) {
	        if (!repo.existsById(courseId)) {
	            throw new EntityNotFoundException("Course not found with id: " + courseId);
	        }

	        List<VideoEntity> videos = ve.findByCourseId(courseId);
	        for (VideoEntity video : videos) {
	            ve.deleteById(video.getId());
	        }
	        
	        
	        
	        // 👇 Uncomment whichever tables exist in your DB
//	         enrollmentRepo.deleteByCourseId(courseId);
//	         moduleRepo.deleteByCourseId(courseId);
//       lessonRepo.deleteByCourseId(courseId);
//	         quizRepo.deleteByCourseId(courseId);
//	         progressRepo.deleteByCourseId(courseId);
//	         reviewRepo.deleteByCourseId(courseId);
//	         cartRepo.deleteByCourseId(courseId);
//	         orderRepo.deleteByCourseId(courseId);

	        repo.deleteById(courseId);
	    }
	}