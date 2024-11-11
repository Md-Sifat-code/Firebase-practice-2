import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase.init";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Register() {
  const provider = new GoogleAuthProvider();
  const gitprovider = new GithubAuthProvider();
  const [success, setSuccess] = useState(false);
  const [showpass, setShowpass] = useState(false); // State for toggling password visibility

  const handlegit = () => {
    signInWithPopup(auth, gitprovider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handlegoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submission prevented!");
    const email = e.target.email.value;
    const password = e.target.pass.value;
    const firstName = e.target.firstname.value;
    const lastName = e.target.ladtname.value;

    if (password.length < 6) {
      toast.error("Password must be more than 6 characters");
      return; // Stops further execution if validation fails
    }

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const specialChar = /[^a-zA-Z0-9]/;

    if (
      !uppercase.test(password) ||
      !lowercase.test(password) ||
      !specialChar.test(password)
    ) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        return updateProfile(result.user, {
          displayName: `${firstName} ${lastName}`,
        });
      })
      .then(() => {
        setSuccess(true);
        toast.success("Congratulations! Registration successful.");
      })
      .catch((error) => {
        console.log("Error", error);
        setSuccess(false);
        toast.error("Login Failed. Try again later.");
      });
  };

  return (
    <section className="min-h-screen">
      <div className="container mx-auto border min-h-screen grid grid-cols-2">
        <div className="flex flex-row justify-center items-center">
          <img className="" src="/logo-removebg-preview.png" alt="" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-6xl text-center font-bold mb-20">
            Hi! Welcome to
            <br /> Wixel dude
            <i className="fa-solid fa-hand-wave text-yellow-400"></i>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">First Name</p>
                  <input
                    name="firstname"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">Last Name</p>
                  <input
                    name="ladtname"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="relative">
                <p className="font-semibold">Password</p>
                <input
                  name="pass"
                  type={showpass ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full"
                />
                <i
                  onClick={() => setShowpass(!showpass)}
                  className={`absolute inset-y-[40px] right-4 cursor-pointer ${
                    showpass ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                  }`}
                ></i>
              </div>
              <button className="font-bold text-center btn btn-primary w-full text-white border-none">
                Sign up
              </button>
            </div>
          </form>
          <div>
            <h1 className="mt-3 mb-4">
              Already have an account?{" "}
              <Link className="font-bold underline" to={"/Login"}>
                Sign In
              </Link>
            </h1>
            <hr className="w-full" />
            <div className="grid grid-cols-2 gap-20 mt-4">
              <button
                className="btn btn-outline flex flex-row gap-2"
                onClick={handlegoogle}
              >
                <i className="fa-brands fa-google"></i>
                <span>Sign up with Google</span>
              </button>
              <button
                onClick={handlegit}
                className="btn btn-outline flex flex-row gap-2"
              >
                <i className="fa-brands fa-github"></i>
                <span>Sign up with Github</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
