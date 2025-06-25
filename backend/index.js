/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Gmail config (use App Password, NOT your main password!)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "",
        pass: ""
    }
});

exports.sendContactEmail = functions.firestore
    .document("contactMessages/{docId}")
    .onCreate(async (snap, context) => {
        const data = snap.data();

        const mailOptions = {
            from: `"Portfolio Contact" <${data.email}>`,
            to: "",//insert your work email
            subject: `New Contact Form Submission: ${data.subject}`,
            text: `
Name: ${data.firstname} ${data.lastname}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
      `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully!");
        } catch (error) {
            console.error("Error sending email:", error);
        }
    });
