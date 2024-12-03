import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { button } = req.body;
    
    // Log incoming request for debugging purposes
    console.log('Received request with button:', button);

    try {
      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password
        },
      });

      // Log the transporter details to make sure the credentials are loaded
      console.log('Nodemailer transporter created with user:', process.env.EMAIL_USER);

      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        subject: `Button Clicked: ${button}`,
        text: `The user clicked: ${button}`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // If successful, send a response back to the client
      res.status(200).json({ message: `Email sent successfully for ${button}` });
    } catch (error) {
      // Log error message
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
