'use client'
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isSuperAdmin:false
  });

  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await login(formData);
    } catch (error) {
      //@ts-expect-error error
      toast.error(error.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
     <Link href="/" className="bg-blue-700 p-2 rounded-md fixed top-2 left-2 text-white">Back</Link>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
     
        <div className="text-center mb-6">
          <img src="/logo.jpg" alt="Logo" className="w-32 h-32 mx-auto" />
        </div>

   
        <div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              onChange={handleChangeFormData}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              onChange={handleChangeFormData}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="mr-2"
              />
              <label htmlFor="remember" className="text-gray-600">
                Remember me
              </label>
            </div>
            <a href="/auth/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
              Forgot password?
            </a>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
