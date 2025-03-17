const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    // Validate required fields
    if (!to || !subject || !text) {
        return res.status(400).json({ error: "All fields (to, subject, text) are required." });
    }

    try {
        // Configure the email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Define email options
        const mailOptions = {
            from: `"My App" <${process.env.EMAIL_USER}>`, // Adds a name to avoid spam filters
            to,
            subject,
            text
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!", info });

    } catch (error) {
        console.error("Error sending email:", error);

        // Handle specific Nodemailer errors
        if (error.response) {
            return res.status(500).json({ error: `SMTP Error: ${error.response}` });
        }
        res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
});

module.exports = router;
