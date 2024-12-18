import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./pages/Home";
import { FetchOld } from "./pages/FetchOld";
import { FetchNew } from "./pages/FetchNew";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FetchById } from "./pages/FetchbyId";
import { InfiniteScroll } from "./pages/infiniteScroll";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/fetch-Old",
          element: <FetchOld />,
        },
        {
          path: "fetch-new",
          element: <FetchNew />,
        },
        {
          path: "/fetch-new/:id",
          element: <FetchById />,
        },
        {
          path: "/infite",
          element: <InfiniteScroll />,
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
