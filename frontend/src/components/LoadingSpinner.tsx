// src/components/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-muted animate-pulse" />
        <div className="absolute top-0 h-12 w-12 rounded-full border-4 border-green-500 border-t-transparent animate-spin" />
      </div>
    </div>
  )
}
