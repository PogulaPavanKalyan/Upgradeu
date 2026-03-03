package com.UpgradeU.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.UpgradeU.Dto.PaymentDto;
import com.UpgradeU.Dto.ProfileUpdatedDto;
import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.PaymentEntity;
import com.UpgradeU.Entity.Users;
import com.UpgradeU.Repo.CourseRepo;
import com.UpgradeU.Repo.PaymentRepo;
import com.UpgradeU.Repo.UserRepo;

@Service
public class PaymentService {
	
	@Autowired
	private CourseRepo cr;
	@Autowired
	private UserRepo ur;
	@Autowired
	private PaymentRepo pr;

	public String buynewCourse(Long id) {
	
		Course c=cr.findById(id).orElseThrow();
		
		String username=SecurityContextHolder.getContext().getAuthentication().getName();
		Users u=ur.FindByUsername(username);
	
		
		PaymentEntity p=new PaymentEntity();
		p.setCourse(c);
		p.setUser(u);
		p.setDate(LocalDate.now());
		p.setTime(LocalTime.now());
		pr.save(p);
		
		return "sucess";
	}

	public PaymentDto mycourses(PaymentDto dto) {

		String username=SecurityContextHolder.getContext().getAuthentication().getName();
		Users v=ur.FindByUsername(username);
		
		PaymentDto p=new PaymentDto();
		return p;

	  
}

}