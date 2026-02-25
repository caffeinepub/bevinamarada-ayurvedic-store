import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import AdminLayout from './components/AdminLayout';
import AdminGuard from './components/AdminGuard';
import PublicLayout from './components/PublicLayout';
import OwnerDashboard from './pages/OwnerDashboard';
import StockManagement from './pages/StockManagement';
import CustomerManagement from './pages/CustomerManagement';
import SalesReports from './pages/SalesReports';
import ProfilePage from './pages/ProfilePage';
import TrendingPage from './pages/TrendingPage';
import SalesPage from './pages/SalesPage';
import RevenuePage from './pages/RevenuePage';
import IncomePage from './pages/IncomePage';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'publicLayout',
  component: () => (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: AboutUs,
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/contact',
  component: Contact,
});

// Admin layout route
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'adminLayout',
  component: () => (
    <AdminGuard>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </AdminGuard>
  ),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin',
  component: OwnerDashboard,
});

const adminStocksRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/stocks',
  component: StockManagement,
});

const adminCustomersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/customers',
  component: CustomerManagement,
});

const adminSalesReportsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/sales-reports',
  component: SalesReports,
});

const adminProfileRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/profile',
  component: ProfilePage,
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

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([homeRoute, aboutRoute, contactRoute]),
  adminLayoutRoute.addChildren([
    adminIndexRoute,
    adminStocksRoute,
    adminCustomersRoute,
    adminSalesReportsRoute,
    adminProfileRoute,
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
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
