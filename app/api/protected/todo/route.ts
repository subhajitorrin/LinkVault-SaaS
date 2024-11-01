import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

function isValidUrl(url: string): boolean {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

export async function POST(req: Request) {
    try {
        // Authenticate the user
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
        }

        // Parse the request payload
        const payload = await req.json();

        // Basic input validation
        if (!payload.title || typeof payload.title !== 'string' || payload.title.trim().length === 0) {
            return NextResponse.json({ message: "Title is required and must be a non-empty string." }, { status: 400 });
        }
        if (!payload.url || !isValidUrl(payload.url)) {
            return NextResponse.json({ message: "Invalid URL format." }, { status: 400 });
        }

        // Fetch the user from the database
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return NextResponse.json({ message: "User not found!" }, { status: 404 });
        }

        if (user.credit < 1) {
            return NextResponse.json({ message: "Insufficient credits!" }, { status: 403 });
        }

        // Create a new todo item in the database
        const newTodo = await prisma.todo.create({
            data: {
                title: payload.title,
                link: payload.url,
                tags: payload.tags || [],
                user: { connect: { id: userId } },
            },
        });

        await prisma.user.update({
            where: { id: userId },
            data: {
                credit: {
                    decrement: 1,
                },
                todo: {
                    connect: { id: newTodo.id },
                },
            },
        });

        return NextResponse.json({ message: "Todo created successfully!", todo: newTodo }, { status: 201 });
    } catch (error) {
        // Log unexpected errors
        console.error("Unexpected error:", error);

        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
        }
        const todos = await prisma.todo.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json({ todos }, { status: 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}