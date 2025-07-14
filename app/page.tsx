"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Calendar, TrendingUp, Plus, UserIcon, LogOut } from "lucide-react"
import { WorkoutForm } from "@/components/workout-form"
import { WorkoutList } from "@/components/workout-list"
import { AnalyticsChart } from "@/components/analytics-chart"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"

// Mock API service (replace with actual Spring Boot API calls)
const API_BASE_URL = "http://localhost:8080/api"

interface Workout {
  id: number
  type: string
  duration: number
  calories: number
  date: string
  userId: number
}

export default function TrackFitApp() {
  const [user, setUser] = useState<{ id: number; username: string; email: string } | null>(null)
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [showWorkoutForm, setShowWorkoutForm] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)
  const [currentView, setCurrentView] = useState<"login" | "register" | "dashboard">("login")
  const [loading, setLoading] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      // This would be replaced with actual API call to Spring Boot backend
      const mockWorkouts: Workout[] = [
        { id: 1, type: "Running", duration: 30, calories: 300, date: "2024-01-15", userId: 1 },
        { id: 2, type: "Weight Training", duration: 45, calories: 250, date: "2024-01-14", userId: 1 },
        { id: 3, type: "Cycling", duration: 60, calories: 400, date: "2024-01-13", userId: 1 },
        { id: 4, type: "Swimming", duration: 40, calories: 350, date: "2024-01-12", userId: 1 },
        { id: 5, type: "Yoga", duration: 50, calories: 150, date: "2024-01-11", userId: 1 },
      ]
      setWorkouts(mockWorkouts)
    }
  }, [user])

  // Mock API functions (replace with actual Spring Boot API calls)
  const loginUser = async (username: string, password: string) => {
    setLoading(true)
    try {
      // Mock API call - replace with: fetch(`${API_BASE_URL}/auth/login`, {...})
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockUser = { id: 1, username, email: `${username}@example.com` }
      setUser(mockUser)
      setCurrentView("dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const registerUser = async (username: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Mock API call - replace with: fetch(`${API_BASE_URL}/auth/register`, {...})
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockUser = { id: 1, username, email }
      setUser(mockUser)
      setCurrentView("dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const addWorkout = async (workoutData: Omit<Workout, "id" | "userId">) => {
    if (!user) return

    setLoading(true)
    try {
      // Mock API call - replace with: fetch(`${API_BASE_URL}/workouts`, {...})
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newWorkout: Workout = {
        ...workoutData,
        id: Date.now(),
        userId: user.id,
      }
      setWorkouts((prev) => [newWorkout, ...prev])
      setShowWorkoutForm(false)
    } catch (error) {
      console.error("Failed to add workout:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateWorkout = async (id: number, workoutData: Omit<Workout, "id" | "userId">) => {
    if (!user) return

    setLoading(true)
    try {
      // Mock API call - replace with: fetch(`${API_BASE_URL}/workouts/${id}`, {...})
      await new Promise((resolve) => setTimeout(resolve, 500))
      setWorkouts((prev) => prev.map((w) => (w.id === id ? { ...workoutData, id, userId: user.id } : w)))
      setEditingWorkout(null)
    } catch (error) {
      console.error("Failed to update workout:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteWorkout = async (id: number) => {
    setLoading(true)
    try {
      // Mock API call - replace with: fetch(`${API_BASE_URL}/workouts/${id}`, { method: 'DELETE' })
      await new Promise((resolve) => setTimeout(resolve, 500))
      setWorkouts((prev) => prev.filter((w) => w.id !== id))
    } catch (error) {
      console.error("Failed to delete workout:", error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setWorkouts([])
    setCurrentView("login")
  }

  // Calculate stats
  const totalWorkouts = workouts.length
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0)
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0)
  const thisWeekWorkouts = workouts.filter((w) => {
    const workoutDate = new Date(w.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return workoutDate >= weekAgo
  }).length

  if (currentView === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Activity className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">TrackFit</h1>
            <p className="text-gray-600 mt-2">Track your fitness journey</p>
          </div>
          <LoginForm onLogin={loginUser} onSwitchToRegister={() => setCurrentView("register")} loading={loading} />
        </div>
      </div>
    )
  }

  if (currentView === "register") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Activity className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">TrackFit</h1>
            <p className="text-gray-600 mt-2">Create your account</p>
          </div>
          <RegisterForm onRegister={registerUser} onSwitchToLogin={() => setCurrentView("login")} loading={loading} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">TrackFit</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <UserIcon className="h-4 w-4 mr-1" />
                {user?.username}
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWorkouts}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{thisWeekWorkouts}</div>
              <p className="text-xs text-muted-foreground">Workouts completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calories</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCalories.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Calories burned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(totalDuration / 60)}h</div>
              <p className="text-xs text-muted-foreground">{totalDuration} minutes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workout Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Workouts</CardTitle>
                    <CardDescription>Manage your workout history</CardDescription>
                  </div>
                  <Button onClick={() => setShowWorkoutForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Workout
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <WorkoutList
                  workouts={workouts}
                  onEdit={setEditingWorkout}
                  onDelete={deleteWorkout}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </div>

          {/* Analytics */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Progress Analytics</CardTitle>
                <CardDescription>Your fitness journey overview</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsChart workouts={workouts} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Workout Form Modal */}
      {(showWorkoutForm || editingWorkout) && (
        <WorkoutForm
          workout={editingWorkout}
          onSubmit={editingWorkout ? (data) => updateWorkout(editingWorkout.id, data) : addWorkout}
          onCancel={() => {
            setShowWorkoutForm(false)
            setEditingWorkout(null)
          }}
          loading={loading}
        />
      )}
    </div>
  )
}
