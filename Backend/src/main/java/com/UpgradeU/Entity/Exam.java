package com.UpgradeU.Entity;

import java.util.List;


import com.UpgradeU.Entity.Question;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String examName;
    private int totalMarks;
    private int passMarks;
    

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @OneToOne
    @JoinColumn(name = "video_id", nullable = false, unique = true)
    private VideoEntity video;


    @ElementCollection
    @CollectionTable(
        name = "exam_questions",
        joinColumns = @JoinColumn(name = "exam_id")
    )
    private List<Question> questions;
    
    public Exam() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
		
	
	}

	public String getExamName() {
		return examName;
	}

	public void setExamName(String examName) {
		this.examName = examName;
	}

	public int getTotalMarks() {
		return totalMarks;
	}

	public void setTotalMarks(int totalMarks) {
		this.totalMarks = totalMarks;
	}

	public int getPassMarks() {
		return passMarks;
	}

	public void setPassMarks(int passMarks) {
		this.passMarks = passMarks;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public VideoEntity getVideo() {
		return video;
	}

	public void setVideo(VideoEntity video) {
		this.video = video;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	public Exam(Long id, String examName, int totalMarks, int passMarks, Course course, VideoEntity video,
			List<Question> questions) {
		super();
		this.id = id;
		this.examName = examName;
		this.totalMarks = totalMarks;
		this.passMarks = passMarks;
		this.course = course;
		this.video = video;
		this.questions = questions;
	}

	


    

    // getters & setters
}
