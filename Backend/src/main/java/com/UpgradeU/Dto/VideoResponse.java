package com.UpgradeU.Dto;



public class VideoResponse {
	
	public VideoResponse() {
		
	}
	
	private int videoId;
	private String videPath;
	private String videoType;
	
	private String CourseName;

	public VideoResponse(int videoId, String videPath, String videoType, String courseName) {
		super();
		this.videoId = videoId;
		this.videPath = videPath;
		this.videoType = videoType;
		CourseName = courseName;
	}

	public int getVideoId() {
		return videoId;
	}

	public void setVideoId(int videoId) {
		this.videoId = videoId;
	}

	public String getVidePath() {
		return videPath;
	}

	public void setVidePath(String videPath) {
		this.videPath = videPath;
	}

	public String getVideoType() {
		return videoType;
	}

	public void setVideoType(String videoType) {
		this.videoType = videoType;
	}

	public String getCourseName() {
		return CourseName;
	}

	public void setCourseName(String courseName) {
		CourseName = courseName;
	}
	

}
