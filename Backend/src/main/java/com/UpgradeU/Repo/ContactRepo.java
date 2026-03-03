package com.UpgradeU.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.UpgradeU.Entity.Contact;

public interface ContactRepo extends JpaRepository<Contact, Integer>{

}
