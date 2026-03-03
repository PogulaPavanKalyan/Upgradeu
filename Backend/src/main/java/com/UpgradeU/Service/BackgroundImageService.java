package com.UpgradeU.Service;

import java.io.IOException;
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

import com.UpgradeU.Entity.BackgroundImagesEntity;
import com.UpgradeU.Entity.Course;

import com.UpgradeU.Repo.BackgroundImageRepo;

@Service
public class BackgroundImageService {

	String dir="backgroundimages12/";
	
	
	@Autowired
	private BackgroundImageRepo bir;
	
	public String addbackgroundimage(MultipartFile image)throws IOException
	{
		Path uploadpath=Paths.get(dir);
		
		if(!Files.exists(uploadpath))
		{
			Files.createDirectories(uploadpath);
		}
		String iname=image.getOriginalFilename();
		Path ipath=uploadpath.resolve(iname);
		
		Files.copy(image.getInputStream(),ipath,StandardCopyOption.REPLACE_EXISTING);
		
		BackgroundImagesEntity i=new BackgroundImagesEntity();
		i.setImage_name(iname);
		i.setImage_path(ipath.toString());
		i.setImage_type(image.getContentType());
		bir.save(i);
		
		return "success....";
		
	}

	public Resource getImage(Integer id)throws MalformedURLException
	{ 
		
		BackgroundImagesEntity i=bir.findById(id).orElseThrow();
		
		Path p=Paths.get(i.getImage_path());
		Resource r=new UrlResource(p.toUri());
		
		return r;
	}

	
	
	
	 @Transactional
	    public void deletebackgroundimages(Integer id) {
		 bir.deleteById(id);
	    }
	
}
