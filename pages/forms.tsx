import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Less code (c)
// Better validation
// Better Erros (set, clear, display)
// Have control over inputs
// Dont deal with events (c)
// Easier Inputs (c)

export default function Forms() {
  const { register, handleSubmit } = useForm();
  const onValid = () => {
    console.log("i'm valid baby");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("username", {
          required: true,
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="email"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
