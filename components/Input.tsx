"use client";
import React from "react";

type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ onChange, placeholder, type, value }: InputProps) => {
  return (
    <input
      className="border-none my-2 block w-full outline-none p-3 rounded"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
