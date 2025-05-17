"use client"

import { useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AdminUserActivity() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/admin/users")
        const data = await response.json()
        setUsers(data.slice(0, 5)) // Limitar a 5 usuários
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    )
  }

  if (users.length === 0) {
    return <p className="text-center text-muted-foreground">No users found.</p>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          >
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {getStatusBadge(user.status)}
            <Button variant="ghost" size="sm">
              View
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
