"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface AdminUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onSave: (user: User) => void
}

export function AdminUserDialog({ open, onOpenChange, user, onSave }: AdminUserDialogProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      name: "",
      email: "",
      role: "user",
      status: "pending",
    },
  )

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validar dados
      if (!formData.name || !formData.email) {
        throw new Error("Name and email are required")
      }

      let response
      let data

      if (user) {
        // Atualizar usuário existente
        response = await fetch(`/api/admin/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      } else {
        // Criar novo usuário
        response = await fetch("/api/admin/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save user")
      }

      data = await response.json()

      toast({
        title: user ? "User updated" : "User created",
        description: user ? "User has been updated successfully" : "User has been created successfully",
      })

      onSave(data)
    } catch (error) {
      console.error("Error saving user:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
            <DialogDescription>
              {user ? "Update user details and permissions" : "Fill in the information to create a new user"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <RadioGroup
                value={formData.role || "user"}
                onValueChange={(value) => handleChange("role", value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={formData.status || "pending"} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : user ? "Update User" : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
