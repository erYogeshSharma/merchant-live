"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const EmailVerify = () => {
  const router = useRouter();
  const { toast } = useToast();
  const email = localStorage.getItem("email-to-verify");

  async function checkVerifyStatus() {
    const res = await fetch("/api/register/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    });
    if (res.ok) {
      if (email) {
        return true;
      }
    } else {
      return false;
    }
  }
  useEffect(() => {
    const interval = setInterval(async () => {
      const isVerified = await checkVerifyStatus();
      if (isVerified) {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
        router.push("/meetings/1234");
      }
      // Check email status API endpoint
    }, 2000);
    // Cleanup function to clear interval
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run effect only once on component mount

  return (
    <div className="container mx-auto min-h-screen place-content-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up Successful</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Please check your email and click on the link to verify your email
            address.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerify;
