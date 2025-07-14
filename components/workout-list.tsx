"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Calendar, Clock, Flame } from "lucide-react"

interface Workout {
  id: number
  type: string
  duration: number
  calories: number
  date: string
  userId: number
}

interface WorkoutListProps {
  workouts: Workout[]
  onEdit: (workout: Workout) => void
  onDelete: (id: number) => void
  loading: boolean
}

export function WorkoutList({ workouts, onEdit, onDelete, loading }: WorkoutListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getWorkoutTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Running: "bg-blue-100 text-blue-800",
      "Weight Training": "bg-red-100 text-red-800",
      Cycling: "bg-green-100 text-green-800",
      Swimming: "bg-cyan-100 text-cyan-800",
      Yoga: "bg-purple-100 text-purple-800",
      Pilates: "bg-pink-100 text-pink-800",
      CrossFit: "bg-orange-100 text-orange-800",
      Basketball: "bg-yellow-100 text-yellow-800",
      Soccer: "bg-emerald-100 text-emerald-800",
      Tennis: "bg-lime-100 text-lime-800",
      Walking: "bg-slate-100 text-slate-800",
      Hiking: "bg-amber-100 text-amber-800",
      Dancing: "bg-rose-100 text-rose-800",
      Boxing: "bg-gray-100 text-gray-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  if (workouts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">
          <Calendar className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No workouts yet</h3>
        <p className="text-gray-500">Start tracking your fitness journey by adding your first workout!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Badge className={getWorkoutTypeColor(workout.type)}>{workout.type}</Badge>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(workout.date)}
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {workout.duration} min
              </div>
              <div className="flex items-center">
                <Flame className="h-4 w-4 mr-1" />
                {workout.calories} cal
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(workout)} disabled={loading}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(workout.id)}
              disabled={loading}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
