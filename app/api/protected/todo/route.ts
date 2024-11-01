import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const payload = await req.json();
    if (!payload.url) {
        return new Response("Invalid url", { status: 400 });
    }
    try {
        await prisma.todo.create({ link: payload.url, title: payload.title });
        return new Response("Created", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal server error", { status: 400 });
    }
}

