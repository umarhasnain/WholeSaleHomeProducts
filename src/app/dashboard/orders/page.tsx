"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/FirebaseConfig";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OrderType {
  id: string;
  customerName: string;
  customerEmail: string;
  products: { name: string; quantity: number; price: number }[];
  totalPrice: number;
  createdAt: string;
  status: string;
  notes?: string;
}

const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const OrderManagement = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as OrderType[];
      setOrders(list);
    });
    return unsub;
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "orders", id));
    toast.success("Order deleted");
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;
    await updateDoc(doc(db, "orders", selectedOrder.id), { status });
    toast.success("Status updated");
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      order.id.includes(search)
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>

      <TextField
        label="Search by Name, Email or Order ID"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.customerEmail}</TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), "dd MMM yyyy")}
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={
                      order.status === "Delivered"
                        ? "success"
                        : order.status === "Cancelled"
                        ? "error"
                        : "warning"
                    }
                  />
                </TableCell>
                <TableCell>PKR {order.totalPrice}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedOrder(order);
                      setStatus(order.status);
                    }}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Customer:
              </Typography>
              <Typography variant="body2">
                {selectedOrder.customerName}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Email:
              </Typography>
              <Typography variant="body2">
                {selectedOrder.customerEmail}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Total:
              </Typography>
              <Typography variant="body2">
                PKR {selectedOrder.totalPrice}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Notes:
              </Typography>
              <Typography variant="body2">
                {selectedOrder.notes || "N/A"}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>
                Products:
              </Typography>
              {selectedOrder.products.map((p, idx) => (
                <Typography key={idx} variant="body2" sx={{ ml: 2 }}>
                  • {p.name} (x{p.quantity}) - PKR {p.price * p.quantity}
                </Typography>
              ))}

              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption} value={statusOption}>
                      {statusOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedOrder(null)}>Close</Button>
          <Button variant="contained" onClick={handleStatusUpdate}>
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderManagement;
