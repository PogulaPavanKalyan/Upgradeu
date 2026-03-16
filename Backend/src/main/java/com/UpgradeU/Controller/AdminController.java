package com.UpgradeU.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.UpgradeU.Dto.ExamCreateRequest;
import com.UpgradeU.Entity.BlogsEntity;
import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.CrouselDataEntity;
import com.UpgradeU.Entity.Exam;
import com.UpgradeU.Entity.PaymentEntity;
import com.UpgradeU.Entity.Sections;
import com.UpgradeU.Entity.VideoEntity;
import com.UpgradeU.Repo.CourseImageRepo;
import com.UpgradeU.Repo.CourseRepo;

import com.UpgradeU.Repo.PaymentRepo;
import com.UpgradeU.Repo.UserRepo;
import com.UpgradeU.Repo.VideoRepo;
import com.UpgradeU.Service.BackgroundImageService;
import com.UpgradeU.Service.BlogsService;
import com.UpgradeU.Service.CourseImageService;
import com.UpgradeU.Service.CrouselService;
import com.UpgradeU.Service.ExamService;
import com.UpgradeU.Service.SectionsService;
import com.UpgradeU.Service.VideoService;
import com.UpgradeU.Service.courseService;


@CrossOrigin(origins = "*")

@RestController
@RequestMapping("admin/")
public class AdminController {

	private static final String BlogsEntity = null;

	@Autowired
	private courseService courseservice;

	@Autowired
	private VideoRepo ve;

	@Autowired
	private VideoService vs;

	@Autowired
	private CourseImageRepo re;

	@Autowired
	private CourseImageService ser;

	@Autowired
	private CrouselService cs;

	@Autowired
	private BlogsService bs;

	@Autowired
	private BackgroundImageService bis;

	@Autowired
	private UserRepo ur;

	@Autowired
	private PaymentRepo pr;

	@Autowired
	private CourseRepo cr;

	@Autowired
	private SectionsService ss;
	
	@Autowired
	private ExamService es;

	@PostMapping("/addcourse")
	public String add(@RequestBody Course course) {
		courseservice.addCourse(course);
		return "sucess";
	}

	@PutMapping("/editcourse/{id}")
	public ResponseEntity<Course> EditCourse(@PathVariable Long id, @RequestBody Course course) {

		course.setId(id);
		Course updatedCourse = courseservice.editcourse(course);
		return ResponseEntity.ok(updatedCourse);
	}

	@DeleteMapping("/deletecourse/{id}")
	@Transactional
	public ResponseEntity<Void> deleteCourse(@PathVariable("id") Long id)

	{

		Optional<Course> course = cr.findById(id);
		List<VideoEntity> videoentity = ve.findByCourseId(id);
		for (var c : videoentity) {
			ve.deleteById(c.getId());
		}

		if (course.isPresent()) {

			cr.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);

		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);

		}

	}

	@PostMapping("/postcourseimage/{id}")
	public ResponseEntity<String> addimage(@RequestParam("image") MultipartFile image, @PathVariable Long id)
			throws IOException {
		ser.postImage(image, id);
		return ResponseEntity.ok("image uploaded successfully...");
	}

	@PostMapping("/postvideo/{id}")
	public ResponseEntity<String> addpost(
			@RequestParam("video") MultipartFile video,
			@PathVariable Long id)
			throws IOException {
		vs.addvideo(video, id);
		return ResponseEntity.ok("video uploaded successfully...");
	}

	@PostMapping("/postcrousel")
	public ResponseEntity<String> postCrouselimage(@RequestParam("image") MultipartFile image,
			@RequestParam("title") String Title, @RequestParam("description") String Description,
			@RequestParam("ActionButton") String ActionButton) throws Exception {
		cs.postcrousel(image, Title, Description, ActionButton);
		return ResponseEntity.ok("image uploaded successfully...!");
	}

	@PutMapping("/putcrouselimageslist{id}")
	public ResponseEntity<CrouselDataEntity> putcrouselimages(@RequestBody CrouselDataEntity crouselDataEntity) {
		var a = cs.updateimages(crouselDataEntity);
		return ResponseEntity.status(HttpStatus.OK).body(a);
	}

	@DeleteMapping("/deletecrousellist/{id}")
	public ResponseEntity<String> deletecrousellist(@PathVariable Integer id) {
		cs.deletecrousellist(id);
		return ResponseEntity.ok("sucess...");
	}

	@PostMapping("/sections")
	public ResponseEntity<String> postsection(@RequestBody Sections section) {

		ss.addSections(section);
		return ResponseEntity.ok("section uploaded successfully.");

	}

	@PostMapping("/addblog")
	public ResponseEntity<String> addblog(@RequestParam("image") MultipartFile image,
			@RequestParam("title") String Title, @RequestParam("content") String Content,
			@RequestParam("url") String url) throws Exception {
		bs.addblog(image, Title, Content, url);
		return ResponseEntity.ok("Blog Uploaded Successfully..!");
	}

	@PutMapping("/putblog")
	public ResponseEntity<BlogsEntity> putblog(@RequestParam BlogsEntity blogsentity) throws Exception {
		var a = bs.updateblog(BlogsEntity);
		return ResponseEntity.status(HttpStatus.OK).body(a);
	}

	@DeleteMapping("/deleteblog/{id}")
	public ResponseEntity<String> deleteblog(@PathVariable Integer id) {
		bs.deleteblog(id);
		return ResponseEntity.ok("delete success...!");
	}

	@PostMapping("/backgroundimages")
	public ResponseEntity<String> addbackgroundimage(@RequestParam("image") MultipartFile image) throws Exception {
		bis.addbackgroundimage(image);
		return ResponseEntity.ok("image Uploaded successfully..!");
	}

	@DeleteMapping("/deletebackgroundimages/{id}")
	public ResponseEntity<String> deletebackgroundimages(@PathVariable Integer id) {
		bis.deletebackgroundimages(id);
		return ResponseEntity.ok("sucess...");
	}

	@GetMapping("/mypayment")
	public ResponseEntity<List<PaymentEntity>> myCourses() {
		//

		List<PaymentEntity> mylearning = pr.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(mylearning);
	}
	

	@PostMapping("/course/{courseId}/video/{videoId}")
	public ResponseEntity<Exam> createExam(
	        @PathVariable("courseId") Long courseId,
	        @PathVariable("videoId") int videoId,
	        @RequestBody ExamCreateRequest request) {

	    return ResponseEntity.ok(
	            es.createExam(courseId, videoId, request));
	}
	
	@DeleteMapping("/exam/{examId}")
	public ResponseEntity<String> deleteExam(
			@PathVariable("examId") Long examId) {

		es.deleteExam(examId);

		return ResponseEntity.ok("Exam deleted successfully");
	}
	

}
