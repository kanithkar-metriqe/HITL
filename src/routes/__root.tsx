// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import NotFound from "@/pages/not-found";
import { Slide, ToastContainer } from "react-toastify";


export const Route = createRootRoute({
  component: () => (
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

    </>
  ),
  notFoundComponent: () => <NotFound />,
});
