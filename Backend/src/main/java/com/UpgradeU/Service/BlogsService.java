package com.UpgradeU.Service;

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

import com.UpgradeU.Entity.BlogsEntity;
import com.UpgradeU.Entity.CrouselDataEntity;
import com.UpgradeU.Repo.BlogsRepo;



@Service
public class BlogsService {

	@Autowired
	private BlogsRepo br;
	
	String dir="blogsimages56/";
	
	
	public Resource getimage(int id)throws MalformedURLException
	{
		BlogsEntity i=br.findById(id).orElseThrow();
		
		Path p=Paths.get(i.getImage_path());
		Resource  r=new  UrlResource(p.toUri());
		
		return r;
	}
	
	public String addblog(MultipartFile image, String title, String content,String url) throws Exception {
		Path uploadpath=Paths.get(dir);
				
				if(!Files.exists(uploadpath))
				{
					Files.createDirectories(uploadpath);
				}
				String iname=image.getOriginalFilename();
				Path ipath=uploadpath.resolve(iname);
				
				Files.copy(image.getInputStream(),ipath,StandardCopyOption.REPLACE_EXISTING);
				
				BlogsEntity i=new  BlogsEntity();
				i.setImage_name(iname);
				i.setImage_path(ipath.toString());
				i.setImage_type(image.getContentType());
				i.setTitle(title);
				i.setContent(content);
				i.setUrl(url);
				
				br.save(i);
				
				return "success....";
				
			
}

	
	 public List<BlogsEntity> getAllBlog() {
	        return br.findAll();
	    }

	 public BlogsEntity updateblog(String blogsentity) {
		// TODO Auto-generated method stub
		return null;
	 }

	 @Transactional
	 public void deleteblog(Integer id) {
		br.deleteById(id);
		
	 }
      
	 
	
	
}
