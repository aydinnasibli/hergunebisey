"use server"

import { z } from "zod";
import mongoose, { Schema, model, Model, models, } from "mongoose";

// Environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Define the Zod schema for validation
const NewsletterSubscriberSchema = z.object({
    email: z
        .string()
        .email("Geçerli bir e-posta adresi giriniz.")
        .min(5, "E-posta adresi çok kısa.")
        .max(255, "E-posta adresi çok uzun."),
});


// Define the Mongoose schema
const subscriberSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    subscriptionDate: {
        type: Date,
        default: Date.now,
    },

});

// Type for successful and error responses
type ActionResponse = {
    success: boolean;
    message: string;
};

// Connect to MongoDB
const connectToDatabase = async (): Promise<void> => {
    try {
        if (!MONGODB_URI) {
            throw new Error(
                "MongoDB URI bulunamadı. Lütfen .env dosyanızı kontrol edin."
            );
        }

        if (mongoose.connection.readyState === 1) {
            // Already connected
            return;
        }

        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB bağlantısı başarılı.");
    } catch (error) {
        console.error("MongoDB bağlantı hatası:", error);
        throw new Error("Veritabanına bağlanılamadı. Lütfen daha sonra tekrar deneyin.");
    }
};

// Get or create the Subscriber model
const getSubscriberModel = (): Model<mongoose.Models> => {
    return models.NewsletterSubscriber ||
        model("NewsletterSubscriber", subscriberSchema);
};

// Server action to handle newsletter subscription
export async function subscribeToNewsletter(
    email: string
): Promise<ActionResponse> {
    try {
        // Validate the email using Zod
        const validationResult = NewsletterSubscriberSchema.safeParse({ email });

        if (!validationResult.success) {
            const errorMessage = validationResult.error.errors
                .map((error) => error.message)
                .join(", ");

            return {
                success: false,
                message: errorMessage,
            };
        }

        // Connect to the database
        await connectToDatabase();

        // Get the subscriber model
        const SubscriberModel = getSubscriberModel();

        // Check if email already exists
        const existingSubscriber = await SubscriberModel.findOne({ email });

        if (existingSubscriber) {
            if (existingSubscriber.isActive) {
                return {
                    success: false,
                    message: "Bu e-posta adresi zaten bültenimize kayıtlı.",
                };
            }
        }

        // Create new subscriber
        await SubscriberModel.create({
            email,
            subscriptionDate: new Date(),
        });

        return {
            success: true,
            message: "Bültenimize başarıyla abone oldunuz!",
        };
    } catch (error) {
        console.error("Newsletter subscription error:", error);


        return {
            success: false,
            message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        };
    }
}
