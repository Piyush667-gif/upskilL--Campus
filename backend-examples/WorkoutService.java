package com.trackfit.service;

import com.trackfit.model.User;
import com.trackfit.model.Workout;
import com.trackfit.repository.UserRepository;
import com.trackfit.repository.WorkoutRepository;
import com.trackfit.dto.WorkoutStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class WorkoutService {
    
    @Autowired
    private WorkoutRepository workoutRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Workout> getWorkoutsByUsername(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return workoutRepository.findByUserOrderByDateDesc(user);
    }
    
    public Workout createWorkout(Workout workout, String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        workout.setUser(user);
        return workoutRepository.save(workout);
    }
    
    public Workout updateWorkout(Long id, Workout workoutData, String username) {
        Workout existingWorkout = workoutRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Workout not found"));
        
        // Verify ownership
        if (!existingWorkout.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized to update this workout");
        }
        
        existingWorkout.setType(workoutData.getType());
        existingWorkout.setDuration(workoutData.getDuration());
        existingWorkout.setCalories(workoutData.getCalories());
        existingWorkout.setDate(workoutData.getDate());
        
        return workoutRepository.save(existingWorkout);
    }
    
    public void deleteWorkout(Long id, String username) {
        Workout workout = workoutRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Workout not found"));
        
        // Verify ownership
        if (!workout.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized to delete this workout");
        }
        
        workoutRepository.delete(workout);
    }
    
    public WorkoutStats getWorkoutStats(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Workout> allWorkouts = workoutRepository.findByUser(user);
        LocalDate weekAgo = LocalDate.now().minusDays(7);
        List<Workout> thisWeekWorkouts = workoutRepository.findByUserAndDateAfter(user, weekAgo);
        
        int totalWorkouts = allWorkouts.size();
        int totalCalories = allWorkouts.stream().mapToInt(Workout::getCalories).sum();
        int totalDuration = allWorkouts.stream().mapToInt(Workout::getDuration).sum();
        int thisWeekCount = thisWeekWorkouts.size();
        
        return new WorkoutStats(totalWorkouts, totalCalories, totalDuration, thisWeekCount);
    }
}
