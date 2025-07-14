package com.trackfit.controller;

import com.trackfit.dto.WorkoutStats;
import com.trackfit.model.Workout;
import com.trackfit.service.WorkoutService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@Controller
public class DashboardController {
    
    @Autowired
    private WorkoutService workoutService;
    
    @GetMapping("/dashboard")
    public String dashboard(Model model, HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return "redirect:/login";
        }
        
        try {
            WorkoutStats stats = workoutService.getWorkoutStats(username);
            List<Workout> recentWorkouts = workoutService.getWorkoutsByUsername(username);
            Map<String, Integer> caloriesByType = workoutService.getCaloriesByType(username);
            
            model.addAttribute("stats", stats);
            model.addAttribute("recentWorkouts", recentWorkouts.subList(0, Math.min(5, recentWorkouts.size())));
            model.addAttribute("caloriesByType", caloriesByType);
            model.addAttribute("username", username);
            
            return "dashboard";
        } catch (Exception e) {
            model.addAttribute("error", "Error loading dashboard: " + e.getMessage());
            return "dashboard";
        }
    }
}
