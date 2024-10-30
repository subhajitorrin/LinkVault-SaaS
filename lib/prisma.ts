import { PrismaClient } from "@prisma/client";

// Singleton pattern for PrismaClient
const prismaClientSingleton = () => {
    return new PrismaClient();
};

// Type assertion for global object to avoid TypeScript errors
const globalForPrisma = globalThis as typeof globalThis & { prisma?: PrismaClient };

// Use existing instance in global scope, or create a new one
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Prevent multiple instances of PrismaClient in development
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
