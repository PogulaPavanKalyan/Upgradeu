package com.UpgradeU.Service;

import java.awt.Image;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.CourseImageEntity;

import com.UpgradeU.Repo.CourseImageRepo;
import com.UpgradeU.Repo.CourseRepo;


@Service
public class CourseImageService {
	
	
	String dir="images12/";
	
	@Autowired
	private CourseImageRepo imrepo;

	
	@Autowired
	private CourseRepo cr;
	
	public String postImage(MultipartFile image,Long id)throws IOException
	{
		Path uploadpath=Paths.get(dir);
		
		if(!Files.exists(uploadpath))
		{
			Files.createDirectories(uploadpath);
		}
		String iname=image.getOriginalFilename();
		Path ipath=uploadpath.resolve(iname);
		
		Files.copy(image.getInputStream(),ipath,StandardCopyOption.REPLACE_EXISTING);
		Course c=cr.findById(id).orElseThrow();
		CourseImageEntity i=new CourseImageEntity();
		i.setCourse(c);
		
		
		i.setImage_name(iname);
		i.setImage_path(ipath.toString());
		i.setImage_type(image.getContentType());
		imrepo.save(i);
		
		return "success....";
		
	}
	
	
	
	public Resource getImage(int id)throws MalformedURLException
	{
		CourseImageEntity i=imrepo.findById(id).orElseThrow();
		
		Path p=Paths.get(i.getImage_path());
		Resource r=new UrlResource(p.toUri());
		
		return r;
	}



	
}
