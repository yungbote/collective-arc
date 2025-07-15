// src/components/Footer.tsx
import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Rocket, ArrowRight } from "lucide-react"
import { useTheme } from "@/contexts/ThemeProvider"

export function Footer() {
  const { theme } = useTheme();

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
  ]

  const footerLinks = {
    operations: [
      { name: "Operation Ask", href: "/operations/ask" },
      { name: "Operation Art", href: "/operations/art" },
      { name: "Operation All", href: "/operations/all" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Meet Our Founder", href: "/athletes/aiden-mcfadden" },
      { name: "Our Vision", href: "/about" },
    ],
    getInvolved: [
      { name: "Join Newsletter", href: "#newsletter" },
      { name: "Become a Mentor", href: "/athletes" },
      { name: "Partner With Us", href: "#" },
    ],
  }

  const logoSrc =
    theme === "dark" ? "/collective-arc-dark.png" : "/collective-arc-light.png"


  return (
    <footer className="w-full border-t bg-background" id="footer">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl">
        <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Top Section - Grid Layout */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
            {/* Brand Section - Takes up more space */}
            <div className="sm:col-span-2 lg:col-span-3">
              <div className="max-w-md">
                {/* Logo */}
                <Link to="/" className="inline-flex items-center gap-2">
                  <img
                    src={logoSrc}
                    alt="Collective Arc logo"
                    className="h-10 w-auto"
                  />
                  {/*<span className="font-bold text-xl">Collective Arc</span>*/}
                </Link>
                
                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Launching 2025: A movement where athletes unite to create positive change through knowledge sharing, environmental action, and educational initiatives.
                </p>
                
                {/* Launch Badge */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 dark:bg-green-950/30 px-3 py-1.5">
                  <Rocket className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Join us at the beginning
                  </span>
                </div>
                
                {/* Social Links */}
                <div className="mt-6 flex gap-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Grid - Better spacing on mobile */}
            <div className="grid grid-cols-2 gap-8 sm:col-span-2 sm:grid-cols-3 lg:col-span-3">
              {/* Operations */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Operations</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerLinks.operations.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get Involved */}
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-sm font-semibold leading-6 text-foreground">Get Involved</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerLinks.getInvolved.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        {/*<div className="border-t border-border/40">
          <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-lg font-semibold leading-6 text-foreground">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Be the first to know about our launch, events, and opportunities to get involved.
              </p>
              <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="min-w-0 flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-green-600 hover:to-emerald-600 hover:shadow-md"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>*/}

        {/* Bottom Section */}
        <div className="border-t border-border/40">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              {/* Copyright */}
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:flex-row md:gap-1">
                <span>&copy; {currentYear} The Collective Arc.</span>
                <span className="hidden md:inline">•</span>
                <span>All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span>Launching 2025</span>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:gap-6">
                <Link 
                  to="#" 
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="#" 
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
                <a 
                  href="mailto:amcfadden@collectivearc.org" 
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
