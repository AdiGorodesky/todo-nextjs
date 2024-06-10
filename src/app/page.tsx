import { Button } from "../components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import LoginButton from "../components/auth/LoginButton";

const font = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100",
        font.className
      )}
    >
      <h1 className="mb-8 text-4xl">Login to my App</h1>
      <LoginButton>
        <Button>Sign In</Button>
      </LoginButton>
    </main>
  );
}
