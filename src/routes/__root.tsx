// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Outlet, useMatchRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import NotFound from "@/pages/not-found";
import { Slide, ToastContainer } from "react-toastify";
import QueryChatWidget from "@/components/QueryChatWidget";


export const Route = createRootRoute({
  component: function RootComponent() {
    const matchRoute = useMatchRoute();
    const isQueryPage = matchRoute({ to: "/query" });

    return (
      <>
        <ToastContainer
          autoClose={5000}
          closeButton={false}
          className="bg-none"
          draggable
          hideProgressBar={true}
          newestOnTop
          pauseOnHover
          position="top-center"
          toastClassName=" text-gray-800 bg-none p-0"
          transition={Slide}
        />
        <HeadContent />

        <Outlet />
        {!isQueryPage && <QueryChatWidget />}
      </>
    );
  },
  notFoundComponent: () => <NotFound />,
});
