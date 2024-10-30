import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Link } from "next/link";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [password, setPassword] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [pendingVerify, setPendingVerify] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [error, seterror] = useState("");
  const [togglePass, setTogglePass] = useState<boolean>(false);
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        emailAddress,
        password
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code"
      });
      setPendingVerify(true);
    } catch (error: any) {
      console.error(error);
      seterror(error.errors[0].message);
    }
  }

  return (
    <div>
      Signup <Button variant={"outline"}>Click me</Button>
    </div>
  );
};

export default Signup;
