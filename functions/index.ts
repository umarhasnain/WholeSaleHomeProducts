// import * as functions from "firebase-functions";
// import * as nodemailer from "nodemailer";

// interface OrderData {
//   name: string;
//   email: string;
//   orderId: string;
//   total: number;
// }

// const transporter = nodemailer.createTransport({
//   host: "smtp.zoho.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "info@wholesalehomeproducts.com",
//     pass: process.env.ZOHO_SMTP_PASS,
//   },
// });

// export const sendOrderConfirmation = functions.https.onCall(
//   async (request: functions.https.CallableRequest<OrderData>) => {
//     const { name, email, orderId, total } = request.data;

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
//       console.error("Email failed:", error);
//       throw new functions.https.HttpsError("internal", "Email sending failed");
//     }
//   }
// );



// functions/src/index.ts

import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import cors from "cors";


const corsHandler = cors({ origin: true }); 

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@wholesalehomeproducts.com",
    pass: process.env.ZOHO_SMTP_PASS,
  },
});

export const sendOrderConfirmation = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { name, email, orderId, total } = req.body;

    const mailOptions = {
      from: '"Wholesale Home Products" <info@wholesalehomeproducts.com>',
      to: email,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for your order <strong>${orderId}</strong>.</p>
        <p>Total: Rs. ${total}</p>
        <br/>
        <p>Regards,<br/>Wholesale Home Products</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).send({ success: true });
    } catch (error) {
      console.error("Email send failed:", error);
      return res.status(500).send({ success: false, error: error });
    }
  });
});
