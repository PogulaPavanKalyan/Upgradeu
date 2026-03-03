package com.UpgradeU.Entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class AddtoCartEntity {
	public AddtoCartEntity() {
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	  @ManyToOne
	@JoinColumn(name="course_id")
	private Course course;
	@ManyToOne
	@JoinColumn(name="user_id")
	private Users user;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	public Users getUser() {
		return user;
	}
	public void setUser(Users user) {
		this.user = user;
	}
	public AddtoCartEntity(Integer id, Course course, Users user) {
		super();
		this.id = id;
		this.course = course;
		this.user = user;
	}
	

}
