import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', "/"])
const isProtectedRoute = createRouteMatcher(['/home(.*)'])

export default clerkMiddleware(async (auth, request) => {
  console.log("----------------------------------------");
  const { userId } = await auth()
  console.log(userId);

  if (!isProtectedRoute(request) && userId) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  if (isProtectedRoute(request) && !userId) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!isProtectedRoute(request) && !isPublicRoute(request)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}