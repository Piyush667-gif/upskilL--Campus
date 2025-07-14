package com.trackfit.dto;

public class WorkoutStats {
    private int totalWorkouts;
    private int totalCalories;
    private int totalDuration;
    private int thisWeekCount;
    
    public WorkoutStats() {}
    
    public WorkoutStats(int totalWorkouts, int totalCalories, int totalDuration, int thisWeekCount) {
        this.totalWorkouts = totalWorkouts;
        this.totalCalories = totalCalories;
        this.totalDuration = totalDuration;
        this.thisWeekCount = thisWeekCount;
    }
    
    // Getters and Setters
    public int getTotalWorkouts() { return totalWorkouts; }
    public void setTotalWorkouts(int totalWorkouts) { this.totalWorkouts = totalWorkouts; }
    
    public int getTotalCalories() { return totalCalories; }
    public void setTotalCalories(int totalCalories) { this.totalCalories = totalCalories; }
    
    public int getTotalDuration() { return totalDuration; }
    public void setTotalDuration(int totalDuration) { this.totalDuration = totalDuration; }
    
    public int getThisWeekCount() { return thisWeekCount; }
    public void setThisWeekCount(int thisWeekCount) { this.thisWeekCount = thisWeekCount; }
}
