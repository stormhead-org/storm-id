"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/components/ui/button";
import { Card, CardContent } from "@/src/shared/components/ui/card";

export default function LogoutPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(true);

  useEffect(() => {
    const doLogout = async () => {
      try {
        await fetch("/api/kratos/logout", { method: "POST" });
      } catch {
        // ignore
      } finally {
        setLoggingOut(false);
      }
    };
    doLogout();
  }, []);

  if (loggingOut) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Logging out...</h1>
            <p className="text-muted-foreground">Please wait while we sign you out.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">You have been logged out</h1>
          <p className="text-muted-foreground mb-6">Your session has been terminated.</p>
          <Button onClick={() => router.push("/login")} className="w-full">
            Sign in again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
