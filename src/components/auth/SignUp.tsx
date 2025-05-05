'use client';
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  auth,
  storage,
  googleProvider,
} from '@/firebase/FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from 'firebase/auth';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import {
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  companyName: string;
  taxId: string;
  file: File | null;
};

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    companyName: '',
    taxId: '',
    file: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files?.length) {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.file) {
      return Swal.fire({
        icon: 'error',
        title: 'File Missing',
        text: 'Please upload your EIN/Reseller Certificate.',
      });
    }

    try {
      // Register user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Upload file to Firebase Storage
      const fileRef = ref(storage, `resellerCertificates/${user.uid}/${formData.file.name}`);
      await uploadBytes(fileRef, formData.file);
      const fileURL = await getDownloadURL(fileRef);

      // Store user data in Firestore
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
        companyName: formData.companyName,
        taxId: formData.taxId,
        resellerCertificateURL: fileURL,
        createdAt: new Date(),
      });

      // Send Email Verification
      await sendEmailVerification(user);
      toast.success("Registration Successful! Please verify your email before login.");

      // Redirect after email is verified
      const interval = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          toast.success("Email Verified!");
          router.push('/');
        }
      }, 3000);
    } catch (error) {
      // Specify error type as FirebaseError for better error handling
      if (error instanceof Error) {
        toast.error(`${error.message} Registration Failed`);
      } else {
        toast.error("Registration Failed due to an unknown error");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("SignUp Successfully!");
      router.push('/dashboard');
    } catch (error) {
      // Specify error type as FirebaseError for better error handling
      if (error instanceof Error) {
        toast.error(`${error.message} Google Sign-in Failed`);
      } else {
        toast.error("Google Sign-in Failed due to an unknown error");
      }
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      py={4}
      bgcolor="#f0f4f8"
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 800,
          borderRadius: 4,
          background: 'linear-gradient(to right, #ffffff, #f9fbfc)',
        }}
      >
        <Typography variant="h4" fontWeight={600} mb={2} align="center">
          Create Your Account
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Name Fields */}
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
              <TextField name="firstName" label="First Name" fullWidth required value={formData.firstName} onChange={handleChange} />
              <TextField name="lastName" label="Last Name" fullWidth required value={formData.lastName} onChange={handleChange} />
            </Box>

            {/* Email & Password */}
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
              <TextField name="email" label="Email Address" type="email" fullWidth required value={formData.email} onChange={handleChange} />
              <TextField name="password" label="Password" type="password" fullWidth required value={formData.password} onChange={handleChange} />
            </Box>

            {/* Contact & Address */}
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
              <TextField name="phone" label="Phone Number" fullWidth required value={formData.phone} onChange={handleChange} />
              <TextField name="address" label="Address" fullWidth required value={formData.address} onChange={handleChange} />
            </Box>

            {/* City / Zip / Country */}
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
              <TextField name="city" label="City" fullWidth required value={formData.city} onChange={handleChange} />
              <TextField name="zip" label="Zip Code" fullWidth required value={formData.zip} onChange={handleChange} />
              <TextField name="country" label="Country" fullWidth required value={formData.country} onChange={handleChange} />
            </Box>

            {/* Company Name & TAX ID */}
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
              <TextField
                name="companyName"
                label="Company Name"
                fullWidth
                required
                value={formData.companyName}
                onChange={handleChange}
              />
              <TextField
                name="taxId"
                label="TAX ID"
                fullWidth
                required
                value={formData.taxId}
                onChange={handleChange}
              />
            </Box>

            {/* File Upload */}
            <Box>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload EIN / Reseller Certificate
                <input
                  type="file"
                  name="file"
                  hidden
                  onChange={handleChange}
                />
              </Button>
              {formData.file && (
                <Typography mt={1} variant="body2">
                  Selected: {formData.file.name}
                </Typography>
              )}
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                mt: 1,
                fontWeight: 600,
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              Register
            </Button>

            {/* Google Sign-in */}
            <Button
              onClick={handleGoogleSignIn}
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{ py: 1.5, fontWeight: 600 }}
            >
              Sign in with Google
            </Button>

            {/* Already Have Account */}
            <Typography variant="body2" align="center" mt={2}>
              Already have an account?{' '}
              <Button
                variant="text"
                onClick={() => router.push('/login')}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Login here
              </Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
