import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import ProductManagement from './pages/ProductManagement';
import CustomerManagement from './pages/CustomerManagement';
import EnquiryManagement from './pages/EnquiryManagement';
import SalesReports from './pages/SalesReports';
import AdminGuard from './components/AdminGuard';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const customerLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'customer-layout',
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: '/',
  component: Home,
});

const productsRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: '/products',
  component: Products,
});

const aboutRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: '/about',
  component: AboutUs,
});

const contactRoute = createRoute({
  getParentRoute: () => customerLayoutRoute,
  path: '/contact',
  component: Contact,
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
  path: '/admin',
  component: AdminDashboard,
});

const adminProductsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/products',
  component: ProductManagement,
});

const adminCustomersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/customers',
  component: CustomerManagement,
});

const adminEnquiriesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/enquiries',
  component: EnquiryManagement,
});

const adminReportsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/reports',
  component: SalesReports,
});

const routeTree = rootRoute.addChildren([
  customerLayoutRoute.addChildren([homeRoute, productsRoute, aboutRoute, contactRoute]),
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminProductsRoute,
    adminCustomersRoute,
    adminEnquiriesRoute,
    adminReportsRoute,
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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
