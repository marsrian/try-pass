"use client"

import React from "react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { signIn } from "next-auth/react";

const providers = [
  { providerName: "github", Icon: "" },
  { providerName: "google", Icon: "" },
];

const LoginProvider = () => {
  const handleOAuthSignIn = (provider) => {
    signIn(provider);
  };

  return (
    <div>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          {providers.map((provider) => {
            return (
              <Button
                variant="outline"
                key={provider?.providerName}
                className="capitalize"
                onClick={() => handleOAuthSignIn(provider?.providerName)}
              >
                {provider?.providerName}
              </Button>
            );
          })}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default LoginProvider;
