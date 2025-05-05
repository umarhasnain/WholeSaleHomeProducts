'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import AddProduct from '@/app/dashboard/addProduct/page';
import OrderManagement from '@/app/dashboard/orders/page';
import QuoteRequests from '@/app/dashboard/quotes/page';
import { BsChatLeftQuoteFill } from "react-icons/bs";
import { FaFirstOrderAlt } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { auth, signOut } from '@/firebase/FirebaseConfig.js';
import { useRouter } from 'next/navigation'; // ✅ using app router
import toast from 'react-hot-toast';

const NAVIGATION: Navigation = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'products', title: 'Products', icon: <ShoppingCartIcon /> },
  { segment: 'orders', title: 'Orders', icon: <FaFirstOrderAlt /> },
  { segment: 'quoteRequests', title: 'QuoteRequests', icon: <BsChatLeftQuoteFill /> },
  { segment: 'signOut', title: 'SignOut', icon: <MdLogout /> },
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  const router = useRouter();

  React.useEffect(() => {
    if (pathname === '/signOut') {
      signOut(auth)
        .then(() => {
          toast.success("Signed out successfully!");
          router.push("/login");
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred while signing out.");
        });
    }
  }, [pathname, router]);

  const renderComponent = () => {
    switch (pathname) {
      case "/products":
        return <AddProduct />;
      case "/orders":
        return <OrderManagement />;
      case "/users":
      case "/dashboard":
        return <AddProduct />;
      case "/quoteRequests":
        return <QuoteRequests />;
      default:
        return <Typography>Page Not Found</Typography>;
    }
  };

  // Don't show anything on /signOut while sign-out is processing
  if (pathname === '/signOut') return null;

  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      {renderComponent()}
    </Box>
  );
}

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBranding(props: DemoProps) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{ title: 'WholeSaleHomeProducts', homeUrl: '/' }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
