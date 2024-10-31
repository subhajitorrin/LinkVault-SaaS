"use client";

// import { useState } from "react";
// import { useSignUp } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff, Mail } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function Component() {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const [password, setPassword] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");
//   const [pendingVerify, setPendingVerify] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!isLoaded) return;

//     try {
//       await signUp.create({
//         emailAddress,
//         password
//       });
//       await signUp.prepareEmailAddressVerification({
//         strategy: "email_code"
//       });
//       setPendingVerify(true);
//     } catch (err: any) {
//       console.error(err);
//       setError(err.errors[0].message);
//     }
//   }

//   async function handleVerify(e: React.FormEvent) {
//     e.preventDefault();
//     if (!isLoaded) return;

//     try {
//       const result = await signUp.attemptEmailAddressVerification({
//         code: otp
//       });

//       if (result.status === "complete") {
//         await setActive({ session: result.createdSessionId });
//         router.push("/dashboard");
//       }
//     } catch (err: any) {
//       console.error(err);
//       setError(err.errors[0].message);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>
//             {pendingVerify ? "Verify Email" : "Create Account"}
//           </CardTitle>
//           <CardDescription>
//             {pendingVerify
//               ? "We've sent a verification code to your email"
//               : "Enter your email and create a password to get started"}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {error && (
//             <div className="mb-4 text-sm text-red-500 bg-red-500/10 rounded-lg p-3">
//               {error}
//             </div>
//           )}
//           {pendingVerify ? (
//             <form onSubmit={handleVerify} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="otp">Verification Code</Label>
//                 <Input
//                   id="otp"
//                   placeholder="Enter verification code"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   required
//                 />
//               </div>
//               <Button onClick={handleVerify} type="submit" className="w-full">
//                 Verify Email
//               </Button>
//             </form>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={emailAddress}
//                     onChange={(e) => setEmailAddress(e.target.value)}
//                     required
//                   />
//                   <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Create a password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                     <span className="sr-only">
//                       {showPassword ? "Hide password" : "Show password"}
//                     </span>
//                   </Button>
//                 </div>
//               </div>
//               <Button type="submit" className="w-full">
//                 Sign Up
//               </Button>
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Component() {
  return (
    <div className=" min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white">LinksVault</h1>
        </div>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="space-y-1">
            <h2 className="text-2xl font-semibold text-white">
              Create a new account
            </h2>
            <p className="text-zinc-400 text-sm">
              Effortlessly organize and categorize your links with AI-driven
              precision. By creating a new account.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Input
                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400"
                placeholder="Email"
                type="email"
              />
              <Input
                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400"
                placeholder="Password"
                type="password"
              />
            </div>

            <Button className="w-full bg-white text-black hover:bg-zinc-200">
              Sign Up with Email
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-400">
                  or continue with
                </span>
              </div>
            </div>
            <Button className="w-full text-white bg-zinc-950 border border-[#1c1c1c]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                className="fill-white"
              >
                <path d="M 32.521484 6 C 18.158484 6 6.515625 17.642 6.515625 32 C 6.515625 46.358 18.158484 58 32.521484 58 C 54.209484 58 59.098453 37.865969 57.064453 27.667969 L 51.181641 27.667969 L 49.269531 27.667969 L 32.515625 27.667969 L 32.515625 36.333984 L 49.279297 36.333984 C 47.351759 43.804816 40.588119 49.332031 32.515625 49.332031 C 22.943625 49.332031 15.181641 41.572 15.181641 32 C 15.181641 22.428 22.943625 14.667969 32.515625 14.667969 C 36.868625 14.667969 40.834906 16.283594 43.878906 18.933594 L 50.033203 12.779297 C 45.410203 8.5672969 39.266484 6 32.521484 6 z"></path>
              </svg>{" "}
              Google
            </Button>
            <p className="text-white text-sm text-center">
              Already have an account ?{" "}
              <Link href="/signin" className="underline">
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="w-full h-3/6 absolute rounded-[50%] radial--blur opacity-20 mx-10 pointer-events-none" />
    </div>
  );
}
