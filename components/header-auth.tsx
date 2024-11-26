import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center">
        <div>
          <Badge
            variant="default"
            className="bg-red-900/30 text-red-300 border border-red-800 font-normal"
          >
            Please update .env.local file with anon key and url
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            disabled
            className="bg-neutral-800 text-neutral-500 border-neutral-700 opacity-50 cursor-not-allowed"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="default"
            disabled
            className="bg-red-900/30 text-red-300 border-red-800 opacity-50 cursor-not-allowed"
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-neutral-400">
        Hey, <span className="text-white">{user.email}</span>!
      </span>
      <form action={signOutAction}>
        <Button 
          type="submit" 
          variant="outline"
          className="bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:text-white transition-colors duration-300"
        >
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button 
        asChild 
        size="sm" 
        variant="outline"
        className="bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:text-white transition-colors duration-300"
      >
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button 
        asChild 
        size="sm" 
        variant="default"
        className="bg-red-800 text-white hover:bg-red-700 transition-colors duration-300"
      >
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}