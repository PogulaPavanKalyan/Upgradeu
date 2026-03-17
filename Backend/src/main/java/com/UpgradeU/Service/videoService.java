package com.UpgradeU.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.UpgradeU.Dto.VideoResponse;
import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.VideoEntity;
import com.UpgradeU.Repo.CourseRepo;
import com.UpgradeU.Repo.VideoRepo;

@Service
public class VideoService {
	@Autowired
	private CourseRepo courseRepo;
	
	String dir="video/";
	
	@Autowired
	private VideoRepo videorepo;
	
	public String addvideo(MultipartFile videos, Long id)throws IOException
	{
		Course c=courseRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Course not found"));
     Path uploadpath=Paths.get(dir+id);
		
		if(!Files.exists(uploadpath))
		{
			Files.createDirectories(uploadpath);
		}
		
		int order=1;
	
		String iname = System.currentTimeMillis() + "_" + videos.getOriginalFilename();
		Path ipath=uploadpath.resolve(iname);
		
		Files.copy(videos.getInputStream(),ipath,StandardCopyOption.REPLACE_EXISTING);
		
		VideoEntity i=new VideoEntity();		
		i.setVideoPath(ipath.toString());
		i.setVideoType(videos.getContentType());
		
		i.setSerialNumber(order++);
		i.setCourse(c);
		videorepo.save(i);
		
		return "success....";
	}
	
	public Resource getvideo(int id)throws MalformedURLException
	{
		VideoEntity i=videorepo.findById(id).orElseThrow();
		Path p=Paths.get(i.getVideoPath());
		Resource r=new UrlResource(p.toUri());
		return r;
	} 

	public List<VideoResponse> getvideoList(Long id) {
		var c=courseRepo.findById(id).orElseThrow();
		List<VideoEntity> v=videorepo.findByCourse(c);
		List<VideoResponse> res=new ArrayList<VideoResponse>();
		for(VideoEntity i :v )
		{
			VideoResponse r=new VideoResponse();
			r.setCourseName(i.getCourse().getCourse_Name());
			r.setVideoId(i.getId());
			r.setVideoType(i.getVideoType());
			r.setVidePath(i.getVideoPath());
			res.add(r);
		}
		
		return res;
	}

	public List<VideoResponse> getCourseVideoList(int id) {
		List<VideoEntity> res=videorepo.getList(id);
		List<VideoResponse> respo=new ArrayList<VideoResponse>();
		
		for(VideoEntity i :res )
		{
			VideoResponse r=new VideoResponse();
			r.setCourseName(i.getCourse().getCourse_Name());
			r.setVideoId(i.getId());
			r.setVideoType(i.getVideoType());
			r.setVidePath(i.getVideoPath());
			respo.add(r);
		}
		
		return respo;
	}

	public void deleteVideo(int id) throws IOException {
		VideoEntity v = videorepo.findById(id).orElseThrow(() -> new RuntimeException("Video not found with id: " + id));
		Path p = Paths.get(v.getVideoPath());
		if (Files.exists(p)) {
			Files.delete(p);
		}
		videorepo.deleteById(id);
	}

	public String updateVideo(int id, MultipartFile video) throws IOException {
		VideoEntity i = videorepo.findById(id).orElseThrow(() -> new RuntimeException("Video not found with id: " + id));
		
		// Delete old file
		Path oldP = Paths.get(i.getVideoPath());
		if (Files.exists(oldP)) {
			Files.delete(oldP);
		}

		// Save new file
		Path uploadpath = Paths.get(dir + i.getCourse().getId());
		if (!Files.exists(uploadpath)) {
			Files.createDirectories(uploadpath);
		}

		String iname = System.currentTimeMillis() + "_" + video.getOriginalFilename();
		Path ipath = uploadpath.resolve(iname);
		Files.copy(video.getInputStream(), ipath, StandardCopyOption.REPLACE_EXISTING);

		// Update entity
		i.setVideoPath(ipath.toString());
		i.setVideoType(video.getContentType());
		videorepo.save(i);

		return "Update success";
	}
}
