"use client"

import { useMemo } from "react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface Workout {
  id: number
  type: string
  duration: number
  calories: number
  date: string
  userId: number
}

interface AnalyticsChartProps {
  workouts: Workout[]
}

export function AnalyticsChart({ workouts }: AnalyticsChartProps) {
  const chartData = useMemo(() => {
    // Group workouts by date for daily calories chart
    const dailyData = workouts.reduce(
      (acc, workout) => {
        const date = new Date(workout.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        if (!acc[date]) {
          acc[date] = { date, calories: 0, duration: 0 }
        }
        acc[date].calories += workout.calories
        acc[date].duration += workout.duration
        return acc
      },
      {} as Record<string, { date: string; calories: number; duration: number }>,
    )

    return Object.values(dailyData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [workouts])

  const workoutTypeData = useMemo(() => {
    const typeCount = workouts.reduce(
      (acc, workout) => {
        acc[workout.type] = (acc[workout.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(typeCount).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / workouts.length) * 100),
    }))
  }, [workouts])

  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"]

  if (workouts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No data available for analytics</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Daily Calories Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Daily Calories Burned</h3>
        <ChartContainer
          config={{
            calories: {
              label: "Calories",
              color: "#3b82f6",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="calories" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Workout Types Distribution */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Workout Types</h3>
        <div className="space-y-2">
          {workoutTypeData.map((item, index) => (
            <div key={item.type} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                <span className="text-sm">{item.type}</span>
              </div>
              <div className="text-sm text-gray-600">
                {item.count} ({item.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {
              workouts.filter((w) => {
                const workoutDate = new Date(w.date)
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return workoutDate >= weekAgo
              }).length
            }
          </div>
          <div className="text-sm text-blue-600">This Week</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / 60)}h
          </div>
          <div className="text-sm text-green-600">Total Hours</div>
        </div>
      </div>
    </div>
  )
}
