// // pages/api/sendConfirmationEmail.ts
// import sendGridMail from '@sendgrid/mail';

// // Set SendGrid API key
// sendGridMail.setApiKey(process.env.SENDGRID_API_KEY); // You'll set this in your .env.local file

// const handler = async (req, res) => {
//   if (req.method === 'POST') {
//     const { email, orderDetails } = req.body;

//     const msg = {
//       to: email, // recipient's email
//       from: 'your-email@example.com', // your email
//       subject: 'Order Confirmation',
//       text: `Hello, your order has been placed successfully. Order details: ${orderDetails}`,
//       html: `<p>Hello, your order has been placed successfully.</p><p>Order details: ${orderDetails}</p>`,
//     };

//     try {
//       // Send the email via SendGrid
//       await sendGridMail.send(msg);
//       res.status(200).json({ message: 'Order confirmation email sent!' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// };

// export default handler;
