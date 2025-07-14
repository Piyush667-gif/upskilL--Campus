# TrackFit - Full Stack Fitness Tracking Application

A comprehensive fitness tracking web application built with **Java Spring Boot** and **Thymeleaf** that allows users to log, track, and analyze their workout activities.

## 🚀 Features

### User Management
- **User Registration & Login**: Secure authentication system with password hashing
- **Session Management**: Secure user sessions with proper logout functionality

### Workout Tracking
- **Add Workouts**: Log various types of exercises with duration, calories, and date
- **Edit/Delete Workouts**: Full CRUD operations for workout management
- **Workout Types**: Support for 14+ different workout categories including:
  - Running, Weight Training, Cycling, Swimming
  - Yoga, Pilates, CrossFit, Basketball
  - Soccer, Tennis, Walking, Hiking, Dancing, Boxing

### Analytics & Visualization
- **Dashboard Statistics**: Total workouts, calories burned, time spent, weekly progress
- **Interactive Charts**: Calories burned by workout type using Chart.js
- **Recent Activity**: Quick view of latest workouts

### Responsive Design
- **Mobile-First**: Fully responsive design that works on all devices
- **Bootstrap 5**: Modern, clean UI with professional styling
- **Font Awesome Icons**: Beautiful iconography throughout the application

## 🛠 Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA** - Database operations
- **Spring Security** - Authentication and authorization
- **Spring Validation** - Input validation
- **MySQL** - Primary database
- **Thymeleaf** - Server-side templating

### Frontend
- **HTML5 & CSS3**
- **Bootstrap 5** - Responsive framework
- **Chart.js** - Data visualization
- **Font Awesome** - Icons
- **Vanilla JavaScript** - Client-side interactions

### Database
- **MySQL 8.0+**
- **JPA/Hibernate** - ORM
- **Proper indexing** for performance
- **Foreign key constraints** for data integrity

## 📋 Prerequisites

- **Java 17** or higher
- **Maven 3.6+**
- **MySQL 8.0+**
- **IDE** (IntelliJ IDEA, Eclipse, or VS Code)

## 🔧 Installation & Setup

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/trackfit.git
cd trackfit
\`\`\`

### 2. Database Setup
\`\`\`bash
# Login to MySQL
mysql -u root -p

# Create database and tables
source scripts/create-database.sql

# Insert sample data (optional)
source scripts/seed-data.sql
\`\`\`

### 3. Configure Application Properties
Update \`src/main/resources/application.properties\`:
\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/trackfit
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
\`\`\`

### 4. Build and Run
\`\`\`bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
\`\`\`

### 5. Access the Application
Open your browser and navigate to: \`http://localhost:8080\`

## 📱 Usage

### Getting Started
1. **Register**: Create a new account with username, email, and password
2. **Login**: Access your personal dashboard
3. **Add Workouts**: Start logging your fitness activities
4. **View Progress**: Monitor your fitness journey through charts and statistics

### Sample Accounts
If you ran the seed data script, you can use:
- **Username**: \`demo_user\`
- **Password**: \`password\` (Note: Update the hash in seed data for actual password)

## 🏗 Project Structure

\`\`\`
src/
├── main/
│   ├── java/com/trackfit/
│   │   ├── TrackFitApplication.java
│   │   ├── config/
│   │   │   └── SecurityConfig.java
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   ├── DashboardController.java
│   │   │   └── WorkoutController.java
│   │   ├── dto/
│   │   │   └── WorkoutStats.java
│   │   ├── model/
│   │   │   ├── User.java
│   │   │   └── Workout.java
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   └── WorkoutRepository.java
│   │   └── service/
│   │       ├── UserService.java
│   │       └── WorkoutService.java
│   └── resources/
│       ├── application.properties
│       └── templates/
│           ├── dashboard.html
│           ├── login.html
│           ├── register.html
│           └── workouts/
│               ├── form.html
│               └── list.html
└── scripts/
    ├── create-database.sql
    └── seed-data.sql
\`\`\`

## 🔒 Security Features

- **Password Hashing**: BCrypt encryption for secure password storage
- **Session Management**: Secure session handling with proper timeout
- **Input Validation**: Server-side validation for all user inputs
- **SQL Injection Protection**: JPA/Hibernate prevents SQL injection attacks
- **CSRF Protection**: Built-in Spring Security CSRF protection

## 📊 Database Schema

### Users Table
- \`id\` (Primary Key)
- \`username\` (Unique)
- \`email\` (Unique)
- \`password_hash\`
- \`created_at\`, \`updated_at\`

### Workouts Table
- \`id\` (Primary Key)
- \`user_id\` (Foreign Key)
- \`type\`, \`duration\`, \`calories\`, \`date\`
- \`created_at\`, \`updated_at\`

### Workout Types Table (Reference)
- \`id\`, \`name\`, \`description\`
- \`avg_calories_per_minute\`

## 🚀 Deployment

### Local Development
\`\`\`bash
mvn spring-boot:run
\`\`\`

### Production Build
\`\`\`bash
mvn clean package
java -jar target/trackfit-0.0.1-SNAPSHOT.jar
\`\`\`

### Docker (Optional)
\`\`\`dockerfile
FROM openjdk:17-jdk-slim
COPY target/trackfit-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Bootstrap team for the responsive CSS framework
- Chart.js for beautiful data visualizations
- Font Awesome for the icon library

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub or contact [your-email@example.com](mailto:your-email@example.com).

---

**Happy Tracking! 💪🏋️‍♂️🏃‍♀️**
