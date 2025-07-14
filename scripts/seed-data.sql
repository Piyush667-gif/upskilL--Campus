-- Insert workout types
INSERT INTO workout_types (name, description, avg_calories_per_minute) VALUES
('Running', 'Cardiovascular exercise involving running at various paces', 10.0),
('Weight Training', 'Resistance training using weights and equipment', 6.0),
('Cycling', 'Cardiovascular exercise using a bicycle', 8.0),
('Swimming', 'Full-body cardiovascular exercise in water', 11.0),
('Yoga', 'Mind-body practice combining physical postures and breathing', 3.0),
('Pilates', 'Low-impact exercise focusing on core strength and flexibility', 4.0),
('CrossFit', 'High-intensity functional fitness training', 12.0),
('Basketball', 'Team sport involving running, jumping, and coordination', 8.5),
('Soccer', 'Team sport involving running and ball control', 9.0),
('Tennis', 'Racquet sport involving quick movements and coordination', 7.0),
('Walking', 'Low-impact cardiovascular exercise', 4.0),
('Hiking', 'Outdoor walking activity on trails or natural terrain', 6.0),
('Dancing', 'Rhythmic movement exercise', 5.0),
('Boxing', 'Combat sport training involving punching and footwork', 10.0);

-- Insert sample users (passwords should be hashed in real application)
INSERT INTO users (username, email, password_hash) VALUES
('demo_user', 'demo@trackfit.com', '$2a$10$example.hash.for.demo.purposes.only'),
('fitness_enthusiast', 'fitness@example.com', '$2a$10$example.hash.for.demo.purposes.only'),
('runner_jane', 'jane@example.com', '$2a$10$example.hash.for.demo.purposes.only');

-- Insert sample workouts for demo user (user_id = 1)
INSERT INTO workouts (user_id, type, duration, calories, date) VALUES
(1, 'Running', 30, 300, '2024-01-15'),
(1, 'Weight Training', 45, 250, '2024-01-14'),
(1, 'Cycling', 60, 400, '2024-01-13'),
(1, 'Swimming', 40, 350, '2024-01-12'),
(1, 'Yoga', 50, 150, '2024-01-11'),
(1, 'Running', 25, 250, '2024-01-10'),
(1, 'Weight Training', 50, 280, '2024-01-09'),
(1, 'CrossFit', 35, 420, '2024-01-08'),
(1, 'Cycling', 45, 300, '2024-01-07'),
(1, 'Swimming', 35, 300, '2024-01-06');

-- Insert sample workouts for other users
INSERT INTO workouts (user_id, type, duration, calories, date) VALUES
(2, 'Running', 40, 400, '2024-01-15'),
(2, 'Yoga', 60, 180, '2024-01-14'),
(2, 'Weight Training', 55, 300, '2024-01-13'),
(3, 'Running', 50, 500, '2024-01-15'),
(3, 'Running', 45, 450, '2024-01-13'),
(3, 'Running', 35, 350, '2024-01-11');
