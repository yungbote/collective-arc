// src/layouts/AppLayout.tsx
import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/NavBar"
import { cn } from "@/lib/utils"

export function AppLayout() {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background")}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
