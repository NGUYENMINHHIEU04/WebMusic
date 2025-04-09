package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Admin;
import com.btec.webmusic_api.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Admin createAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(String id) {
        return adminRepository.findById(id);
    }

    public Admin updateAdmin(String id, Admin updatedAdmin) {
        Optional<Admin> adminOptional = adminRepository.findById(id);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            admin.setEmail(updatedAdmin.getEmail());
            admin.setPassword(passwordEncoder.encode(updatedAdmin.getPassword()));
            return adminRepository.save(admin);
        }
        return null;
    }

    public void deleteAdmin(String id) {
        adminRepository.deleteById(id);
    }
}