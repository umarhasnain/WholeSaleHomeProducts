// // functions/src/index.ts

// import * as functions from "firebase-functions";
// import * as nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.zoho.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "info@wholesalehomeproducts.com",
//     pass: "your_app_password", // Use env var in real app
//   },
// });

// export const sendOrderConfirmation = functions.https.onCall(
//   async (
//     data: { name: string; email: string; orderId: string; total: number },
//     context: any
//   ) => {
//     const { name, email, orderId, total } = data;

//     const mailOptions = {
//       from: '"Wholesale Home Products" <info@wholesalehomeproducts.com>',
//       to: email,
//       subject: `Order Confirmation - ${orderId}`,
//       html: `
//         <h2>Hi ${name},</h2>
//         <p>Thank you for your order <strong>${orderId}</strong>.</p>
//         <p>Total: Rs. ${total}</p>
//         <br/>
//         <p>Regards,<br/>Wholesale Home Products</p>
//       `,
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       return { success: true };
//     } catch (error) {
//       console.error("Failed to send email:", error);
//       throw new functions.https.HttpsError("internal", "Email send failed");
//     }
//   }
// );
