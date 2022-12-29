import { Link } from "@mui/material";
import React, { useEffect } from "react";
import Navbardetail from "../components/Navbardetail";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";


const Login = (props) => {
  const {data:session} = useSession();

  const router = useRouter();
  const {redirect} = router.query;


  useEffect(()=>{
    if(session){
      router.push(redirect||'/')
    }
  },[router,session,redirect])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const SubmitHandler = async({email,password})=>{
    console.log(email,password)
    try{
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if(result.error){
        toast.error(result.error);
      }
     
    } catch(error){
      toast.error(error.message);
    }
  }
  return (
    <div className="bg-gray-200 h-screen">
      <Navbardetail />
      <ToastContainer postion='bottom-center' limit={1} />
      <h1 className="text-center text-[3rem] font-light">Welcome to Daraz 2.0</h1>
      <form action="" onSubmit={handleSubmit(SubmitHandler)}>
        <section className="text-gray-600 body-font flex ">
          <div className="container px-5 py-3  flex flex-wrap items-center justify-center ">
            <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 ">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Login
              </h2>
              <div className="relative mb-4">
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

                <input
                  type="password"
                  id="password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  {...register("password", {
                    required: "Please enter your password",
                    // pattern:
                      // {
                        // value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                        

                      //   message:"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
                      // }
                      minLength:3
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            <button onSubmit={()=>{SubmitHandler(data)}} className="text-white bg-[#f57224] border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
               Login
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Don&apos;t have an account &#63;{" "}
                <Link href="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Login;
