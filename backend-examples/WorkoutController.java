package com.trackfit.controller;

import com.trackfit.model.Workout;
import com.trackfit.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutController {
    
    @Autowired
    private WorkoutService workoutService;
    
    @GetMapping
    public ResponseEntity<List<Workout>> getUserWorkouts(Authentication authentication) {
        String username = authentication.getName();
        List<Workout> workouts = workoutService.getWorkoutsByUsername(username);
        return ResponseEntity.ok(workouts);
    }
    
    @PostMapping
    public ResponseEntity<Workout> createWorkout(@Valid @RequestBody Workout workout, 
                                               Authentication authentication) {
        String username = authentication.getName();
        Workout createdWorkout = workoutService.createWorkout(workout, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkout);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable Long id, 
                                               @Valid @RequestBody Workout workout,
                                               Authentication authentication) {
        String username = authentication.getName();
        Workout updatedWorkout = workoutService.updateWorkout(id, workout, username);
        return ResponseEntity.ok(updatedWorkout);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id, 
                                            Authentication authentication) {
        String username = authentication.getName();
        workoutService.deleteWorkout(id, username);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/stats")
    public ResponseEntity<WorkoutStats> getWorkoutStats(Authentication authentication) {
        String username = authentication.getName();
        WorkoutStats stats = workoutService.getWorkoutStats(username);
        return ResponseEntity.ok(stats);
    }
}
