import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
     
    ],

    callbacks: {
        async signIn({ user, account, profile }: any) {
            const { email } = user;

            let firstName = null;
            let lastName = null;
            if (profile.name) {
                const nameParts = profile.name.split(" ");
                firstName = nameParts[0];
                lastName = nameParts.slice(1).join(" ");
            }

            try {
                // Fetch the existing user by email
                let existingUser = await prisma.users.findUnique({
                    where: { email: email },
                });

                // Check if the user exists and their status
                if (existingUser) {
                    if (existingUser.status === "pending") {
                        // Prevent login if the user status is pending
                    
                        return false;
                    }

                    // Update user if they already exist
                    existingUser = await prisma.users.update({
                        where: { email: email },
                        data: {
                            first_name: firstName || profile.name,
                            last_name: lastName || null,
                            provider: account.provider,
                        },
                    });
                } else {
                    // Create a new user if they do not exist
                    existingUser = await prisma.users.create({
                        data: {
                            email,
                            first_name: firstName || null,
                            last_name: lastName || null,
                            user_type_id: 1, 
                            app_provider: "Google",
                            status: "active", // default status for new users
                        },
                    });
                }

                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET, 
};

export async function GET(req: any, res: any) {
    return await NextAuth(req, res, options);
}

export async function POST(req: any, res: any) {
    return await NextAuth(req, res, options);
}
