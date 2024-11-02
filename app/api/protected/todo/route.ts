import { GetGeminiResult } from "@/lib/gemini";
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

        if (!payload.url || !isValidUrl(payload.url)) {
            return NextResponse.json({ message: "Invalid URL format." }, { status: 400 });
        }

        const prompt = `Please extract the metadata from the following URL: ${payload.url} and provide the results in JSON format. The JSON object should include the following fields:title: a complete string representing the title of the page what topic is the url is about. platform: a string indicating the platform (e.g., GitHub, YouTube, Instagram, NeonDB, etc.).keywords: an array of up to 5 strings representing relevant tags or keywords.Ensure that the data is structured clearly in the JSON format just give the result with in {title:"",platform:"",keywords:["first","second"]} don't write any other thing except the {}. If you are unable to fetch the title then provide the topic in which the url is based.`
        const result: string = await GetGeminiResult(prompt)
        const resultJson: {
            title: string;
            platform: string;
            keywords: string[];
        } = JSON.parse(result)

        const metadata: {
            title: string;
            platform: string;
            tags: string[];
        } = {
            title: payload.title || resultJson.title || "Unknown",
            platform: resultJson.platform,
            tags: resultJson.keywords
        };

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
                title: metadata.title,
                link: payload.url,
                platform: metadata.platform,
                tags: metadata.tags || [],
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