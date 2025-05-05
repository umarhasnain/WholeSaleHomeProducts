// 'use client'
// import { useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db, storage } from "@/firebase/FirebaseConfig"; 

// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export default function AccountForm() {
//   const [form, setForm] = useState<any>({
//     firstName: "",
//     lastName: "",
//     displayName: "",
//     email: "",
//     companyName: "",
//     customerId: "",
//     phone: "",
//     address: "",
//     taxId: "",
//     taxFormUrl: "",
//     isReseller: false,
//     website: "",
//     keyword: ""
//   });
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const auth = getAuth();
//   const user = auth.currentUser;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (user) {
//         const docRef = doc(db, "users", user.uid);
//         const snap = await getDoc(docRef);
//         if (snap.exists()) {
//           setForm({ ...form, ...snap.data() });
//         }
//       }
//     };
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const target = e.target as HTMLInputElement; 
//     const { name, value, type, checked } = target;
//     setForm((prev: any) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;

//     setLoading(true);
//     let taxFormUrl = form.taxFormUrl;

//     if (file) {
//       const storageRef = ref(storage, `taxForms/${user.uid}`);
//       await uploadBytes(storageRef, file);
//       taxFormUrl = await getDownloadURL(storageRef);
//     }

//     await setDoc(doc(db, "users", user.uid), {
//       ...form,
//       taxFormUrl,
//     });

//     setLoading(false);
//     alert("Profile updated!");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-2">Account details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" className="input p-2" />
//         <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" className="input p-2" />
//         <input name="displayName" value={form.displayName} onChange={handleChange} placeholder="Display name" className="input p-2 col-span-2" />
//         <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input p-2 col-span-2" />
//       </div>

//       <h3 className="font-semibold mt-6">Company Info</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" className="input p-2" />
//         <input name="customerId" value={form.customerId} onChange={handleChange} placeholder="Customer ID" className="input p-2" />
//         <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input p-2" />
//         <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input p-2 col-span-2" />
//         <input name="taxId" value={form.taxId} onChange={handleChange} placeholder="Tax ID" className="input p-2" />
//       </div>

//       <div className="mt-4">
//         <label className="block font-medium mb-1">TAX ID FORM UPLOAD</label>
//         {form.taxFormUrl && <img src={form.taxFormUrl} alt="TAX Form" className="h-24 mb-2" />}
//         <input type="file" onChange={handleFileUpload} className="file-input p-2" />
//       </div>

//       <div className="flex items-center space-x-2 mt-4">
//         <input type="checkbox" name="isReseller" checked={form.isReseller} onChange={handleChange} />
//         <label htmlFor="isReseller">I'm a reseller</label>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <input name="website" value={form.website} onChange={handleChange} placeholder="Website / where did you find us?" className="input p-2" />
//         <input name="keyword" value={form.keyword} onChange={handleChange} placeholder="Please tell us more..." className="input p-2" />
//       </div>

//       <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 mt-6">
//         {loading ? "Saving..." : "Save Changes"}
//       </button>
//     </form>
//   );
// }


// 'use client'
// import { useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db, storage } from "@/firebase/FirebaseConfig";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import Image from "next/image";

// export default function AccountForm() {
//   const [form, setForm] = useState<any>({
//     firstName: "",
//     lastName: "",
//     displayName: "",
//     email: "",
//     companyName: "",
//     customerId: "",
//     phone: "",
//     address: "",
//     taxId: "",
//     taxFormUrl: "",
//     resellerCertificateUrl: "",
//     isReseller: false,
//     website: "",
//     keyword: ""
//   });

//   const [certificateFile, setCertificateFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const auth = getAuth();
//   const user = auth.currentUser;

//   // 🧠 Fetch form data from Firestore
//   useEffect(() => {
//     const fetchData = async () => {
//       if (user) {
//         const docRef = doc(db, "users", user.uid);
//         const snap = await getDoc(docRef);
//         if (snap.exists()) {
//           setForm((prev: any) => ({ ...prev, ...snap.data() }));
//         }
//       }
//     };
//     fetchData();
//   }, [user]);

//   // 📥 Input change handler
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const target = e.target as HTMLInputElement;
//     const { name, value, type, checked } = target;
//     setForm((prev: any) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // 📁 File change handler
//   const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setCertificateFile(e.target.files[0]);
//     }
//   };

//   // 🚀 Submit handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;

//     setLoading(true);
//     let fileUrl = form.taxFormUrl;

//     if (certificateFile) {
//       const fileRef = ref(storage, `certificates/${user.uid}/${certificateFile.name}`);
//       await uploadBytes(fileRef, certificateFile);
//       fileUrl = await getDownloadURL(fileRef);
//     }

