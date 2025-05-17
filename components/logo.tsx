import { Activity } from "lucide-react"

interface LogoProps {
  className?: string
  iconClassName?: string
  textClassName?: string
}

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <Activity className={`h-6 w-6 text-emerald-500 ${iconClassName || ""}`} />
      <span className={`font-semibold ${textClassName || ""}`}>Akin Quantum Hedge Fund Offshore</span>
    </div>
  )
}
