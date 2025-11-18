"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Form, Input, Button } from "@heroui/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);



  const darkMode = theme === "dark";
  

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    const newErrors: Record<string, string | string[]> = {};
    const emailError = getEmailError(data.email || "");
    const passwordError = getPasswordError(data.password || "");
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (data.name === "admin") newErrors.name = "Nice try! Choose a different username";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(data);
  };

  const getPasswordError = (value: string) => {
    const hasMinLength = value.length > 4;
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[~`!@#$%^&*()\-_=+\[\]{};:'",.<>\/?\\|]/.test(value);
    if (!hasMinLength) return "Password must be at least 5 characters";
    if (!hasNumber) return "Password needs at least 1 number";
    if (!hasSymbol) return "Password needs at least 1 symbol";
    return null;
  };

  const getEmailError = (value: string) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : "Invalid email address";
  };

  const images = [
    "/images/carousel1.jpg",
    "/images/carousel2.jpg",
    "/images/carousel3.jpg",
  ];
  const [index, setIndex] = useState(0);

  const prevSlide = React.useCallback(() => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);
  const nextSlide = React.useCallback(() => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, [index, nextSlide]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        darkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <Card
        className={`relative w-full max-w-6xl grid md:grid-cols-2 overflow-hidden rounded-[2rem] shadow-2xl border-0 transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        

        {/* Left Side */}
        <div className="flex flex-col justify-center px-10 lg:px-16 py-16">
          <CardHeader className="p-0 mb-6">
            <CardTitle
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Create your account
            </CardTitle>
            <CardDescription
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className={`underline ${
                  darkMode ? "text-blue-400" : "text-primary"
                }`}
              >
                Sign in
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <Form
              className="space-y-6"
              validationBehavior="aria"
              validationErrors={errors}
              onReset={() => setSubmitted(null)}
              onSubmit={onSubmit}
            >
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Name</label>
                  <Input
                    isRequired
                    name="name"
                    id="name"
                    type="text"
                    value={name}
                    onValueChange={setName}
                    variant="bordered"
                    classNames={{
                      inputWrapper: darkMode ? "bg-gray-800" : "",
                      input: darkMode ? "text-white placeholder:text-gray-400" : "",
                    }}
                    placeholder="Enter Your Full Name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    isRequired
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    onValueChange={(val) => {
                      setEmail(val);
                      const msg = getEmailError(val) || "";
                      setErrors((prev) => ({ ...prev, email: msg }));
                    }}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email}
                    color={errors.email ? "danger" : "success"}
                    variant="bordered"
                    classNames={{
                      inputWrapper: darkMode ? "bg-gray-800" : "",
                      input: darkMode ? "text-white placeholder:text-gray-400" : "",
                      errorMessage: darkMode ? "text-red-400" : "text-red-500",
                    }}
                    placeholder="Enter Your Email Address"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="password">Password</label>
                  <Input
                    isRequired
                    name="password"
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    onValueChange={(val) => {
                      setPassword(val);
                      const msg = getPasswordError(val) || "";
                      setErrors((prev) => ({ ...prev, password: msg }));
                    }}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password}
                    color={errors.password ? "danger" : "success"}
                    variant="bordered"
                    classNames={{
                      inputWrapper: darkMode ? "bg-gray-800" : "",
                      input: darkMode ? "text-white placeholder:text-gray-400" : "",
                      errorMessage: darkMode ? "text-red-400" : "text-red-500",
                    }}
                    endContent={
                      <button
                        type="button"
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                        onClick={() => setIsPasswordVisible((v) => !v)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                    placeholder="Enter Your Password"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <Button className="w-full rounded-full" color="primary" type="submit">
                    Submit
                  </Button>
                  <Button type="reset" variant="bordered">
                    Reset
                  </Button>
                </div>

                <p
                  className={`text-xs text-center mt-3 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  By creating an account, you agree to our{" "}
                  <Link
                    href="#"
                    className={`underline ${
                      darkMode ? "text-blue-400" : "text-primary"
                    }`}
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>

              {submitted && (
                <div className="text-sm mt-4">
                  Submitted data:{" "}
                  <pre className="text-xs opacity-70">
                    {JSON.stringify(submitted, null, 2)}
                  </pre>
                </div>
              )}
            </Form>
          </CardContent>
        </div>

        {/* Right Side - Carousel */}
        <div className="relative bg-black flex flex-col items-center justify-end overflow-hidden rounded-[2rem] w-[550px] h-[600px]">
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Slide ${i + 1}`}
              fill
              priority={i === 0}
              className={`object-cover transition-opacity duration-700 absolute inset-0 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute top-6 left-6 z-20 flex gap-2">
            <button
              onClick={prevSlide}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-[5]" />

          <div className="relative z-10 flex flex-col items-center justify-end pb-10 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4 drop-shadow-lg">
              Creating Memories
            </h2>
            <div className="flex justify-center gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-[3px] w-6 rounded-full transition-all duration-300 ${
                    i === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
