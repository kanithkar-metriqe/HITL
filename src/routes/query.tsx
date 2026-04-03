import QueryPage from "@/pages/query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/query")({
  component: QueryPage,
});
