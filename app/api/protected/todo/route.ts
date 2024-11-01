import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const payload = await req.json();
    console.log(payload);
    return new Response("OK", { status: 200 });
}
export async function GET(req: Request) {
    return new Response("OK", { status: 200 });
}