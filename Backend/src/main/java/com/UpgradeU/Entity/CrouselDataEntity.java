package com.UpgradeU.Entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CrouselDataEntity {
   public CrouselDataEntity() {
	   
   }
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
    private String image_name;
	private String image_path;
	private String image_type;
	private String Description;
	private String title;
	private String Actionbutton;
	
	
	
	public CrouselDataEntity(Integer id, String image_name, String image_path, String image_type, String description,
			String title, String actionbutton) {
		super();
		this.id = id;
		this.image_name = image_name;
		this.image_path = image_path;
		this.image_type = image_type;
		Description = description;
		this.title = title;
		Actionbutton = actionbutton;
	}

	
	public Integer getId() {
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
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getActionbutton() {
		return Actionbutton;
	}
	public void setActionbutton(String actionbutton) {
		Actionbutton = actionbutton;
	}


	
}
