import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AdminLayout from './components/AdminLayout';
import AdminGuard from './components/AdminGuard';
import OwnerDashboard from './pages/OwnerDashboard';
import StockManagement from './pages/StockManagement';
import TrendingPage from './pages/TrendingPage';
import SalesPage from './pages/SalesPage';
import RevenuePage from './pages/RevenuePage';
import IncomePage from './pages/IncomePage';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin-layout',
  component: () => (
    <AdminGuard>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </AdminGuard>
  ),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/',
  component: OwnerDashboard,
});

const adminStocksRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/stocks',
  component: StockManagement,
});

const adminTrendingRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/trending',
  component: TrendingPage,
});

const adminSalesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/sales',
  component: SalesPage,
});

const adminRevenueRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/revenue',
  component: RevenuePage,
});

const adminIncomeRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/income',
  component: IncomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin',
  component: OwnerDashboard,
});

const routeTree = rootRoute.addChildren([
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminRoute,
    adminStocksRoute,
    adminTrendingRoute,
    adminSalesRoute,
    adminRevenueRoute,
    adminIncomeRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
