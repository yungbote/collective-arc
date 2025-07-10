// src/components/NavBar.tsx
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useTheme } from "@/contexts/ThemeProvider"
import { useLayout } from "@/contexts/LayoutProvider"
import { NavLinks } from "@/utils/NavLinks"
import { cn } from "@/lib/utils"
import { useViewport } from "@/contexts/ViewportProvider"

export function Navbar() {
  const {
    isMobile,
    isSidebarOpen,
    setIsSidebarOpen,
    getDisplayedOperation,
  } = useLayout()
  const { theme } = useTheme();
  const { isBelowLg } = useViewport(); // Get viewport info to check if hamburger is visible

  const displayedOperation = getDisplayedOperation()

  const handleSidebarLinkClick = () => setIsSidebarOpen(false)

  const LogoLink = (
    <Link
      to="/"
      className="flex items-center gap-2 min-w-0"
      onClick={handleSidebarLinkClick}
    >
      <img
        src="/collective-arc-light.png"
        alt="Collective ARC logo"
        className="h-9 w-auto flex-shrink-0"
      />
    </Link>
  )

  // Hide logo when hamburger is visible (below lg) and sidebar is not open
  const shouldHideLogo = isBelowLg && !isSidebarOpen;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-[1920px] mx-auto">
        {/* Left: logo + hamburger */}
        <div className="flex items-center min-w-0 flex-shrink-0">
          {/* Mobile hamburger with consistent spacing */}
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden flex-shrink-0 h-9 w-9",
                  !shouldHideLogo && "mr-3 sm:mr-4"
                )}
                aria-label="Toggle sidebar"
              >
                {isSidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={cn("p-0 flex flex-col", isMobile ? "w-[85vw] sm:w-[350px]" : "sm:max-w-xs")}
            >
              <SheetHeader className="border-b p-3 sm:p-4">
                {LogoLink}
              </SheetHeader>
              <div className="flex-grow space-y-1 overflow-y-auto p-3 sm:p-4">
                <NavLinks isMobileLayout onLinkClick={handleSidebarLinkClick} />
              </div>
            </SheetContent>
          </Sheet>
          {/* Conditionally render logo */}
          {!shouldHideLogo && LogoLink}
        </div>

        {/* Right: desktop nav links + theme toggle */}
        <div className="flex items-center">
          <nav className="hidden items-center lg:flex">
            <div className="flex items-center gap-1">
              <NavLinks />
            </div>
            {displayedOperation && (
              <span className="ml-4 pl-4 border-l text-xs lg:text-sm font-medium text-foreground flex items-center h-9">
                <span className="text-muted-foreground">Operation:</span>
                <span className="ml-1">{displayedOperation}</span>
              </span>
            )}
          </nav>
          <div className="ml-2 lg:ml-3">
            <ThemeToggle iconSize={18} extended={false} />
          </div>
        </div>
      </div>
    </header>
  )
}
