package com.UpgradeU.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Sections {


	public Sections() {
		
	}
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	
	@ManyToOne
	@JoinColumn(name = "course_id") 
	private Course course;
	
	
	@OneToMany(mappedBy = "section", cascade=CascadeType.ALL)
	private List<videoEntity> video;
	
	
	private String sectionname;


	public Sections(int id, Course course, List<videoEntity> video, String sectionname) {
		super();
		this.id = id;
		this.course = course;
		this.video = video;
		this.sectionname = sectionname;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public Course getCourse() {
		return course;
	}


	public void setCourse(Course course) {
		this.course = course;
	}


	public List<videoEntity> getVideo() {
		return video;
	}


	public void setVideo(List<videoEntity> video) {
		this.video = video;
	}


	public String getSectionname() {
		return sectionname;
	}


	public void setSectionname(String sectionname) {
		this.sectionname = sectionname;
	}


	
	
	
}
