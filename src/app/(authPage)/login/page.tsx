/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/api/authApi/authApi";
import { addAuthData } from "@/redux/features/auth/auth";

//import { toast } from "sonner";
import { BaseForm } from "@/components/ShadCN_Form/BaseForm";
import { FormInput } from "@/components/ShadCN_Form/FormInput";
import Image from "next/image";

import mainlogo from "@/assets/images/main_logo.png";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { error }] = useLoginMutation();
  console.log(error);

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    // router.push(`/`); // redirect after login
    // console.log(data);
    try {
      setLoading(true);
      const res = await login({ email, password }).unwrap();
      // Assuming your backend returns { user, userProfile }
      console.log(res);
      if (res.success) {
        if (res.data.role !== "ADMIN") {
          throw new Error("Can't Login.");
        }
        await fetch("/api/auth-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: res.data.access_token,
            email: res.data.email,
            role: res.data.role,
            id: res.data.user_id,
          }),
        });

        dispatch(
          addAuthData({
            isLoading: false,
            userProfile: null,
            user: {
              token: res.data.access_token,
              email: res.data.email,
              role: res.data.role,
              id: res.data.user_id,
            },
          })
        );

        router.push(`/`); // redirect after login
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDFBFE] px-4">
      <div className="max-w-md bg-white rounded-2xl shadow-lg p-8 w-[514px]">
        <div className="flex justify-center mt-5">
          <Image
            width={180}
            height={180}
            alt="main logo"
            src={mainlogo}
            className=""
          ></Image>
        </div>
        {/* font Inter  w-600 semi bold size 24px line height 130% horizontal align center */}
        <div>
          <h2 className="text-[24px] mt-[20px] font-semibold leading-[130%] text-center text-gray-800 mb-6">
            Sign in
          </h2>
        </div>

        <BaseForm
          btnText="Login"
          isLoading={false}
          onSubmit={handleSubmit}
          defaultValues={{ email: "", password: "" }}
        >
          <FormInput required label="Email Address" name="email" />

          <FormInput
            required
            label="Password"
            name="password"
            type="password"
          />

          <button
            type="submit"
            className={`  w-full rounded-[8px] bg-[#43C5E3] text-white py-2 px-4  hover:bg-[rgb(67,197,237)]`}
          >
            {isLoading ? "Processing..." : "Sign in"}
          </button>
        </BaseForm>
      </div>
    </div>
  );
};

export default Login;
