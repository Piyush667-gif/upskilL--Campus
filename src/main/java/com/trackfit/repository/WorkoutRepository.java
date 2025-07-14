package com.trackfit.repository;

import com.trackfit.model.User;
import com.trackfit.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUserOrderByDateDesc(User user);
    List<Workout> findByUser(User user);
    List<Workout> findByUserAndDateAfter(User user, LocalDate date);
    
    @Query("SELECT w FROM Workout w WHERE w.user = :user AND w.date BETWEEN :startDate AND :endDate ORDER BY w.date DESC")
    List<Workout> findByUserAndDateBetween(@Param("user") User user, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT w.type, SUM(w.calories) FROM Workout w WHERE w.user = :user GROUP BY w.type")
    List<Object[]> findCaloriesByTypeForUser(@Param("user") User user);
}
