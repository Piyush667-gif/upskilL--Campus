package com.trackfit.controller;

import com.trackfit.model.User;
import com.trackfit.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/")
    public String home(HttpSession session) {
        if (session.getAttribute("username") != null) {
            return "redirect:/dashboard";
        }
        return "redirect:/login";
    }
    
    @GetMapping("/login")
    public String loginPage(Model model, HttpSession session) {
        if (session.getAttribute("username") != null) {
            return "redirect:/dashboard";
        }
        model.addAttribute("user", new User());
        return "login";
    }
    
    @PostMapping("/login")
    public String login(@RequestParam String username, 
                       @RequestParam String password,
                       HttpSession session,
                       RedirectAttributes redirectAttributes) {
        try {
            Optional<User> userOpt = userService.findByUsername(username);
            if (userOpt.isPresent() && userService.validatePassword(password, userOpt.get().getPasswordHash())) {
                session.setAttribute("username", username);
                session.setAttribute("userId", userOpt.get().getId());
                return "redirect:/dashboard";
            } else {
                redirectAttributes.addFlashAttribute("error", "Invalid username or password");
                return "redirect:/login";
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Login failed: " + e.getMessage());
            return "redirect:/login";
        }
    }
    
    @GetMapping("/register")
    public String registerPage(Model model, HttpSession session) {
        if (session.getAttribute("username") != null) {
            return "redirect:/dashboard";
        }
        model.addAttribute("user", new User());
        return "register";
    }
    
    @PostMapping("/register")
    public String register(@Valid @ModelAttribute User user,
                          BindingResult bindingResult,
                          @RequestParam String confirmPassword,
                          Model model,
                          RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            return "register";
        }
        
        if (!user.getPasswordHash().equals(confirmPassword)) {
            model.addAttribute("error", "Passwords do not match");
            return "register";
        }
        
        try {
            userService.registerUser(user.getUsername(), user.getEmail(), user.getPasswordHash());
            redirectAttributes.addFlashAttribute("success", "Registration successful! Please login.");
            return "redirect:/login";
        } catch (Exception e) {
            model.addAttribute("error", e.getMessage());
            return "register";
        }
    }
    
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
