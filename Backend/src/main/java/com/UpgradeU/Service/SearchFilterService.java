package com.UpgradeU.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UpgradeU.Entity.Course;
import com.UpgradeU.Repo.CourseRepo;

@Service
public class SearchFilterService {

	@Autowired
	private CourseRepo cr;
	
	public List<Course>search(String keyword){
		if(keyword==null || keyword.trim().isEmpty())
		{
			return cr.findAll();
		}
		return cr.searchCourses(keyword);
	}
	
	
	
	
}
