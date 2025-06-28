import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface ViewportContextProps {
  width: number | undefined
  height: number | undefined
  isBelowSm: boolean
  isBelowMd: boolean
  isBelowLg: boolean
  isBelowXl: boolean
  isBelowXxl: boolean
}

const ViewportContext = createContext<ViewportContextProps | undefined>(undefined);

const SM_BREAKPOINT = 640;
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;
const XL_BREAKPOINT = 1280;
const XXL_BREAKPOINT = 1536;

export function ViewportProvider({ children }: { children: ReactNode }) {
  const [width, setWidth] = useState<number | undefined>(
    typeof window !== "undefined" ? window.innerWidth : undefined
  )
  const [height, setHeight] = useState<number | undefined>(
    typeof window !== "undefined" ? window.innerHeight : undefined
  )

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isBelowSm = (width ?? 0) < SM_BREAKPOINT
  const isBelowMd = (width ?? 0) < MD_BREAKPOINT
  const isBelowLg = (width ?? 0) < LG_BREAKPOINT
  const isBelowXl = (width ?? 0) < XL_BREAKPOINT
  const isBelowXxl = (width ?? 0) < XXL_BREAKPOINT
  const contextValue: ViewportContextProps = {
    width,
    height,
    isBelowSm,
    isBelowMd,
    isBelowLg,
    isBelowXl,
    isBelowXxl,
  }
  return (
    <ViewportContext.Provider value={contextValue}>
      {children}
    </ViewportContext.Provider>
  )
}

export function useViewport() {
  const context = useContext(ViewportContext)
  if (!context) {
    throw new Error("useViewport must be used within a ViewportProvider")
  }
  return context
}
