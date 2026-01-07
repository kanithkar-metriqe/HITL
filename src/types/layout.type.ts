import type { ColumnDef } from "@tanstack/react-table";

export type IconProps = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  strokeWidth?: string;
};

export type ColumnMeta = {
  align?: "center" | "left" | "right";
  width?: number | string;
};

export type CustomColumnDef<T extends object> = {
  meta?: ColumnMeta;
} & ColumnDef<T, unknown>;