//     await setDoc(doc(db, "users", user.uid), {
//       ...form,
//       taxFormUrl: fileUrl,
//       resellerCertificateUrl: fileUrl,
//     });

//     setLoading(false);
//     alert("Profile updated!");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-2">Account details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" className="input p-2" />
//         <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" className="input p-2" />
//         <input name="displayName" value={form.displayName} onChange={handleChange} placeholder="Display name" className="input p-2 col-span-2" />
//         <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input p-2 col-span-2" />
//       </div>

//       <h3 className="font-semibold mt-6">Company Info</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" className="input p-2" />
//         <input name="customerId" value={form.customerId} onChange={handleChange} placeholder="Customer ID" className="input p-2" />
//         <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input p-2" />
//         <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input p-2 col-span-2" />
//         <input name="taxId" value={form.taxId} onChange={handleChange} placeholder="Tax ID" className="input p-2" />
//       </div>

//       <div className="mt-4">
//         <label className="block font-medium mb-1">Upload EIN / Reseller Certificate</label>
//         {form.taxFormUrl && (
//           <Image height={100} width={200} src={form.taxFormUrl} alt="Certificate Preview" className="h-24 mb-2 rounded border" />
//         )}
//         <input type="file" onChange={handleCertificateUpload} className="file-input p-2" />
//       </div>

//       <div className="flex items-center space-x-2 mt-4">
//         <input type="checkbox" name="isReseller" checked={form.isReseller} onChange={handleChange} />
//         <label htmlFor="isReseller">I'm a reseller</label>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <input name="website" value={form.website} onChange={handleChange} placeholder="Website / where did you find us?" className="input p-2" />
//         <input name="keyword" value={form.keyword} onChange={handleChange} placeholder="Please tell us more..." className="input p-2" />
//       </div>

//       <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 mt-6">
//         {loading ? "Saving..." : "Save Changes"}
//       </button>
//     </form>
//   );
// }


// 'use client'

// import { useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db, storage } from "@/firebase/FirebaseConfig";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import Image from "next/image";

// // Defining types for the form
// interface FormState {
//   firstName: string;
//   lastName: string;
//   displayName: string;
//   email: string;
//   companyName: string;
//   customerId: string;
//   phone: string;
//   address: string;
//   taxId: string;
//   taxFormUrl: string;
//   resellerCertificateUrl: string;
//   isReseller: boolean;
//   website: string;
//   keyword: string;
// }

// export default function AccountForm() {
//   const [form, setForm] = useState<FormState>({
//     firstName: "",
//     lastName: "",
//     displayName: "",
//     email: "",
//     companyName: "",
//     customerId: "",
//     phone: "",
//     address: "",
//     taxId: "",
//     taxFormUrl: "",
//     resellerCertificateUrl: "",
//     isReseller: false,
//     website: "",
//     keyword: ""
//   });

//   const [certificateFile, setCertificateFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const auth = getAuth();
//   const user = auth.currentUser;

//   // Fetch form data from Firestore
//   useEffect(() => {
//     const fetchData = async () => {
//       if (user) {
//         const docRef = doc(db, "users", user.uid);
//         const snap = await getDoc(docRef);
//         if (snap.exists()) {
//           setForm((prev) => ({ ...prev, ...snap.data() }));
//         }
//       }
//     };
//     fetchData();
//   }, [user]);

   
//    // 📥 Input change handler
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const target = e.target as HTMLInputElement;
//     const { name, value, type, checked } = target;
//     setForm((prev: any) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // File upload handler
//   const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       setCertificateFile(e.target.files[0]);
//     }
//   };

//   // Submit handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;

//     setLoading(true);
//     let fileUrl = form.taxFormUrl;

//     if (certificateFile) {
//       const fileRef = ref(storage, `certificates/${user.uid}/${certificateFile.name}`);
//       await uploadBytes(fileRef, certificateFile);
//       fileUrl = await getDownloadURL(fileRef);
//     }

//     await setDoc(doc(db, "users", user.uid), {
//       ...form,
//       taxFormUrl: fileUrl,
//       resellerCertificateUrl: fileUrl
//     });

//     setLoading(false);
//     alert("Profile updated!");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4 bg-white rounded shadow">
//       <h2 className="text-xl font-bold mb-2">Account details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           name="firstName"
//           value={form.firstName}
//           onChange={handleChange}
//           placeholder="First name"
//           className="input p-2"
//         />
//         <input
//           name="lastName"
//           value={form.lastName}
//           onChange={handleChange}
//           placeholder="Last name"
//           className="input p-2"
//         />
//         <input
//           name="displayName"
//           value={form.displayName}
//           onChange={handleChange}
//           placeholder="Display name"
//           className="input p-2 col-span-2"
//         />
//         <input
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="input p-2 col-span-2"
//         />
//       </div>

