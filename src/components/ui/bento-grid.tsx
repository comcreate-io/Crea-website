import { ComponentPropsWithoutRef, ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-6 relative z-10">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 transition-all duration-300 lg:group-hover:-translate-y-10">
        <div className="w-12 h-12 rounded-full bg-[#2C2824] flex items-center justify-center mb-2 group-hover:bg-[#8B7355] transition-colors duration-300">
          <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
        </div>
        <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#2C2824] group-hover:text-[#8B7355] transition-colors">
          {name}
        </h3>
        <p className="text-sm text-[#6B6560] leading-relaxed">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden mt-4"
        )}
      >
        <a href={href} className="pointer-events-auto flex items-center text-[#8B7355] text-[11px] uppercase tracking-[2px] font-medium">
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4" />
        </a>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
      )}
    >
      <a href={href} className="pointer-events-auto flex items-center text-[#8B7355] text-[11px] uppercase tracking-[2px] font-medium hover:text-[#6B5A45] transition-colors">
        {cta}
        <ArrowRightIcon className="ms-2 h-4 w-4" />
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-[#8B7355]/[.02]" />
  </div>
)

export { BentoCard, BentoGrid }
