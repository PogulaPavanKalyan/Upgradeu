package com.UpgradeU.Controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRange;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;

import com.UpgradeU.Dto.ExamResponse;
import com.UpgradeU.Dto.ExamResultResponse;
import com.UpgradeU.Dto.ExamSubmitRequest;
import com.UpgradeU.Dto.PaymentDto;
import com.UpgradeU.Dto.ProfileUpdatedDto;
import com.UpgradeU.Dto.RazorpayOrderResponse;
import com.UpgradeU.Dto.VideoResponse;
import java.util.Map;
import com.razorpay.RazorpayException;
import com.UpgradeU.Entity.AddtoCartEntity;
import com.UpgradeU.Entity.BackgroundImagesEntity;
import com.UpgradeU.Entity.BlogsEntity;
import com.UpgradeU.Entity.Contact;
import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.CourseImageEntity;
import com.UpgradeU.Entity.CrouselDataEntity;

import com.UpgradeU.Entity.PaymentEntity;
import com.UpgradeU.Entity.ProfileImageEntity;
import com.UpgradeU.Entity.Users;
import com.UpgradeU.Entity.VideoEntity;
import com.UpgradeU.Repo.AddtoCartRepo;
import com.UpgradeU.Repo.BackgroundImageRepo;
import com.UpgradeU.Repo.BlogsRepo;
import com.UpgradeU.Repo.CourseImageRepo;
import com.UpgradeU.Repo.CrouselRepo;

import com.UpgradeU.Repo.PaymentRepo;
import com.UpgradeU.Repo.ProfileImageRepo;
import com.UpgradeU.Repo.UserRepo;
import com.UpgradeU.Repo.VideoRepo;
import com.UpgradeU.Service.AddtocartService;
import com.UpgradeU.Service.BackgroundImageService;
import com.UpgradeU.Service.BlogsService;
import com.UpgradeU.Service.ContactService;
import com.UpgradeU.Service.CourseImageService;
import com.UpgradeU.Service.CrouselService;
import com.UpgradeU.Service.ExamService;
import com.UpgradeU.Service.LoginService;
import com.UpgradeU.Service.PaymentService;
import com.UpgradeU.Service.ProfileImageService;
import com.UpgradeU.Service.SearchFilterService;
import com.UpgradeU.Service.VideoService;
import com.UpgradeU.Service.courseService;


@CrossOrigin(origins = "*")
@RestController
public class MainController {

	@Autowired
	private courseService courseservice;

	@Autowired
	private ContactService contactService;

	@Autowired
	private VideoService vs;

	@Autowired
	private VideoRepo ve;

	@Autowired
	private CourseImageRepo re;

	@Autowired
	private CourseImageService ser;

	@Autowired
	private UserRepo ur;

	@Autowired
	private PaymentService ps;

	@Autowired
	private PaymentRepo pr;

	@Autowired
	private AddtocartService as;

	@Autowired
	private AddtoCartRepo acr;

	@Autowired
	private LoginService ls;

	@Autowired
	private SearchFilterService sfs;

	@Autowired
	private CrouselService cs;

	@Autowired
	private CrouselRepo cr;

	@Autowired
	private BlogsService bs;

	@Autowired
	private BlogsRepo br;

	@Autowired
	private ProfileImageService pis;

	@Autowired
	private ProfileImageRepo pir;

	@Autowired
	private BackgroundImageRepo bir;

	@Autowired
	private BackgroundImageService bis;
	
	@Autowired
	private ExamService es;

	@PutMapping("/editprofile")
	public ResponseEntity<Users> editProfile(@RequestBody ProfileUpdatedDto dto) {

		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		Users updatedUser = ls.updateProfile(dto, username);
		return ResponseEntity.ok(updatedUser);
	}

	@PostMapping("/profileimage/{id}")
	public ResponseEntity<String> postprofileimage(@RequestParam("image") MultipartFile image, @PathVariable Integer id)
			throws Exception {
		pis.uploadedprofileImage(image, id);
		return ResponseEntity.ok("profile image uploaded successfully...");
	}

