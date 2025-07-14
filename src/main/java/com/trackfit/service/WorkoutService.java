package com.trackfit.service;

import com.trackfit.dto.WorkoutStats;
import com.trackfit.model.User;
import com.trackfit.model.Workout;
import com.trackfit.repository.UserRepository;
import com.trackfit.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    
    public Map<String, Integer> getCaloriesByType(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Object[]> results = workoutRepository.findCaloriesByTypeForUser(user);
        return results.stream()
            .collect(Collectors.toMap(
                result -> (String) result[0],
                result -> ((Long) result[1]).intValue()
            ));
    }
    
    public Workout findById(Long id) {
        return workoutRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Workout not found"));
    }
}
