"use client";
import { BASE_URL } from "@/context/api";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
    const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("");
  const handleChangeEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSendEmail = async () => {
   try {
     if (email == "" || !email.includes("@gmail.com")) {
       toast.error("enter valid email");
       return;
     }
     setIsLoading(true);
     const response = await axios.post(`${BASE_URL}/user/forgot-password`, {
       email: email,
     });
     toast.success(response.data.message);
   } catch (error) {
    if(axios.isAxiosError(error) && error.response)
    {
  toast.error(error.response.data.message )
    }
    else{
        toast.error('failed! try again')
    }
    // console.log(error.message)
   }
   finally{
    setIsLoading(false)
   }
  };
  return (
    <main className="flex h-screen  flex-wrap  content-center">
            <h2 className="text-center w-full text-blue-500 ">Reset Password</h2>
      <div className="mx-auto shadow-lg  bg-slate-200 px-10 lg:w-1/3 py-20  rounded-md flex flex-col gap-6 items-center">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Admin email"
          className="p-3 w-full"
          onChange={handleChangeEmail}
        />
        <button
          className="bg-blue-600 px-5 py-2 hover:bg-blue-700 text-white"
          onClick={handleSendEmail}
        >
          {isLoading?"Resetting Password...":"Reset Password"}
        </button>
      </div>
    </main>
  );
};

export default Page;
