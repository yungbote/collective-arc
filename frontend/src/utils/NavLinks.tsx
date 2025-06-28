// src/utils/NavLinks.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useLayout } from '@/contexts/LayoutProvider';
import { cn } from '@/lib/utils';
import { athletes } from '@/data/athletes';
import { events, getEventTypeColor } from '@/data/events';

interface NavLinksProps {
  isMobileLayout?: boolean
  onLinkClick?: () => void
}

export function NavLinks({
  isMobileLayout = false,
  onLinkClick,
}: NavLinksProps) {
  const { activeLink, setActiveLink: contextSetActiveLink } = useLayout()

  const handleLinkClick = (link: string) => {
    contextSetActiveLink(link)
    onLinkClick?.() // close sidebar in mobile layout, etc.
  }

  const getButtonClass = (linkIdentifier: string) => {
    const isActive =
      activeLink === linkIdentifier ||
      (linkIdentifier === "operations" &&
        activeLink.startsWith("operations:")) ||
      (linkIdentifier === "athletes" &&
        activeLink.startsWith("athletes")) ||
      (linkIdentifier === "events" &&
        activeLink.startsWith("events"))

    return cn(
      "transition-colors rounded-md font-medium",
      isMobileLayout && "w-full justify-start",
      isMobileLayout ? "text-base h-10 px-3" : "text-sm h-9 px-3",
      isActive
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
    )
  }

  const getDropdownItemClass = (linkIdentifier: string) =>
    cn(
      "cursor-pointer",
      activeLink === linkIdentifier && "bg-accent text-accent-foreground",
    )

  // Get featured athletes for the dropdown (show max 5)
  const featuredAthletes = athletes.filter(a => a.featured).slice(0, 5)

  // Get upcoming featured events for the dropdown (show max 5)
  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <>
      {/* HOME */}
      <Button
        variant="ghost"
        className={getButtonClass("home")}
        onClick={() => handleLinkClick("home")}
        asChild
      >
        <Link to="/">Home</Link>
      </Button>

      {/* ABOUT */}
      <Button
        variant="ghost"
        className={getButtonClass("about")}
        onClick={() => handleLinkClick("about")}
        asChild
      >
        <Link to="/about">About</Link>
      </Button>

      {/* EVENTS DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(getButtonClass("events"), "gap-1.5")}
          >
            <span>Events</span>
            <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isMobileLayout ? "start" : "end"}
          className="w-72"
        >
          <DropdownMenuItem
            onClick={() => handleLinkClick("events")}
            className={cn(getDropdownItemClass("events"), "font-semibold")}
            asChild
          >
            <Link to="/events">
              View All Events
            </Link>
          </DropdownMenuItem>
          {upcomingEvents.length > 0 && (
            <>
              <DropdownMenuSeparator />
              {/* Upcoming Events */}
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Upcoming Events
              </div>
              {upcomingEvents.map((event) => (
                <DropdownMenuItem
                  key={event.id}
                  onClick={() => handleLinkClick(`events:${event.id}`)}
                  className={getDropdownItemClass(`events:${event.id}`)}
                  asChild
                >
                  <Link to={`/events/${event.id}`} className="flex flex-col items-start py-2">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium line-clamp-1 pr-2">{event.title}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{formatEventDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${getEventTypeColor(event.type)}`} />
                      <span className="text-xs text-muted-foreground line-clamp-1">{event.location}</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleLinkClick("events")}
            className="text-center justify-center font-medium text-green-600 dark:text-green-400"
            asChild
          >
            <Link to="/events">
              View All Events →
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ATHLETES DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(getButtonClass("athletes"), "gap-1.5")}
          >
            <span>Athletes</span>
            <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isMobileLayout ? "start" : "end"}
          className="w-64"
        >
          <DropdownMenuItem
            onClick={() => handleLinkClick("athletes")}
            className={cn(getDropdownItemClass("athletes"), "font-semibold")}
            asChild
          >
            <Link to="/athletes">
              Browse All Athletes
            </Link>
          </DropdownMenuItem>
          {featuredAthletes.length > 0 && (
            <>
              <DropdownMenuSeparator />
              {/* Featured Athletes */}
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Featured Athletes
              </div>
              {featuredAthletes.map((athlete) => (
                <DropdownMenuItem
                  key={athlete.id}
                  onClick={() => handleLinkClick(`athletes:${athlete.id}`)}
                  className={getDropdownItemClass(`athletes:${athlete.id}`)}
                  asChild
                >
                  <Link to={`/athletes/${athlete.id}`} className="flex flex-col items-start py-2">
                    <span className="font-medium">{athlete.name}</span>
                    <span className="text-xs text-muted-foreground">{athlete.sport} • {athlete.location}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleLinkClick("athletes")}
            className="text-center justify-center font-medium text-green-600 dark:text-green-400"
            asChild
          >
            <Link to="/athletes">
              View All Athletes →
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* OPERATIONS DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(getButtonClass("operations"), "gap-1.5")}
          >
            <span>Operations</span>
            <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isMobileLayout ? "start" : "end"}
          className="w-48"
        >
          <DropdownMenuItem
            onClick={() => handleLinkClick("operations:ask")}
            className={getDropdownItemClass("operations:ask")}
            asChild
          >
            <Link to="/operations/ask">Ask</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLinkClick("operations:art")}
            className={getDropdownItemClass("operations:art")}
            asChild
          >
            <Link to="/operations/art">Art</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLinkClick("operations:all")}
            className={getDropdownItemClass("operations:all")}
            asChild
          >
            <Link to="/operations/all">All</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
