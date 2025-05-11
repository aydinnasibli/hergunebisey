'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

// Form validation schema with Zod
const FormSchema = z.object({
    name: z.string().min(2, { message: 'Name is required' }),
    email: z.string().email({ message: 'Valid email is required' }),
    subject: z.string().min(2, { message: 'Subject is required' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});




// Nodemailer setup with Gmail
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

export async function submitContactForm(formData: FormData) {
    'use server';

    console.log("📩 Received form data");

    try {
        // Extract form data
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        // Validate inputs manually (similar to your Express code)
        if (!name) {
            return { success: false, error: "Name is required" };
        }
        if (!email) {
            return { success: false, error: "Email is required" };
        }
        if (!subject) {
            return { success: false, error: "Subject is required" };
        }
        if (!message) {
            return { success: false, error: "Message is required" };
        }

        // Also use Zod for more comprehensive validation
        const validatedFields = FormSchema.safeParse({
            name,
            email,
            subject,
            message
        });

        if (!validatedFields.success) {
            console.log("❌ Validation failed:", validatedFields.error);
            return {
                success: false,
                error: 'Form validation failed. Please check your inputs.'
            };
        }

        // Create transporter
        const transporter = createTransporter();
        console.log("✅ Email transporter created");

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || 'your-recipient@example.com',
            subject: `New Contact Form: ${subject}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        };

        console.log("📩 Sending email...");
        await transporter.sendMail(mailOptions);
        console.log("✅ Email Sent!");

        return {
            success: true,
            message: "Form submitted successfully"
        };

    } catch (error) {
        console.error("❌ Error submitting form:", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again later."
        };
    }
}