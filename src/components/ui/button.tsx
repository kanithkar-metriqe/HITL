import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-mt-blue border text-white cursor-pointer border-transparent text-primary-foreground transition-all duration-500 hover:[background-image:linear-gradient(180deg,_#1A5AD1_0%,_#103272_102.94%)]",
        // "bg-mt-blue border text-white cursor-pointer border-transparent text-primary-foreground transition-all duration-50 hover:bg-disable",
        destructive:
          "bg-destructive text-white transition-all duration-300 hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background transition-all duration-300 hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-transparent [font-size:13px] text-mt-normal leading-3 cursor-pointer text-mt-blue transition-all duration-300 hover:bg-mt-hover font-normal border border-mt-blue ease-in-out",
        ghost:
          "hover:bg-neutral-100 border border-mt-blue text-mt-blue rounded-xl hover:text-mt-blue dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        disabled:
          "bg-neutral-200  text-neutral-500 border border-transparent pointer-events-none  border-1 border-neutral-400",
        none: "",
      },
      size: {
        default: "px-3 py-2 has-[>svg]:px-2 rounded-sm",
        sm: "h-7 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 rounded-sm text-sm",
        lg: "h-10 rounded-xl px-6 has-[>svg]:px-4",
        xl: "rounded-4xl p-3",
        icon: "size-4",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
