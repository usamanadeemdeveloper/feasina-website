"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { createClient } from "@/lib/supabase/browser";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

type LoginValues = z.infer<typeof loginSchema>;

// Reached via middleware.ts/app/wholesale/(portal)/layout.tsx's redirect
// when a valid session has no linked clients row -- same case this form
// already blocks inline on submit below, just surfaced here for whoever
// lands on this URL directly (e.g. a stale session hitting a portal page).
const NO_CLIENT_ERROR = "This account doesn't have wholesale access. Contact the owner for a new invite.";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectError = searchParams.get("error") === "no_client" ? NO_CLIENT_ERROR : null;
  const [error, setError] = useState<string | null>(redirectError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setError(null);
    setIsSubmitting(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword(values);

    if (signInError) {
      setIsSubmitting(false);
      setError("Incorrect email or password.");
      return;
    }

    // The auth account can outlive its wholesale client record (e.g. the
    // client was removed but their login was never revoked) --
    // clients_self_select (0006_rls.sql) already scopes this to just the
    // signed-in user's own row, so an empty result means there's no linked
    // wholesale client, not a permissions issue.
    const { data: client } = await supabase.from("clients").select("id").maybeSingle();
    setIsSubmitting(false);

    if (!client) {
      await supabase.auth.signOut();
      setError("This account doesn't have wholesale access. Contact the owner for a new invite.");
      return;
    }

    router.push("/wholesale");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
