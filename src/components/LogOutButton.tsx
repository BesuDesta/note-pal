"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";

function LogOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction("user@example.com", "someOtherArgument"); // Call the logOutAction with required arguments

    if (!errorMessage) {
      toast.success("Logged out", {
        description: "You have successfully logged out",
      });
      router.push("/"); // Redirect to the home page after logout
    } else {
      toast.error("Something went wrong while logging out");
    } 
    setLoading(false);
    
  }


  return(
      <Button 
      disabled={loading}
      onClick={handleLogOut}
      variant="outline"
      className="w-24">
        {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
      </Button>
  ); 
  
}

export default LogOutButton;
