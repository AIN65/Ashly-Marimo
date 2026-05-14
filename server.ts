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
    const { email, gamertag } = req.body;
    
    if (!email || !gamertag) {
      res.status(400).json({ status: "error", message: "Email and gamertag required." });
      return;
    }

    if (!transporter) {
       res.status(503).json({ status: "error", message: "Email transporter not ready yet." });
       return;
    }

    try {
      const info = await transporter.sendMail({
        from: '"Star Strick" <no-reply@starstrick.app>',
        to: email,
        subject: "Welcome to the Star Strick Circuit, " + gamertag + "!",
        text: `Hi ${gamertag},\n\nWelcome to the Star Strick Circuit. Your journey to the top of the global leaderboard begins now.\n\nBest,\nThe Star Strick Team`,
        html: `<div style="font-family: sans-serif; max-width: 600px; margin: auto; background-color: #05050A; color: #fff; padding: 40px;">
                <h1 style="color: #00bcd4;">Welcome to Star Strick!</h1>
                <p>Hi <b>${gamertag}</b>,</p>
                <p>Welcome to the Star Strick Circuit. Your journey to the top of the global leaderboard begins now.</p>
                <br />
                <p>Best regards,</p>
                <p><b>The Star Strick Team</b></p>
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
