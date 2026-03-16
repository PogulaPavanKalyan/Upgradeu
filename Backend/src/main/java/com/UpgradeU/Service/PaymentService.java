package com.UpgradeU.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.UpgradeU.Dto.PaymentDto;
import com.UpgradeU.Dto.RazorpayOrderResponse;
import com.UpgradeU.Entity.AddtoCartEntity;
import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.PaymentEntity;
import com.UpgradeU.Entity.Users;
import com.UpgradeU.Repo.AddtoCartRepo;
import com.UpgradeU.Repo.CourseRepo;
import com.UpgradeU.Repo.PaymentRepo;
import com.UpgradeU.Repo.UserRepo;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

@Service
public class PaymentService {
	
	@Autowired
	private CourseRepo cr;
	@Autowired
	private UserRepo ur;
	@Autowired
	private PaymentRepo pr;
	@Autowired
	private AddtoCartRepo acr;

	@Value("${razorpay.key.id}")
	private String razorpayKeyId;

	@Value("${razorpay.key.secret}")
	private String razorpayKeySecret;

	public RazorpayOrderResponse createOrder(int amount) throws RazorpayException {
		RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", amount * 100); // Amount in paise
		orderRequest.put("currency", "INR");
		orderRequest.put("receipt", "txn_" + System.currentTimeMillis());

		Order order = client.orders.create(orderRequest);

		return new RazorpayOrderResponse(
				order.get("id"),
				order.get("currency"),
				order.get("amount"),
				razorpayKeyId
		);
	}

	public boolean verifyPayment(String orderId, String paymentId, String signature) {
		try {
			JSONObject options = new JSONObject();
			options.put("razorpay_order_id", orderId);
			options.put("razorpay_payment_id", paymentId);
			options.put("razorpay_signature", signature);

			return Utils.verifyPaymentSignature(options, razorpayKeySecret);
		} catch (Exception e) {
			return false;
		}
	}

	public void enrollUserInCartCourses() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Users u = ur.FindByUsername(username);
		List<AddtoCartEntity> cartItems = acr.findByUser(u);

		for (AddtoCartEntity item : cartItems) {
			PaymentEntity p = new PaymentEntity();
			p.setCourse(item.getCourse());
			p.setUser(u);
			p.setDate(LocalDate.now());
			p.setTime(LocalTime.now());
			pr.save(p);
		}

		// Clear cart after enrollment
		acr.deleteAll(cartItems);
	}

	public String buynewCourse(Long id) {
	
		Course c=cr.findById(id).orElseThrow();
		
		String username=SecurityContextHolder.getContext().getAuthentication().getName();
		Users u=ur.FindByUsername(username);
	
		
		PaymentEntity p=new PaymentEntity();
		p.setCourse(c);
		p.setUser(u);
		p.setDate(LocalDate.now());
		p.setTime(LocalTime.now());
		pr.save(p);
		
		return "sucess";
	}

	public PaymentDto mycourses(PaymentDto dto) {

		String username=SecurityContextHolder.getContext().getAuthentication().getName();
		Users v=ur.FindByUsername(username);
		
		PaymentDto p=new PaymentDto();
		return p;
	}

}