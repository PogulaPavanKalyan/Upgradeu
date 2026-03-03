package com.UpgradeU.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.UpgradeU.Dto.LoginDTO;
import com.UpgradeU.Dto.ProfileUpdatedDto;
import com.UpgradeU.Entity.Course;
import com.UpgradeU.Entity.Users;
import com.UpgradeU.Repo.UserRepo;
import com.UpgradeU.enums.Role;

@Service
public class LoginService {
	@Autowired
	private UserRepo repo;
	@Autowired
	private jwtservice jwtservices;

	@Autowired
	private AuthenticationManager authManager;

	public void addData(Users user, Role role) {
		user.setRole(role);
		repo.save(user);

	}

	public Map<String, String> verify(LoginDTO login) {
		Authentication auth = authManager
				.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));

		Users u = repo.FindByUsername(login.getUsername());
		if (auth != null) {
			// return jwtservice.generateToken(login.getUsername());
			String token = jwtservices.generateToken(login.getUsername());
			Map<String, String> result = new HashMap<>();
			result.put("token", token);
			result.put("role", u.getRole().toString());
			return result;
		}

		return null;
	}

	public Users Updateprofile(Users user) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Users v = repo.FindByUsername(username);

		v.setName(user.getName());
		v.setEmail(user.getEmail());
		v.setPhonenumber(user.getPhonenumber());
		v.setUsername(user.getUsername());

		return repo.save(v);
	}

	@Transactional
	public Users updateProfile(ProfileUpdatedDto dto, String username) {

		Users user = repo.FindByUsername(username);

		if (user == null) {
			throw new RuntimeException("User not found with username: " + username);
		}

		user.setDateofbirth(dto.getDateofbirth());
		user.setQualification(dto.getQualification());
		user.setBranch(dto.getBranch());
		user.setYearofpassedout(dto.getYearofpassedout());
		user.setCollegename(dto.getCollegename());
		user.setCurrentworkingstatus(dto.getCurrentworkingstatus());

		return repo.save(user);
	}

	public List<Users> getAllRegisteredStudents() {
		return repo.findByRole(Role.STUDENT);
	}

	public Users getusers(Integer id) {

		return repo.findById(id).orElseThrow();
	}

}
