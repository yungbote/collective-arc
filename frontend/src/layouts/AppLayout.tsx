// src/layouts/AppLayout.tsx
import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Navbar } from "@/components/NavBar"
import { cn } from "@/lib/utils"
import { useLayout } from "@/contexts/LayoutProvider"
import { pathToLink } from "@/utils/pathToLink"

export function AppLayout() {
  const location = useLocation()
  const { activeLink, setActiveLink } = useLayout()

  /* keep navbar highlight in sync with the current URL */
  useEffect(() => {
    const inferred = pathToLink(location.pathname)
    if (inferred && inferred !== activeLink) {
      setActiveLink(inferred)
    }
  }, [location.pathname, activeLink, setActiveLink])

  return (
    <div className={cn("flex min-h-screen flex-col bg-background")}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

