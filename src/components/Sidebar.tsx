// 'use client';

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import { createTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import GroupIcon from '@mui/icons-material/Group';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { useDemoRouter } from '@toolpad/core/internal';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import Image from 'next/image';
// import { auth, signOut } from '@/firebase/FirebaseConfig';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';


// interface DemoPageContentProps {
//   pathname: string;
// }

// const NAVIGATION = [
//   {
//     segment: 'dashboard',
//     title: 'Dashboard',
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: 'products',
//     title: 'Products',
//     icon: <AddBoxIcon />,
//   },
//   {
//     segment: 'banner',
//     title: 'Banner',
//     icon: <AddBoxIcon />,
//   },
//   {
//     segment: 'orders',
//     title: 'Orders',
//     icon: <ShoppingCartIcon />,
//   },
//   {
//     segment: 'users',
//     title: 'Users',
//     icon: <GroupIcon />,
//   },
//   {
//     segment: 'signOut',
//     title: 'SignOut',
//     icon: <ExitToAppIcon />,
//   },
// ];

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function DemoPageContent({ pathname }: DemoPageContentProps) {
//   const router = useRouter();

//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         router.push('/auth');
//         toast.success('Signed out successfully!');
//       })
//       .catch(() => {
//         toast.error('An error occurred while signing out');
//       });
//   };

//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       {/* <Typography>
//         {pathname === '/products' ? (
//           <AddProducts />
//         ) : pathname === '/orders' ? (
//           <OrderManagement />
//         ) : pathname === '/users' ? (
//           <UserManagement />
//         ) : pathname === '/dashboard' ? (
//           <AdminDashboard />
//         ) : pathname === '/banner' ? (
//           <BannerManager />
//         ) : pathname === '/signOut' ? (
//           handleSignOut()
//         ) : (
//           pathname
//         )}
//       </Typography> */}
//     </Box>
//   );
// }

// function Sidebar(props: { window?: () => Window }) {
//   const { window } = props;
//   const router = useDemoRouter('/dashboard');
//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     <AppProvider
//       navigation={NAVIGATION}
//       branding={{
//         logo: (
//           <Image
//             src="/assets/imgs/logo1.png"
//             priority
//             alt="Rani Collection"
//             height={100}
//             width={130}
//           />
//         ),
//         title: '',
//       }}
//       router={router}
//       theme={demoTheme}
//       window={demoWindow}
//     >
//       <DashboardLayout>
//         <DemoPageContent pathname={router.pathname} />
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// Sidebar.propTypes = {
//   window: PropTypes.func,
// };

// export default Sidebar;
