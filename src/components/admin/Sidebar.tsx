

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


const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <FaFirstOrderAlt/>
  },
  {
    segment: 'quoteRequests',
    title: 'QuoteRequests',
    icon: <BsChatLeftQuoteFill/>
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
       <Typography>
      {pathname === "/products" ? (

    <AddProduct /> 
  ) : pathname === "/orders" ? (
    <OrderManagement/>
  ) : pathname === "/users" ? (
    <AddProduct/>
  ) : pathname === "/dashboard" ? (
    <AddProduct/>
  ) : pathname === "/quoteRequests" ? (
    <QuoteRequests />
  ) : pathname === "/signOut" ? <AddProduct/> : (
    pathname
  ) }
</Typography>
    </Box>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutBranding(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        // logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'WholeSaleHomeProducts',
        homeUrl: '/',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}