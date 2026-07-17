package com.konvo.backend.service;

import com.konvo.backend.entity.User;
import com.konvo.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User registerUser(User user) {

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        user.setWalletBalance(100);

        return userRepository.save(user);
    }

    // Login User
    public User loginUser(String email, String password) {

        System.out.println("Email received: " + email);

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {

            User user = userOptional.get();

            System.out.println("DB Password: " + user.getPassword());
            System.out.println("Entered Password: " + password);

            if (user.getPassword().equals(password)) {
                return user;
            }

        }

        return null;
    }

    // Get User By Id
    public User getUserById(Long id) {

        return userRepository.findById(id).orElse(null);

    }

}