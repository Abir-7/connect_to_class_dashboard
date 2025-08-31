"use client";
import React from "react";

import { useRouter } from "next/navigation";
//import { useAppDispatch } from "@/redux/hooks";
//import { useLoginMutation } from "@/redux/api/authApi/authApi";
//import { addAuthData } from "@/redux/features/auth/auth";

//import { toast } from "sonner";
import { BaseForm } from "@/components/ShadCN_Form/BaseForm";
import { FormInput } from "@/components/ShadCN_Form/FormInput";
import Image from "next/image";

import mainlogo from "@/assets/images/main_logo.png";

const Login = () => {
  // const dispatch = useAppDispatch();
  const router = useRouter();
  // const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (data: { email: string; password: string }) => {
    //const { email, password } = data;
    router.push(`/overview`); // redirect after login
    console.log(data);
    // try {
    //   const res = await login({ email, password }).unwrap();
    //   // Assuming your backend returns { user, userProfile }
    //   console.log(res);
    //   if (res.success) {
    //     await fetch("/api/auth-data", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         token: res.data.accessToken,
    //         email: res.data.userData.email,
    //         role: res.data.userData.role,
    //         id: res.data.userData._id,
    //       }),
    //     });
    //     dispatch(
    //       addAuthData({
    //         isLoading: false,
    //         userProfile: null,
    //         user: {
    //           email: res.data.userData.email,
    //           role: res.data.userData.role,
    //           token: res.data.accessToken,
    //           id: res.data.userData._id,
    //         },
    //       })
    //     );

    //     router.push(`/`); // redirect after login
    //   }
    // } catch (err: any) {
    //   console.log(err, "fffff");
    //   toast.error(err?.data?.message || "Something went wrong!");
    // }
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
            {/* {isLoading ? "Processing..." : "Sign in"} */}
            Sign in
          </button>
        </BaseForm>
      </div>
    </div>
  );
};

export default Login;
