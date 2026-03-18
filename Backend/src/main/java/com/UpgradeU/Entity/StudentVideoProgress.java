package com.UpgradeU.Entity;

import jakarta.persistence.*;

@Entity
public class StudentVideoProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer studentId;

    private int videoId;
    
    private double lastWatchedTime;

    private boolean unlocked;

    public StudentVideoProgress() {}

    public StudentVideoProgress(Integer studentId, int videoId, boolean unlocked, double lastWatchedTime) {
        this.studentId = studentId;
        this.videoId = videoId;
        this.unlocked = unlocked;
        this.lastWatchedTime = lastWatchedTime;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public int getVideoId() {
		return videoId;
	}

	public void setVideoId(int videoId) {
		this.videoId = videoId;
	}

	public boolean isUnlocked() {
		return unlocked;
	}

	public void setUnlocked(boolean unlocked) {
		this.unlocked = unlocked;
	}

    public double getLastWatchedTime() {
        return lastWatchedTime;
    }

    public void setLastWatchedTime(double lastWatchedTime) {
        this.lastWatchedTime = lastWatchedTime;
    }
}