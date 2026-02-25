import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';
import AdminGuard from './components/AdminGuard';
import Home from './pages/Home';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import OwnerDashboard from './pages/OwnerDashboard';
import StockManagement from './pages/StockManagement';
import SalesPage from './pages/SalesPage';
import RevenuePage from './pages/RevenuePage';
import CustomerManagement from './pages/CustomerManagement';
import EnquiryManagement from './pages/EnquiryManagement';
import IncomePage from './pages/IncomePage';
import TrendingPage from './pages/TrendingPage';
import ProductManagement from './pages/ProductManagement';
import SalesReports from './pages/SalesReports';
import AdminDashboard from './pages/AdminDashboard';

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public-layout',
  component: PublicLayout,
});

// Public pages
const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: Home,
});

const productsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/products',
  component: Products,
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

// Admin login - standalone (no layout)
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-login',
  component: AdminLogin,
});

// Admin guard route
const adminGuardRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin-guard',
  component: AdminGuard,
});

// Admin layout route (nested under guard)
const adminLayoutRoute = createRoute({
  getParentRoute: () => adminGuardRoute,
  id: 'admin-layout',
  component: AdminLayout,
});

// Admin pages
const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin',
  component: AdminDashboard,
});

const ownerDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/owner-dashboard',
  component: OwnerDashboard,
});

const stockManagementRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/stock',
  component: StockManagement,
});

const salesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/sales',
  component: SalesPage,
});

const revenueRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/revenue',
  component: RevenuePage,
});

const customersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/customers',
  component: CustomerManagement,
});

const enquiriesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/enquiries',
  component: EnquiryManagement,
});

const incomeRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/income',
  component: IncomePage,
});

const trendingRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/trending',
  component: TrendingPage,
});

const productsAdminRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/products',
  component: ProductManagement,
});

const reportsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/reports',
  component: SalesReports,
});

// Route tree
const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    productsRoute,
    aboutRoute,
    contactRoute,
  ]),
  adminLoginRoute,
  adminGuardRoute.addChildren([
    adminLayoutRoute.addChildren([
      adminDashboardRoute,
      ownerDashboardRoute,
      stockManagementRoute,
      salesRoute,
      revenueRoute,
      customersRoute,
      enquiriesRoute,
      incomeRoute,
      trendingRoute,
      productsAdminRoute,
      reportsRoute,
    ]),
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
