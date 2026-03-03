package com.UpgradeU.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	private String comment;
	private Long rating;
	   @ManyToOne
	    @JoinColumn(name = "course_id")
	    private Course course;
	   
	   public Review(int id, String comment, Long rating, Course course) {
		super();
		this.id = id;
		this.comment = comment;
		this.rating = rating;
		this.course = course;
	}
	   public int getId() {
		   return id;
	   }
	   public void setId(int id) {
		   this.id = id;
	   }
	   public String getComment() {
		   return comment;
	   }
	   public void setComment(String comment) {
		   this.comment = comment;
	   }
	   public Long getRating() {
		   return rating;
	   }
	   public void setRating(Long rating) {
		   this.rating = rating;
	   }
	   public Course getCourse() {
		   return course;
	   }
	   public void setCourse(Course course) {
		   this.course = course;
	   }
	
	
	
}
