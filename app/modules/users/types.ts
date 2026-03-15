import type { Pagination } from "~/core/types/pagination.type"

export type UserRole = "admin" | "member"

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
}

export type UsersList = Pagination & {
  items: User[]
}
