'use client'

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { loginAction, signUpAction } from "@/actions/users";

type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {

  const isLoginForm = type === "login";

  
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;
      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Logged in"
        description = "You have been successfully logged in";
      } else {
        errorMessage = (await signUpAction(email, password)).errorMessage;
        title = "Signed up"
        description = "Check your email for verification";
      }

    
    if(!errorMessage) {
      toast.success("Form submitted successfully!", {
        description: "Check your email for further instructions.",
      });
      router.push("/"); // Redirect to the home page after successful login/signup
    } else {
      toast.error("Something went wrong")
    }
  })

  };

  return (
    <form action={handleSubmit} className=" w-[300px] m-[10px] mx-auto bg-white shadow-md rounded-lg p-6 mt-4">
      <CardContent className="grid items-center gap-6">
        <div className="flex flex-col space-y-2 m-[10px]">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
          <Input 
          id="email" 
          name="email" 
          placeholder="Enter your email"
          type="email"
          required
          disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-2 m-[10px]">
          <Label htmlFor="password">Password</Label>
          <Input 
          id="password" 
          name="password" 
          placeholder="Enter your password" // Placeholder for password input
          type="password" // Use password type for security
          required
          disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-1/3 mt-[10px] h-[30px]">
          {isPending ? <Loader2 className="animate-spin" /> : isLoginForm ? "Login" : "Sign Up"}
        </Button>
        <p className="text-xs">
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link 
            href={isLoginForm ? "/signup" : "/login"}
            className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" :
            ""}`}>
             {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  )
}

export default AuthForm;