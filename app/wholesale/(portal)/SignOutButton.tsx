"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/browser";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/wholesale/login");
    router.refresh();
  }

  return (
    <Button variant="ghost" size="sm" className="cursor-pointer" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
