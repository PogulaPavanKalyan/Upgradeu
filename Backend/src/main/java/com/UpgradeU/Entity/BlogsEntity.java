package com.UpgradeU.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class BlogsEntity {
	
 public BlogsEntity() {
	 
 }
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String title;
	private String content;
	private String url;
	private String image_name;
	private String image_path;
	private String image_type;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
		
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
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
	public BlogsEntity(int id,  String title, String content, String url, String image_name,
			String image_path, String image_type) {
		super();
		this.id = id;
		
		this.title = title;
		this.content = content;
		this.url = url;
		this.image_name = image_name;
		this.image_path = image_path;
		this.image_type = image_type;
	}
	
	
}
