// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import NotFound from "@/pages/not-found";


export const Route = createRootRoute({
  component: () => (
    <>

      <HeadContent />

      <Outlet />

    </>
  ),
  notFoundComponent: () => <NotFound />,
});
