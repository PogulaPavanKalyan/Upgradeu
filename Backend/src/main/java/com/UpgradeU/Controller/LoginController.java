package com.UpgradeU.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.UpgradeU.Dto.LoginDTO;
import com.UpgradeU.Entity.Users;
import com.UpgradeU.Service.LoginService;
import com.UpgradeU.enums.Role;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/login")
public class LoginController {
	@Autowired
	private LoginService loginService;

	@GetMapping("/test")
	public String test() {
		return "success";
	}

	@PostMapping("/register")
	public String register(@RequestBody Users user) throws Exception {
		System.out.println("REGISTER API HIT -> " + user.getEmail());
		loginService.addData(user, Role.STUDENT);

		return "sucess";
	}

	@PostMapping("/registeradmin")
	public String registerAdmin(@RequestBody Users user) throws Exception {
		loginService.addData(user, Role.ADMIN);

		return "sucess";
	}

	@PostMapping("/login")
	Map<String, String> login(@RequestBody LoginDTO login) {
		return loginService.verify(login);
	}

}