	@PutMapping("/editprofileimage")
	public ResponseEntity<String> editprofileimage(@RequestParam("image") MultipartFile image) throws Exception {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		String a = pis.updateProfileImage(username, image);
		return ResponseEntity.status(HttpStatus.OK).body(a);
	}

	@GetMapping("/Course/{CourseID}")
	public Course getCoursesByCourse(@PathVariable Long CourseID) {
		return courseservice.getCourseByCourse(CourseID);
	}

	@GetMapping("/Course")
	public List<Course> getCoursesByCourse() {
		return courseservice.getCourseByCourseAll();
	}

	@GetMapping("/search/{course}")
	public ResponseEntity<List<Course>> search(@PathVariable String course) {
		var v = sfs.search(course);

		return ResponseEntity.status(HttpStatus.OK).body(v);
	}

	@PostMapping("/contactform")
	public String contactform(@RequestBody Contact contact) {

		contactService.Contactform(contact);
		return "Add--success..";
	}

	@PostMapping("/payment/{id}")
	public String payment(@PathVariable Long id) {

		return ps.buynewCourse(id);
	}

	@GetMapping("/mypaymentuser")
	public ResponseEntity<List<PaymentDto>> myCourses() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Users s = ur.FindByUsername(username);
		List<PaymentEntity> p = pr.findByUser(s);
		List<PaymentDto> pl = new ArrayList<PaymentDto>();
		for (var a : p) {
			PaymentDto pd = new PaymentDto();
			pd.setCourse(a.getCourse());
			pl.add(pd);
		}
		return ResponseEntity.status(HttpStatus.OK).body(pl);
	}

	@PostMapping("/create-order")
	public ResponseEntity<?> createOrder(@RequestBody Map<String, Integer> data) {
		try {
			int amount = data.get("amount");
			RazorpayOrderResponse order = ps.createOrder(amount);
			return ResponseEntity.ok(order);
		} catch (RazorpayException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PostMapping("/verify-payment")
	public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
		String orderId = data.get("razorpay_order_id");
		String paymentId = data.get("razorpay_payment_id");
		String signature = data.get("razorpay_signature");
		String courseId = data.get("courseId");

		boolean isValid = ps.verifyPayment(orderId, paymentId, signature);

		if (isValid) {
			if (courseId != null && !courseId.isEmpty()) {
				ps.buynewCourse(Long.parseLong(courseId));
			} else {
				ps.enrollUserInCartCourses();
			}
			return ResponseEntity.ok("Payment Verified and User Enrolled");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Payment Signature");
		}
	}

	@PostMapping("/addtocart/{id}")
	public String cart(@PathVariable Long id) {
		return as.addtocart(id);
	}

	@GetMapping("/getcart")
	public ResponseEntity<List<AddtoCartEntity>> getcart() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Users v = ur.FindByUsername(username);

		List<AddtoCartEntity> cart = acr.findByUser(v);
		return ResponseEntity.status(HttpStatus.OK).body(cart);
	}

	@DeleteMapping("/deletecart/{id}")
	public ResponseEntity<String> deletecartitem(@PathVariable Integer id) {
		as.deletecartitem(id);
		return ResponseEntity.ok("success");
	}

	@GetMapping("/getcrouselimagelist")
	public ResponseEntity<List<CrouselDataEntity>> getAll() {
		return ResponseEntity.ok(cs.getAllCrousel());
	}

	@GetMapping("/getcrouselimage/{id}")
	public ResponseEntity<Resource> getcrousel(@PathVariable Integer id) throws MalformedURLException {
		var a = cs.getImage(id);
		CrouselDataEntity v = cr.findById(id).orElseThrow();

		return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.CONTENT_TYPE, v.getImage_type()).body(a);
	}

	@GetMapping("/getbackgroundimageslist/{id}")
	public ResponseEntity<Resource> getbackgroundimages(@PathVariable Integer id) throws MalformedURLException {
		Resource a = bis.getImage(id);
		BackgroundImagesEntity b = bir.findById(id).orElseThrow();
		return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.CONTENT_TYPE, b.getImage_type()).body(a);
	}

	@GetMapping("/getbloglist")
	public ResponseEntity<List<BlogsEntity>> getAll1() {
		return ResponseEntity.ok(bs.getAllBlog());
	}

	@GetMapping("/getblogimage/{id}")
	public ResponseEntity<Resource> gett(@PathVariable int id) throws MalformedURLException {
		var a = bs.getimage(id);
		BlogsEntity i = br.findById(id).orElseThrow();
		var t = i.getImage_type();
		return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.CONTENT_TYPE, t).body(a);
	}

	@GetMapping("/getimage/{id}")
	public ResponseEntity<Resource> get(@PathVariable int id) throws MalformedURLException {
		var a = ser.getImage(id);
		CourseImageEntity i = re.findById(id).orElseThrow();

		var t = i.getImage_type();
		return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.CONTENT_TYPE, t).body(a);

	}

	@GetMapping("courseVideoList/{id}")
	public ResponseEntity<List<VideoResponse>> videolist(@PathVariable int id) {
		List<VideoResponse> res = vs.getCourseVideoList(id);
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}

	@GetMapping("getvideo/{id}")
	public ResponseEntity<ResourceRegion> get1(@PathVariable int id, @RequestHeader HttpHeaders headers) throws IOException {
		Resource video = vs.getvideo(id);
		VideoEntity v = ve.findById(id).orElseThrow();

		long contentLength = video.contentLength();
		HttpRange range = headers.getRange().isEmpty() ? null : headers.getRange().get(0);

		ResourceRegion region;
		if (range != null) {
			long start = range.getRangeStart(contentLength);
			long end = range.getRangeEnd(contentLength);
			long rangeLength = Math.min(1024 * 1024, end - start + 1); // 1MB chunks for fast load
			region = new ResourceRegion(video, start, rangeLength);
		} else {
			long rangeLength = Math.min(1024 * 1024, contentLength);
			region = new ResourceRegion(video, 0, rangeLength);
		}

		return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
				.contentType(MediaType.parseMediaType(v.getVideoType() != null ? v.getVideoType() : "video/mp4"))
				.body(region);
	}

	@GetMapping("/profile")
	public ResponseEntity<?> getUsersById() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Users u = ur.FindByUsername(username);

		Users user = ur.findById(u.getId()).orElse(null);
		if (user == null) {
			return ResponseEntity.status(401).body("user not found");
		}
		return ResponseEntity.ok(user);
	}

	@GetMapping("/getprofileimage/{id}")
	public ResponseEntity<Resource> getprofileimage(@PathVariable Long id) throws MalformedURLException {
		var a = pis.getImage(id);
		ProfileImageEntity v = pir.findById(id).orElseThrow();
		return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.CONTENT_TYPE, v.getImage_type()).body(a);

	}

	@GetMapping("request")
	public String test() {
		return "log in success...";
	}

	@GetMapping("/registerstudents")
	public ResponseEntity<List<Users>> getAllRegisteredStudents() {

		List<Users> students = ls.getAllRegisteredStudents();

		return ResponseEntity.ok(students);
	}

	@GetMapping("/registerstudents/{id}")
	public ResponseEntity<Users> getusers(@PathVariable Integer id) {
		Users a = ls.getusers(id);
		return ResponseEntity.ok(a);
	}
	
	// ✅ Get exam by video ID (for student view)
    @GetMapping("/video/{videoId}")
    public ResponseEntity<ExamResponse> getExamForStudent(
            @PathVariable("videoId") int videoId) {

        return ResponseEntity.ok(
                es.getExamForStudentByVideoId(videoId)
        );
    }

     //✅ Submit exam answers
    @PostMapping("/{examId}/submit")
    public ResponseEntity<ExamResultResponse> submitExam(
            @PathVariable("examId") Long examId,
            @RequestBody ExamSubmitRequest request) {

        return ResponseEntity.ok(
                es.submitExam(examId, request.getAnswers())
        ); 
   }
	
}
