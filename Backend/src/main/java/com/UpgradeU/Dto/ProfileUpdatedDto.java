package com.UpgradeU.Dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ProfileUpdatedDto {

	

    @JsonFormat(pattern = "yyyy-MM-dd")
	 private LocalDate dateofbirth;
	    private String qualification;
	    private String branch;
	    private String yearofpassedout;
	    private String collegename;
	    private String currentworkingstatus;
	    
		public ProfileUpdatedDto(LocalDate dateofbirth, String qualification, String branch, String yearofpassedout,
				String collegename, String currentworkingstatus) {
			super();
			this.dateofbirth = dateofbirth;
			this.qualification = qualification;
			this.branch = branch;
			this.yearofpassedout = yearofpassedout;
			this.collegename = collegename;
			this.currentworkingstatus = currentworkingstatus;
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
	
}
