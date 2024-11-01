import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
        }
        const { id } = params;
        const todo = await prisma.todo.delete({
            where: { id },
        });
        await prisma.user.update({
            where: { id: userId },
            data: {
                credit: {
                    increment: 1,
                },
            },
        });
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
        }
        const { id } = params;
        const { link, title } = await req.json();
        const todo = await prisma.todo.update({
            where: { id },
            data: {
                link,
                title,
            },
        })
        return NextResponse.json({ message: "Updated successfully", todo }, { status: 200 });
    } catch (error: unknown) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}