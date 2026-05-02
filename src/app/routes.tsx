import { createHashRouter, Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Home } from "./pages/Home";
import { BakingPage } from "./pages/BakingPage";
import { BakingDetailPage } from "./pages/BakingDetailPage";
import { ResearchPage } from "./pages/ResearchPage";

function ScrollToTop() {
  const { pathname, state } = useLocation();
  const routeState = state as { restoreResearchAreas?: string } | null;

  useEffect(() => {
    if (routeState?.restoreResearchAreas) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, routeState?.restoreResearchAreas]);

  return <Outlet />;
}

export const router = createHashRouter([
  {
    Component: ScrollToTop,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/research",
        Component: ResearchPage,
      },
      {
        path: "/baking",
        Component: BakingPage,
      },
      {
        path: "/baking/:slug",
        Component: BakingDetailPage,
      },
    ],
  },
]);
