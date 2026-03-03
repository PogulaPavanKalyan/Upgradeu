package com.UpgradeU.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class ProfileImageEntity {
	
	public ProfileImageEntity() {
		
	}

	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY )
	private Long id;
    private String image_name;
	private String image_path;
	private String image_type;
	
	@JsonBackReference
	@OneToOne
	@JoinColumn(name="user_id", unique=true)
	private Users user;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
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
	public Users getUser() {
		return user;
	}
	public void setUser(Users user) {
		this.user = user;
	}
	public ProfileImageEntity(Long id, String image_name, String image_path, String image_type, Users user) {
		super();
		this.id = id;
		this.image_name = image_name;
		this.image_path = image_path;
		this.image_type = image_type;
		this.user = user;
	}
	
	
	
}
