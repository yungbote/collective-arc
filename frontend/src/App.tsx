
// src/App.tsx
import { LayoutProvider } from "@/contexts/LayoutProvider"
import { ViewportProvider } from "@/contexts/ViewportProvider"
import { ThemeProvider } from "@/contexts/ThemeProvider"
import { AppRouter } from "@/router/AppRouter"
import { PreloadFix } from "@/components/PreloadFix"

export default function App() {
  return (
    <ThemeProvider>
      <ViewportProvider>
        <LayoutProvider>
          <PreloadFix />
          <AppRouter />
        </LayoutProvider>
      </ViewportProvider>
    </ThemeProvider>
  )
}
