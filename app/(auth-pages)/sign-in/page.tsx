import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md bg-black/90 border-2 border-red-900 rounded-2xl shadow-2xl shadow-red-900/50 p-8 relative overflow-hidden">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/10 to-black opacity-50 pointer-events-none z-0"></div>
        
        <form className="relative z-10 flex flex-col space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-200 mb-2 tracking-wide">
              Sign In
            </h1>
            <p className="text-red-400 text-sm">
              Don't have an account?{" "}
              <Link 
                className="text-red-300 font-medium underline hover:text-red-200 transition-colors" 
                href="/sign-up"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label 
                htmlFor="email" 
                className="block text-red-300 mb-2"
              >
                Email
              </Label>
              <Input 
                name="email" 
                placeholder="you@example.com" 
                required 
                className="bg-black/40 border border-red-900/50 text-red-100 placeholder-red-500/50 focus:border-red-700 focus:ring focus:ring-red-900/30 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label 
                  htmlFor="password" 
                  className="text-red-300"
                >
                  Password
                </Label>
                <Link
                  className="text-xs text-red-400 underline hover:text-red-300 transition-colors"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                required
                className="bg-black/40 border border-red-900/50 text-red-100 placeholder-red-500/50 focus:border-red-700 focus:ring focus:ring-red-900/30 transition-all"
              />
            </div>

            <SubmitButton 
              pendingText="Signing In..." 
              formAction={signInAction}
              className="w-full bg-red-900/30 text-red-200 hover:bg-red-900/50 border border-red-800 rounded-full py-3 transition-colors"
            >
              Sign in
            </SubmitButton>

            <FormMessage 
              message={searchParams} 
            />
          </div>
        </form>

        {/* Decorative Border Effect */}
        <div className="absolute inset-0 border-4 border-red-900/30 rounded-2xl pointer-events-none z-0"></div>
      </div>
    </div>
  );
}