package com.UpgradeU.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Contact {
	
	public Contact (){
		
	}
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	
	private String email;
	private String phone_number;
	private String requirement;
	
	
	
	public Contact(Integer id ,String name, String email, String phone_number, String requirement) {
		super();
		this.id=id;
		this.name = name;
		this.email = email;
		this.phone_number = phone_number;
		this.requirement = requirement;
	}
	
	public Integer getid() {
		return id;
	}
	public void setid(Integer id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public String getRequirement() {
		return requirement;
	}
	public void setRequirement(String requirement) {
		this.requirement = requirement;
	}
	

}
