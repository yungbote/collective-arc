// src/contexts/LayoutProvider.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react"
import { useMobile } from "@/hooks/use-mobile"

interface LayoutContextType {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
  activeLink: string
  setActiveLink: (link: string) => void
  isMobile: boolean
  getDisplayedOperation: () => string | null
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeLink, setActiveLinkInternal] = useState("home")
  const isMobile = useMobile()

  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    [],
  )

  const setActiveLink = useCallback(
    (link: string) => {
      setActiveLinkInternal(link)
      if (isMobile) setIsSidebarOpen(false)
    },
    [isMobile],
  )

  const getDisplayedOperation = useCallback(() => {
    if (activeLink.startsWith("operations:")) {
      const op = activeLink.split(":")[1]!
      return op.charAt(0).toUpperCase() + op.slice(1)
    }
    return null
  }, [activeLink])

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        activeLink,
        setActiveLink,
        isMobile,
        getDisplayedOperation,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const ctx = useContext(LayoutContext)
  if (!ctx) throw new Error("useLayout must be used inside <LayoutProvider>")
  return ctx
}

