package com.UpgradeU.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.CrouselDataEntity;

import com.UpgradeU.Repo.CourseRepo;
import com.UpgradeU.Repo.CrouselRepo;


@Service
public class CrouselService {
	
	String dir="crouselimages12/";
	
	@Autowired
	private CrouselRepo crrepo;

	

	
	
	
	public Resource getImage(Integer id)throws MalformedURLException
	{
		CrouselDataEntity i=crrepo.findById(id).orElseThrow();
		
		Path p=Paths.get(i.getImage_path());
		Resource r=new UrlResource(p.toUri());
		
		return r;
	}

	public String postcrousel(MultipartFile image, String title, String description, String actionButton) throws Exception {
Path uploadpath=Paths.get(dir);
		
		if(!Files.exists(uploadpath))
		{
			Files.createDirectories(uploadpath);
		}
		String iname=image.getOriginalFilename();
		Path ipath=uploadpath.resolve(iname);
		
		Files.copy(image.getInputStream(),ipath,StandardCopyOption.REPLACE_EXISTING);
		
		CrouselDataEntity i=new CrouselDataEntity();
		i.setImage_name(iname);
		i.setImage_path(ipath.toString());
		i.setImage_type(image.getContentType());
		i.setTitle(title);
		i.setActionbutton(actionButton);
		i.setDescription(description);
		
		crrepo.save(i);
		
		return "success....";
		
	}

	
	 public List<CrouselDataEntity> getAllCrousel() {
	        return crrepo.findAll();
	    }

	 public CrouselDataEntity updateimages(CrouselDataEntity crouselDataEntity) {
		// TODO Auto-generated method stub
		return null;
	 }
	 
	 
	 @Transactional
	    public void deletecrousellist(Integer id) {
		 crrepo.deleteById(id);
	    }
		
	 }


