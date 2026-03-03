package com.UpgradeU.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.UpgradeU.Entity.AddtoCartEntity;
import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.Users;
import com.UpgradeU.Repo.AddtoCartRepo;
import com.UpgradeU.Repo.CourseRepo;
import com.UpgradeU.Repo.UserRepo;

@Service
public class AddtocartService {

	@Autowired
	private AddtoCartRepo ar;
	
	@Autowired
	private CourseRepo cr;
	
	@Autowired
	private UserRepo ur;
	
	public String addtocart(Long id)
	{
		String username=SecurityContextHolder.getContext().getAuthentication().getName();
     Users u= ur.FindByUsername(username);
     Course c=cr.findById(id).orElseThrow(()->new RuntimeException("course not found"));
//     List<Course> clist=new ArrayList<Course>();
//     clist.add(c);
     AddtoCartEntity p=new AddtoCartEntity();
     p.setUser(u);
     p.setCourse(c);
     
     ar.save(p);
     
     return "Course added to cart successfully";
	}

	public void deletecartitem(Integer id) {
		
		ar.deleteById(id);
		
		
	}
	
	
	
}
