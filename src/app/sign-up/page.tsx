import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";

function SignUpPage() {
  return (
    <div className="w-[500px] flex flex-1 flex-col justify-content-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-4">
          <CardTitle className="text-center custom-large-text  mt-[25px] mb[10px]">SignUp</CardTitle>
        </CardHeader>
        <AuthForm type="signUp" />
      </Card>
    </div>
  );
}

export default SignUpPage;
