package com.UpgradeU.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UpgradeU.Entity.Sections;
import com.UpgradeU.Repo.SectionRepo;

@Service

public class SectionsService {
	
	@Autowired
	private SectionRepo sr;

	public Sections addSections(Sections section) {
		
		
		
		
		
		return sr.save(section);
	}

}
