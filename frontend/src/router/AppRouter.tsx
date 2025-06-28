import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { AppLayout } from "@/layouts/AppLayout"
import { HomePage } from "@/pages/HomePage"
import { AboutPage } from "@/pages/AboutPage"
import { OperationPage } from "@/pages/OperationPage"
import { AthletesPage } from "@/pages/AthletesPage"
import { AthleteProfilePage } from "@/pages/AthleteProfilePage"
import { EventsPage } from "@/pages/EventsPage"
import { EventPage } from "@/pages/EventPage"
import { ScrollToTop } from "@/components/ScrollToTop"

const PublicRoute = ({ children }: { children: React.ReactElement }) =>
  children

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<PublicRoute><HomePage /></PublicRoute>} />
          <Route path="about" element={<PublicRoute><AboutPage /></PublicRoute>} />
          <Route path="athletes" element={<PublicRoute><AthletesPage /></PublicRoute>} />
          <Route path="athletes/:athleteId" element={<PublicRoute><AthleteProfilePage /></PublicRoute>} />
          <Route path="events" element={<PublicRoute><EventsPage /></PublicRoute>} />
          <Route path="events/:eventId" element={<PublicRoute><EventPage /></PublicRoute>} />
          <Route
            path="operations/ask"
            element={<PublicRoute><OperationPage operation="ask" /></PublicRoute>}
          />
          <Route
            path="operations/art"
            element={<PublicRoute><OperationPage operation="art" /></PublicRoute>}
          />
          <Route
            path="operations/all"
            element={<PublicRoute><OperationPage operation="all" /></PublicRoute>}
          />
          {/* catch-all */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
