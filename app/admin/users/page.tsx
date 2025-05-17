"use client"

import { useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, UserPlus, Download, Filter } from "lucide-react"
import { AdminUserDialog } from "@/components/admin/admin-user-dialog"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchQuery, statusFilter])

  async function fetchUsers() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      setUsers(data)
      setFilteredUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function filterUsers() {
    let result = [...users]

    // Filtrar por status
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter)
    }

    // Filtrar por pesquisa
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
      )
    }

    setFilteredUsers(result)
  }

  function handleAddUser() {
    setSelectedUser(null)
    setIsUserDialogOpen(true)
  }

  function handleEditUser(user: User) {
    setSelectedUser(user)
    setIsUserDialogOpen(true)
  }

  function handleUserSaved(user: User) {
    if (selectedUser) {
      // Atualizar usuário existente
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? user : u)))
    } else {
      // Adicionar novo usuário
      setUsers((prevUsers) => [...prevUsers, user])
    }
    setIsUserDialogOpen(false)
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add User</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Invested</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "outline"}>
                          {user.role === "admin" ? "Admin" : "User"}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {user.totalInvested !== undefined ? `$${user.totalInvested.toLocaleString()}` : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Investments</DropdownMenuItem>
                            <DropdownMenuItem>View Transactions</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AdminUserDialog
        open={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
        user={selectedUser}
        onSave={handleUserSaved}
      />
    </div>
  )
}
