'use client';

import * as React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link as MuiLink,
} from '@mui/material';
import { auth } from '@/firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      // ✅ Redirect based on admin email
      const isAdmin = formData.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      router.push(isAdmin ? '/dashboard' : '/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f0f4f8"
      px={2}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={2}>
          Login
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              Sign In
            </Button>

            <Typography variant="body2" align="center">
              Don&apos;t have an account?{' '}
              <MuiLink
                component="button"
                onClick={() => router.push('/signup')}
                underline="hover"
                sx={{ fontWeight: 600 }}
              >
                Sign up here
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
