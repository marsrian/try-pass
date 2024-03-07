"use client";

import React from "react";
import { CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  register("name", { required: "Name is required" });
  register("email", {
    required: "Email address is required",
  });
  register("password", {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,16})/,
      message:
        "Password must contain at least one number, one uppercase letter, one lowercase letter, and at least 6 to 16 characters",
    },
  });

  const handleSubmitForm = async (data) => {
    const toastLoading = toast.loading('processing...');
    try {
      const response = await axios.post("/api/users/register", data);
      console.log("response:", response);
      toast.success('User registration successfully created!');
    } catch (error) {
      toast.error('Failed!', error?.message);
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="text">Name</Label>
            <Input
              id="text"
              type="name"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors?.name && (
              <p className="text-red-500 text-xs">{errors?.name?.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-red-500 text-xs">{errors?.email?.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-red-500 text-xs">
                {errors?.password?.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Create account
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

export default RegistrationForm;
