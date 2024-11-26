import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <FormMessage 
          message={searchParams} 
        
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md bg-black/90 border-2 border-red-900 rounded-2xl shadow-2xl shadow-red-900/50 p-8 relative overflow-hidden">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/10 to-black opacity-50 pointer-events-none z-0"></div>
        
        <form className="relative z-10 flex flex-col space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-200 mb-2 tracking-wide">
              Create Account
            </h1>
            <p className="text-red-400 text-sm">
              Already have an account?{" "}
              <Link 
                className="text-red-300 font-medium underline hover:text-red-200 transition-colors" 
                href="/sign-in"
              >
                Sign in
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
              <Label 
                htmlFor="password" 
                className="block text-red-300 mb-2"
              >
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Create a strong password"
                minLength={6}
                required
                className="bg-black/40 border border-red-900/50 text-red-100 placeholder-red-500/50 focus:border-red-700 focus:ring focus:ring-red-900/30 transition-all"
              />
              <p className="text-xs text-red-400 mt-2">
                Password must be at least 6 characters long
              </p>
            </div>

            <SubmitButton 
              formAction={signUpAction} 
              pendingText="Signing up..." 
              className="w-full bg-red-900/30 text-red-200 hover:bg-red-900/50 border border-red-800 rounded-full py-3 transition-colors"
            >
              Sign up
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