//       <h3 className="font-semibold mt-6">Company Info</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           name="companyName"
//           value={form.companyName}
//           onChange={handleChange}
//           placeholder="Company Name"
//           className="input p-2"
//         />
//         <input
//           name="customerId"
//           value={form.customerId}
//           onChange={handleChange}
//           placeholder="Customer ID"
//           className="input p-2"
//         />
//         <input
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//           placeholder="Phone Number"
//           className="input p-2"
//         />
//         <input
//           name="address"
//           value={form.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="input p-2 col-span-2"
//         />
//         <input
//           name="taxId"
//           value={form.taxId}
//           onChange={handleChange}
//           placeholder="Tax ID"
//           className="input p-2"
//         />
//       </div>

//       <div className="mt-4">
//         <label className="block font-medium mb-1">Upload EIN / Reseller Certificate</label>
//         {form.taxFormUrl && (
//           <Image
//             height={100}
//             width={200}
//             src={form.taxFormUrl}
//             alt="Certificate Preview"
//             className="h-24 mb-2 rounded border"
//           />
//         )}
//         <input type="file" onChange={handleCertificateUpload} className="file-input p-2" />
//       </div>

//       <div className="flex items-center space-x-2 mt-4">
//         <input
//           type="checkbox"
//           name="isReseller"
//           checked={form.isReseller}
//           onChange={handleChange}
//         />
//         <label htmlFor="isReseller">I'm a reseller</label>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <input
//           name="website"
//           value={form.website}
//           onChange={handleChange}
//           placeholder="Website / where did you find us?"
//           className="input p-2"
//         />
//         <input
//           name="keyword"
//           value={form.keyword}
//           onChange={handleChange}
//           placeholder="Please tell us more..."
//           className="input p-2"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 mt-6"
//       >
//         {loading ? "Saving..." : "Save Changes"}
//       </button>
//     </form>
//   );
// }



'use client';

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

// Type for form state
interface FormState {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  companyName: string;
  customerId: string;
  phone: string;
  address: string;
  taxId: string;
  taxFormUrl: string;
  resellerCertificateUrl: string;
  isReseller: boolean;
  website: string;
  keyword: string;
}

export default function AccountForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    companyName: "",
    customerId: "",
    phone: "",
    address: "",
    taxId: "",
    taxFormUrl: "",
    resellerCertificateUrl: "",
    isReseller: false,
    website: "",
    keyword: ""
  });

  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setForm((prev) => ({ ...prev, ...(snap.data() as Partial<FormState>) }));
        }
      }
    };
    fetchData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCertificateFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    let fileUrl = form.taxFormUrl;

    if (certificateFile) {
      const fileRef = ref(storage, `certificates/${user.uid}/${certificateFile.name}`);
      await uploadBytes(fileRef, certificateFile);
      fileUrl = await getDownloadURL(fileRef);
    }

    await setDoc(doc(db, "users", user.uid), {
      ...form,
      taxFormUrl: fileUrl,
      resellerCertificateUrl: fileUrl
    });

    setLoading(false);
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Account details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" className="input p-2" />
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" className="input p-2" />
        <input name="displayName" value={form.displayName} onChange={handleChange} placeholder="Display name" className="input p-2 col-span-2" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input p-2 col-span-2" />
      </div>

      <h3 className="font-semibold mt-6">Company Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" className="input p-2" />
        <input name="customerId" value={form.customerId} onChange={handleChange} placeholder="Customer ID" className="input p-2" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input p-2" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input p-2 col-span-2" />
        <input name="taxId" value={form.taxId} onChange={handleChange} placeholder="Tax ID" className="input p-2" />
      </div>

      <div className="mt-4">
        <label className="block font-medium mb-1">Upload EIN / Reseller Certificate</label>
        {form.taxFormUrl && (
          <Image height={100} width={200} src={form.taxFormUrl} alt="Certificate Preview" className="h-24 mb-2 rounded border" />
        )}
        <input type="file" onChange={handleCertificateUpload} className="file-input p-2" />
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <input type="checkbox" name="isReseller" checked={form.isReseller} onChange={handleChange} />
        <label htmlFor="isReseller">I&apos;m a reseller</label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input name="website" value={form.website} onChange={handleChange} placeholder="Website / where did you find us?" className="input p-2" />
        <input name="keyword" value={form.keyword} onChange={handleChange} placeholder="Please tell us more..." className="input p-2" />
      </div>

      <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 mt-6">
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
