package com.UpgradeU.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.UpgradeU.Entity.Contact;
import com.UpgradeU.Entity.Course;
import com.UpgradeU.Repo.ContactRepo;

@Service
public class ContactService {
	
	@Autowired
	public  ContactRepo repo;

	
	public Contact Contactform(Contact contact) {
		return repo.save(contact);
		
	}	
}
