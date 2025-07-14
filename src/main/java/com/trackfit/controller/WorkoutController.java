package com.trackfit.controller;

import com.trackfit.model.Workout;
import com.trackfit.service.WorkoutService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/workouts")
public class WorkoutController {
    
    @Autowired
    private WorkoutService workoutService;
    
    @GetMapping
    public String listWorkouts(Model model, HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return "redirect:/login";
        }
        
        try {
            List<Workout> workouts = workoutService.getWorkoutsByUsername(username);
            model.addAttribute("workouts", workouts);
            model.addAttribute("username", username);
            return "workouts/list";
        } catch (Exception e) {
            model.addAttribute("error", "Error loading workouts: " + e.getMessage());
            return "workouts/list";
        }
    }
    
    @GetMapping("/add")
    public String addWorkoutForm(Model model, HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return "redirect:/login";
        }
        
        model.addAttribute("workout", new Workout());
        model.addAttribute("username", username);
        return "workouts/form";
    }
    
    @PostMapping("/add")
    public String addWorkout(@Valid @ModelAttribute Workout workout,
                            BindingResult bindingResult,
                            HttpSession session,
                            Model model,
                            RedirectAttributes redirectAttributes) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return "redirect:/login";
        }
        
        if (bindingResult.hasErrors()) {
            model.addAttribute("username", username);
            return "workouts/form";
        }
        
        try {
            workoutService.createWorkout(workout, username);
            redirectAttributes.addFlashAttribute("success", "Workout added successfully!");
            return "redirect:/workouts";
        } catch (Exception e) {
            model.addAttribute("error", "Error adding workout: " + e.getMessage());
            model.addAttribute("username", username);
            return "workouts/form";
        }
    }
    
    @GetMapping("/edit/{id}")
    public String editWorkoutForm(@PathVariable Long id, Model model, HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return "redirect:/login";
        }
        
        try {
            Workout workout = workoutService.findById(id);
            if (!workout.getUser().getUsername().equals(username)) {
                return "redirect:/workouts";
            }
            model.addAttribute("workout", workout);
            model.addAttribute("username", username);
            return "workouts/form";
        } catch (Exception e) {
            return "redirect:/workouts";
        }
    }
    
    @PostMapping("/edit/{id}")
    public String editWorkout(@PathVariable Long id,
                             @Valid @ModelAttribute Workout workout,
                             BindingResult bindingResult,
                             HttpSession session,
                             Model model,
                             RedirectAttributes redirectAttributes) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return "redirect:/login";
        }
        
        if (bindingResult.hasErrors()) {
            model.addAttribute("username", username);
            return "workouts/form";
        }
        
        try {
            workoutService.updateWorkout(id, workout, username);
            redirectAttributes.addFlashAttribute("success", "Workout updated successfully!");
            return "redirect:/workouts";
        } catch (Exception e) {
            model.addAttribute("error", "Error updating workout: " + e.getMessage());
            model.addAttribute("username", username);
            return "workouts/form";
        }
    }
    
    @PostMapping("/delete/{id}")
    public String deleteWorkout(@PathVariable Long id,
                               HttpSession session,
                               RedirectAttributes redirectAttributes) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return "redirect:/login";
        }
        
        try {
            workoutService.deleteWorkout(id, username);
            redirectAttributes.addFlashAttribute("success", "Workout deleted successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error deleting workout: " + e.getMessage());
        }
        
        return "redirect:/workouts";
    }
}
