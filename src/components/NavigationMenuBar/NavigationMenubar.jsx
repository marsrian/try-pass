"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const menuItems = [
  {
    icon: "",
    title: "Login",
    linkUrl: "/login",
    description: "",
  },
  {
    icon: "",
    title: "Register",
    linkUrl: "/register",
    description: "",
  },
];

const NavigationMenubar = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-slate-600 w-full">
      <div className="flex justify-between items-center gap-5 max-w-screen-2xl px-7 md:px-10 mx-auto py-3 text-white">
        <Link href={"/"}>Try Pass</Link>
        <div className="flex items-center gap-2 uppercase">
          {!session ? (
            menuItems.map((item, index) => (
              <Link href={item?.linkUrl} key={index}>
                <div className="flex items-center gap-2">{item.title}</div>
              </Link>
            ))
          ) : (
            <button
              onClick={() => {
                signOut();
              }}
            >
              LogOut
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationMenubar;
