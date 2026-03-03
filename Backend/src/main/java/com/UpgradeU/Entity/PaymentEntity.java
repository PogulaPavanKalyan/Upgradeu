package com.UpgradeU.Entity;



import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.apache.catalina.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class PaymentEntity {
	
	public PaymentEntity() {
	}

	
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private int id;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private Users user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="course_id")
	private Course course;
	private String orderid;
	private LocalDate date;
	private LocalTime time;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Users getUser() {
		return user;
	}
	public void setUser(Users user) {
		this.user = user;
	}
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	public String getOrderid() {
		return orderid;
	}
	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public LocalTime getTime() {
		return time;
	}
	public void setTime(LocalTime time) {
		this.time = time;
	}
	public PaymentEntity(int id, Users user, Course course, String orderid, LocalDate date, LocalTime time) {
		super();
		this.id = id;
		this.user = user;
		this.course = course;
		this.orderid = orderid;
		this.date = date;
		this.time = time;
	}
	
	
	
	
}