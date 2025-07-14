"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Loader2 } from "lucide-react"

interface Workout {
  id: number
  type: string
  duration: number
  calories: number
  date: string
  userId: number
}

interface WorkoutFormProps {
  workout?: Workout | null
  onSubmit: (data: Omit<Workout, "id" | "userId">) => void
  onCancel: () => void
  loading: boolean
}

const workoutTypes = [
  "Running",
  "Weight Training",
  "Cycling",
  "Swimming",
  "Yoga",
  "Pilates",
  "CrossFit",
  "Basketball",
  "Soccer",
  "Tennis",
  "Walking",
  "Hiking",
  "Dancing",
  "Boxing",
  "Other",
]

export function WorkoutForm({ workout, onSubmit, onCancel, loading }: WorkoutFormProps) {
  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    calories: "",
    date: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (workout) {
      setFormData({
        type: workout.type,
        duration: workout.duration.toString(),
        calories: workout.calories.toString(),
        date: workout.date,
      })
    } else {
      // Set default date to today
      const today = new Date().toISOString().split("T")[0]
      setFormData((prev) => ({ ...prev, date: today }))
    }
  }, [workout])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.type) {
      newErrors.type = "Workout type is required"
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required"
    } else if (Number.parseInt(formData.duration) <= 0) {
      newErrors.duration = "Duration must be greater than 0"
    }

    if (!formData.calories) {
      newErrors.calories = "Calories is required"
    } else if (Number.parseInt(formData.calories) <= 0) {
      newErrors.calories = "Calories must be greater than 0"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        type: formData.type,
        duration: Number.parseInt(formData.duration),
        calories: Number.parseInt(formData.calories),
        date: formData.date,
      })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{workout ? "Edit Workout" : "Add New Workout"}</CardTitle>
              <CardDescription>
                {workout ? "Update your workout details" : "Record your fitness activity"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Workout Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent>
                  {workoutTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="Enter duration in minutes"
                min="1"
                className={errors.duration ? "border-red-500" : ""}
              />
              {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories">Calories Burned</Label>
              <Input
                id="calories"
                type="number"
                value={formData.calories}
                onChange={(e) => handleChange("calories", e.target.value)}
                placeholder="Enter calories burned"
                min="1"
                className={errors.calories ? "border-red-500" : ""}
              />
              {errors.calories && <p className="text-sm text-red-500">{errors.calories}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {workout ? "Update Workout" : "Add Workout"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
