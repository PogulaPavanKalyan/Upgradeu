package com.UpgradeU.Dto;

import com.UpgradeU.Entity.Course;

public class PaymentDto {

	private Course course;
	public PaymentDto() {}

	public PaymentDto(Course course) {
		super();
		this.course = course;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}
	
}
