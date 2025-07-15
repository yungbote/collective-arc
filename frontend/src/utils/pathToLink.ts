// src/utils/pathToLink.ts
export function pathToLink(path: string): string {
  if (path === "/" || path.startsWith("/home")) return "home"
  if (path.startsWith("/about")) return "about"

  if (path.startsWith("/events/")) {
    const id = path.split("/")[2]
    return id ? `events:${id}` : "events"
  }
  if (path.startsWith("/events")) return "events"

  if (path.startsWith("/athletes/")) {
    const id = path.split("/")[2]
    return id ? `athletes:${id}` : "athletes"
  }
  if (path.startsWith("/athletes")) return "athletes"

  if (path.startsWith("/operations/")) {
    const op = path.split("/")[2]
    return op ? `operations:${op}` : "operations"
  }
  return ""
}
