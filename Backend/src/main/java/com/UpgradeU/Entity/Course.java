package com.UpgradeU.Entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Course {
	public Course() {}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String course_duration;
	private String title;
	private String mode;
	private String course_Name;
	private String description;
	private long price;
	private String category;
	
	@OneToOne(mappedBy = "course", cascade=CascadeType.ALL)
	@JsonIgnore
	private CourseImageEntity thumbnailimage;
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonBackReference
	private List<VideoEntity> video;
	private LocalDateTime date;
	
	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
	private List<Sections> sections;
	

	public Course(Long id, String course_duration, String title, String mode, String course_Name, String description,
			long price, String category, CourseImageEntity thumbnailimage, List<VideoEntity> video, LocalDateTime date,
			List<Sections> sections) {
		super();
		this.id = id;
		this.course_duration = course_duration;
		this.title = title;
		this.mode = mode;
		this.course_Name = course_Name;
		this.description = description;
		this.price = price;
		this.category = category;
		this.thumbnailimage = thumbnailimage;
		this.video = video;
		this.date = date;
		this.sections = sections;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCourse_duration() {
		return course_duration;
	}

	public void setCourse_duration(String course_duration) {
		this.course_duration = course_duration;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getCourse_Name() {
		return course_Name;
	}

	public void setCourse_Name(String course_Name) {
		this.course_Name = course_Name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public CourseImageEntity getThumbnailimage() {
		return thumbnailimage;
	}

	public void setThumbnailimage(CourseImageEntity thumbnailimage) {
		this.thumbnailimage = thumbnailimage;
	}

	public List<VideoEntity> getVideo() {
		return video;
	}

	public void setVideo(List<VideoEntity> video) {
		this.video = video;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public List<Sections> getSections() {
		return sections;
	}

	public void setSections(List<Sections> sections) {
		this.sections = sections;
	}
	
	
	
	
	
		
}
