package com.UpgradeU.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BackgroundImagesEntity {

	public BackgroundImagesEntity() {
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String image_name;
	
	private String image_path;
	private String image_type;
	
	public BackgroundImagesEntity(int id, String image_name, String image_path, String image_type) {
		super();
		this.id = id;
		this.image_name = image_name;
		this.image_path = image_path;
		this.image_type = image_type;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getImage_name() {
		return image_name;
	}
	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}
	public String getImage_path() {
		return image_path;
	}
	public void setImage_path(String image_path) {
		this.image_path = image_path;
	}
	public String getImage_type() {
		return image_type;
	}
	public void setImage_type(String image_type) {
		this.image_type = image_type;
	}
	
}
