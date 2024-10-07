"use client";
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '@/context/appContext';
import { BASE_URL } from '@/context/api';

const RegistrationPage = () => {
  const {language}=useAppContext()
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const onSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    try {
          await axios.post(`${BASE_URL}/student/`, {
        input,
      });

      toast.success("your application sent ");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send application. Please try again.");
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <div className="font-sans  pt-64">
      <h1 className="text-center text-blue-800 text-2xl my-5">
        Fill the form to register
      </h1>

      <form
        onSubmit={onSubmit}
        className="max-w-4xl m-auto text-center space-y-5"
      >
        <div className="flex sm:items-center gap-3 flex-col sm:flex-row">
          <p className="font-bold sm:min-w-[200px] text-start">
            {language === "en" ? "Name" : "Nom"}
          </p>
          <input
            type="text"
            name="name"
            required
            onChange={handleOnChange}
            className="outline-none block w-full px-3 py-2 mb-2 bg-slate-200 border border-transparent rounded"
          />
        </div>
        <div className="flex sm:items-center gap-3 flex-col sm:flex-row">
          <p className="font-bold sm:min-w-[200px] text-start">Email</p>
          <input
            type="text"
            name="email"
            required
            onChange={handleOnChange}
            className="outline-none block w-full px-3 py-2 mb-2 bg-slate-200 border border-transparent rounded"
          />
        </div>

        <div className="flex sm:items-center gap-3 flex-col sm:flex-row">
          <p className="font-bold sm:min-w-[200px] text-start">
            {language === "en" ? "Phone number" : "Numéro de téléphone"}
          </p>
          <input
            type="number"
            name="phone"
            required
            onChange={handleOnChange}
            className="outline-none block w-full px-3 py-2 mb-2 bg-slate-200 border border-transparent rounded"
          />
        </div>
        <div className="flex sm:items-center gap-3 flex-col sm:flex-row">
          <p className="font-bold sm:min-w-[200px] text-start">
            {language === "en" ? "Address" : "Adresse"}
          </p>
          <input
            type="text"
            name="address"
            required
            onChange={handleOnChange}
            className="outline-none block w-full px-3 py-2 mb-2 bg-slate-200 border border-transparent rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full mx-auto md:w-[600px] bg-blue-800 text-white py-2 rounded cursor-pointer text-lg"
        >
          {language === "en" ? "SUBMIT" : "SOUMETTRE"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;