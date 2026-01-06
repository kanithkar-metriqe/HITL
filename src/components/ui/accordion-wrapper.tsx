import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface AccordionItemConfig {
  /** Can be string OR ReactNode */
  value: string | React.ReactNode;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  borderClass: string;
  borderclassChild: string;
}

interface AccordionWrapperProps {
  items: AccordionItemConfig[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
  className?: string;
}

/**
 * Converts ReactNode / string into a stable string value
 * (AccordionItem requires string value internally)
 */
const normalizeValue = (
  value: string | React.ReactNode,
  index: number
) => {
  if (typeof value === "string") return value;
  return `acc-item-${index}`;
};

export function AccordionWrapper({
  items,
  type = "single",
  defaultValue,
  collapsible = true,
  className,
}: AccordionWrapperProps) {
  return (
    <Accordion
      type={type}
      defaultValue={defaultValue as any}
      collapsible={collapsible}
      className={className}
    >
      {items.map((item, index) => {
        const normalizedValue = normalizeValue(item.value, index);

        return (
          <AccordionItem
            key={normalizedValue}
            value={normalizedValue}
            disabled={item.disabled}
          >
            <AccordionTrigger className={item.borderClass}>{item.title}</AccordionTrigger>
            <AccordionContent className={item.borderclassChild}>{item.content}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
