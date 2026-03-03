package com.UpgradeU.Entity;

import java.time.LocalDate;

import com.UpgradeU.enums.Role;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Users {
	
	public Users() {	
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	@Column(unique = true,nullable = false)
	private String email;
	@Enumerated(EnumType.STRING)
	private Role role;
	@Column(unique = true,nullable = false)
	 private Long phonenumber;
	@Column(unique = true,nullable = false)
    private String username;
	private String password;
	private LocalDate dateofbirth;
	private String qualification;
	private String branch;
	private String yearofpassedout;
	private String collegename;
	private String currentworkingstatus;
	@JsonManagedReference
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private ProfileImageEntity profileImageentity;
	
	
	public Users(Integer id, String name, String email, Role role, Long phonenumber, String username, String password,
			LocalDate dateofbirth, String qualification, String branch, String yearofpassedout, String collegename,
			String currentworkingstatus, ProfileImageEntity profileImageentity) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.role = role;
		this.phonenumber = phonenumber;
		this.username = username;
		this.password = password;
		this.dateofbirth = dateofbirth;
		this.qualification = qualification;
		this.branch = branch;
		this.yearofpassedout = yearofpassedout;
		this.collegename = collegename;
		this.currentworkingstatus = currentworkingstatus;
		this.profileImageentity = profileImageentity;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
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
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public Long getPhonenumber() {
		return phonenumber;
	}
	public void setPhonenumber(Long phonenumber) {
		this.phonenumber = phonenumber;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public LocalDate getDateofbirth() {
		return dateofbirth;
	}
	public void setDateofbirth(LocalDate dateofbirth) {
		this.dateofbirth = dateofbirth;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getYearofpassedout() {
		return yearofpassedout;
	}
	public void setYearofpassedout(String yearofpassedout) {
		this.yearofpassedout = yearofpassedout;
	}
	public String getCollegename() {
		return collegename;
	}
	public void setCollegename(String collegename) {
		this.collegename = collegename;
	}
	public String getCurrentworkingstatus() {
		return currentworkingstatus;
	}
	public void setCurrentworkingstatus(String currentworkingstatus) {
		this.currentworkingstatus = currentworkingstatus;
	}
	public ProfileImageEntity getProfileImageentity() {
		return profileImageentity;
	}
	public void setProfileImageentity(ProfileImageEntity profileImageentity) {
		this.profileImageentity = profileImageentity;
	}
	
	
	
	
	
	
	
	
}
