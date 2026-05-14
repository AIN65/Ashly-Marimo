import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Set up Nodemailer with Ethereal Email (free, catch-all testing service)
  // Ethereal creates an inbox and we can log the preview URL
  let transporter: nodemailer.Transporter | null = null;
  
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error('Failed to create a testing account. ' + err.message);
      return;
    }
    console.log('Credentials obtained for testing emails, creating transporter...');
    transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
  });

  // API Route: Send Welcome Email
  app.post("/api/welcome", async (req, res) => {
    const { email, fullName, clubName } = req.body;
    
    if (!email || !fullName) {
      res.status(400).json({ status: "error", message: "Email and fullName required." });
      return;
    }

    if (!transporter) {
       res.status(503).json({ status: "error", message: "Email transporter not ready yet." });
       return;
    }

    try {
      const info = await transporter.sendMail({
        from: '"FC Rankings" <no-reply@fcrankings.app>',
        to: email,
        subject: "Welcome to FC Rankings, " + fullName + "!",
        text: `Hi ${fullName},\n\nWelcome to FC Rankings! We're excited to have you represent ${clubName}.\n\nGet ready to jump into the competitive scene.\n\nBest,\nThe FC Rankings Team`,
        html: `<div style="font-family: sans-serif; max-width: 600px; margin: auto;">
                <h1 style="color: #00bcd4;">Welcome to FC Rankings, ${fullName}!</h1>
                <p>We're thrilled to have you join the platform and represent <b>${clubName}</b>.</p>
                <p>You can now log in, update your stats, and track your global placement.</p>
                <br />
                <p>Best regards,</p>
                <p><b>The FC Rankings Team</b></p>
               </div>`
      });

      console.log('Message sent: %s', info.messageId);
      // Ethereal specific, will provide a URL to preview the test email
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Preview URL: %s', previewUrl);

      res.json({ status: "success", previewUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Failed to send email." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
