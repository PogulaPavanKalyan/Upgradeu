package com.UpgradeU.Service;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.ProfileImageEntity;
import com.UpgradeU.Entity.Users;
import com.UpgradeU.Repo.ProfileImageRepo;
import com.UpgradeU.Repo.UserRepo;



@Service
@Transactional
public class ProfileImageService {

	String dir="Profileimages12/";
	
	@Autowired
	private ProfileImageRepo pr;
	
	@Autowired
	private UserRepo ur;
	
	public String uploadedprofileImage(MultipartFile image,Integer id) throws Exception
	{
		Users u=ur.findById(id).orElseThrow();
		ProfileImageEntity c=pr.FindByuserid(id);
		
	    Path uploadPath = Paths.get(dir);
	    if (!Files.exists(uploadPath)) {
	        Files.createDirectories(uploadPath);
	    }

	    String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
	    
	    Path imagePath = uploadPath.resolve(fileName);

	    Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

	    
         ProfileImageEntity i=new ProfileImageEntity();
	 
	    i.setImage_name(fileName);
	    i.setImage_path(imagePath.toString());
	    i.setImage_type(image.getContentType());
	    System.out.println("USER ID = " + c.getId());
	    System.out.println("FILE PATH = " + imagePath);

	    pr.save(i);
	    return "success";
	}


	public Resource getImage(Long id) throws MalformedURLException {

	   
	    ProfileImageEntity i = pr.findById(id)
	            .orElseThrow(() -> new RuntimeException("Profile image not found"));

	    Path p = Paths.get(i.getImage_path());
	    return new UrlResource(p.toUri());
	}

	
	@Transactional
	public String updateProfileImage(String username, MultipartFile image) throws Exception {

	    Users u1 = ur.FindByUsername(username);
	    if (u1 == null) {
	        throw new RuntimeException("User not found");
	    }

	    ProfileImageEntity c1 = pr.FindByuserid(u1.getId());
	    if (c1 == null) {
	        throw new RuntimeException("ProfileImageEntity not found for user");
	    }

	    // ================= FILE STORAGE =================
	    Path uploadPath = Paths.get(dir);
	    if (!Files.exists(uploadPath)) {
	        Files.createDirectories(uploadPath);
	    }

	    String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
	    Path imagePath = uploadPath.resolve(fileName);

	    Files.copy(
	        image.getInputStream(),
	        imagePath,
	        StandardCopyOption.REPLACE_EXISTING
	    );

	    // ================= DB UPDATE =================
	    c1.setImage_name(fileName); 
	    c1.setImage_path(imagePath.toString());
	    c1.setImage_type(image.getContentType());

	    pr.save(c1); // UPDATE

	    return "success";
	}
	
}
