import { Link } from "@mui/material";
import React, { useEffect } from "react";
import Navbardetail from "../components/Navbardetail";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = (props) => {
  const { data: session } = useSession();
  console.log(session);

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const SubmitHandler = async ({ name, email, password }) => {
    console.log(email, password);
    try {
      await axios.post("/api/auth/signuphandler", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePassword = () => {
    const password = document.getElementById("password");
    const visibleicon = document.getElementById("visibleicon");
    const invisibleicon = document.getElementById("invisibleicon");

    if (password.type === "password") {
      password.type = "text";
      visibleicon.style.display = "block";
      invisibleicon.style.display = "none";
    } else {
      visibleicon.style.display = "none";
      invisibleicon.style.display = "block";
      password.type = "password";
    }
  };
  return (
    <div className="bg-gray-200 md:h-screen   ">
      <Navbardetail />
      <ToastContainer postion="bottom-center" limit={1} />
      
      
      <div className="flex flex-col md:mt-[5rem] ">
        <form action="" onSubmit={handleSubmit(SubmitHandler)}>
          <section className="text-gray-600 body-font flex ">
            <div className="container px-5   flex flex-wrap items-center justify-center ">
              <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 ">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                  Register
                </h2>
                <div className="relative mb-4">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    autoFocus
                    id="name"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter your name"
                    {...register("name", {
                      required: "Please enter your name",
                    })}
                  />

                  <label
                    htmlFor="full-name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoFocus
                    placeholder="abc@gmail.com"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    {...register("email", {
                      required: "Please enter your email",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Password
                  </label>
                      <div className="flex gap-2">
                      <input
                    type="password"
                    id="password"
                    placeholder="********"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    {...register("password", {
                      required: "Please enter your password",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,

                        message:
                          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                      },
                      minLength: 3,
                    })}
                  />
                  <AiFillEye
                    id="visibleicon"
                    className="text-[1.5rem]"
                    onClick={() => {
                      handlePassword();
                    }}
                  />
                  <AiFillEyeInvisible
                    id="invisibleicon"
                    className="hidden text-[1.5rem]"
                    onClick={() => {
                      handlePassword();
                    }}
                  />

                      </div>
                 
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                  <label
                    htmlFor="confirmpassword"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Confirm Password
                  </label>

                  <div className="flex gap-2">
                  <input
                    type="password"
                    id="confirmpassword"
                    placeholder="********"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    {...register("password", {
                      required: "Please enter your password",
                      validate: (value) =>
                        value === watch("password") ||
                        "Password does not match",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,

                        message:
                          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
                      },
                      minLength: 3,
                    })}
                  />
                <AiFillEye
                    id="visibleicon"
                    className="text-[1.5rem]"
                    onClick={() => {
                      handlePassword();
                    }}
                  />
                  <AiFillEyeInvisible
                    id="invisibleicon"
                    className="hidden text-[1.5rem]"
                    onClick={() => {
                      handlePassword();
                    }}
                  />
                  </div>
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <button
                  onSubmit={() => {
                    SubmitHandler(data);
                  }}
                  className="text-white bg-[#f57224] border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Register
                </button>
                <p className="text-md text-gray-500 mt-3">
                  Already have an account &#63; <Link href="/Login">Login</Link>
                </p>
              </div>
            </div>
          </section>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
