import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Link } from "next/link";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pendingVerify, setPendingVerify] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [error, seterror] = useState("");
  const [togglePass, setTogglePass] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div>
      Signup <Button variant={"outline"}>Click me</Button>
    </div>
  );
};

export default Signup;
