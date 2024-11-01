import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({ where: { id: userId } });
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}