import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

import { cva } from "class-variance-authority";


const title = cva("", {
  variants: {
    intent: {
      // default: ["text-mono-black","kkk"],
      h6: ["text-[16px]", "text-mono-black"],
      h5: ["font-semibold","text-[13px]", "text-mono-black"],
      h4: [ "text-mono-black", "text-[13px]"],
    },
  },
});

export type TitleProps = {} & React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof title>;

export default function Title({
  children,
  className,
  intent,
  ...props
}: TitleProps) {
  return (
    <h6 className={cn(title({ intent, className }))} {...props}>
      {children}
    </h6>
  );
}
