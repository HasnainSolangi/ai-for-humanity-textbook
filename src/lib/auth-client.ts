import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NODE_ENV === 'production'
        ? "https://your-backend-url.com" // Replace with your actual backend URL in production
        : "http://localhost:8000" // Default to local backend
});
