import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSignupModal, setShowSignup } from "../redux/slices/modal.slice";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/user.slice";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIssignup] = useState(true);
  const [showPassword, setShowpassword] = useState(false);
  const [formData, setFormdata] = useState({
    userName: "",
    email: "",
    password: "",
    contact: "",
  });
  const [profilePic, setProfilepic] = useState(null);

  const handleTogleSignup = () => {
    dispatch(toggleSignupModal());
  };

  const handleChange = (event) => {
    setFormdata((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleImageChange = (event) => {
    setProfilepic(event.target.files[0]);
  };

  // Signup handler function
  const signupHandler = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("userName", formData.userName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("contact", formData.contact);
    if (profilePic) {
      data.append("profilePic", formData.profilePic);
    }
    const loadingToast = toast.loading("Processing signup...");
    try {
      const res = await axios.post(`${BASE_URL}/user/signup`, data, {
        withCredentials: true,
      });
      // console.log("Signup successful:", res.data);
      if (res.data.success) {
        toast.success(res.data.message); // <-- 👈 Show "User registered successfully !!"
        navigate("/");
        dispatch(setShowSignup(false));
        dispatch(setUser(res?.data?.user))
      } else {
        toast.error(res.data.error || "Signup failed.");
      }
      // Optionally: redirect or clear form
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed.");
    } finally {
      toast.dismiss(loadingToast); // Dismiss the loading toast
    }
  };

  // Login handler function
  const loginHandler = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    const loadingToast = toast.loading("Processing Login...");
    try {
      const res = await axios.post(
        `${BASE_URL}/user/login`,
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );
      console.log("Login successful:", res.data);
      if (res.data.success) {
        toast.success(res.data.message); // <-- 👈 Show "User Logged in successfully !!"
        navigate("/");
        dispatch(setUser(res?.data?.user))
        dispatch(setShowSignup(false));
      } else {
        toast.error(res.data.error || "Login failed.");
      }
      // Optionally: redirect or clear form
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed !");
    } finally {
      toast.dismiss(loadingToast); // Dismiss the loading toast
    }
  };
  return (
    <div className="w-screen! h-screen! flex justify-center items-center z-[999] fixed top-0 left-0 bg-[#000000a4] md:p-5 text-sm">
      <div className="w-full md:w-[40vw] pb-3 bg-white rounded-sm pt-4 relative">
        <button
          onClick={handleTogleSignup}
          className="absolute right-2 top-1 text-xl font-bold cursor-pointer"
        >
          ❌
        </button>

        <form
          onSubmit={isSignup ? signupHandler : loginHandler}
          encType="multipart/form-data"
        >
          <section className="flex gap-5 w-full justify-center">
            <section className="flex gap-5 w-full justify-center ">
              {" "}
              <button
                className={`text-lg flex gap-2 text-black font-normal cursor-pointer  ${
                  isSignup ? "bg-[#24A3B5] text-white" : "bg-white text-black"
                } !px-5 !py-2 `}
                onClick={(event) => {
                  event.preventDefault();
                  setIssignup(true);
                }}
              >
                Signup
              </button>{" "}
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setIssignup(false);
                }}
                className={`text-lg flex gap-2 text-black font-normal cursor-pointer ${
                  !isSignup ? "bg-[#24A3B5] text-white" : "bg-white text-black"
                } !px-5 !py-2 `}
              >
                Login
              </button>{" "}
            </section>
          </section>

          {/* input section */}
          <section className="px-10 py-4 flex-col mt-4">
            {isSignup && (
              <input
                name="userName"
                onChange={handleChange}
                value={formData.userName}
                type="text"
                required
                placeholder="Your Name"
                className="w-full px-4 py-2 border-2 mt-2 border-[#24A3B5] outline-none rounded-md"
              />
            )}
            <input
              type="email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              required
              placeholder="Your Email"
              className="w-full px-4 py-2 border-2 mt-2 border-[#24A3B5] outline-none rounded-md"
            />
            {isSignup && (
              <input
                type="tel"
                name="contact"
                onChange={handleChange}
                value={formData.contact}
                required
                placeholder="Contact Number"
                className="w-full px-4 py-2 border-2 mt-2 border-[#24A3B5] outline-none rounded-md"
              />
            )}
            {isSignup && (
              <>
                <label className="text-xxs my-1 md:block">
                  Choose a profile picture:
                </label>{" "}
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleImageChange}
                  value={formData.profilePic}
                  placeholder="Your Profile picture"
                  accept="image/jpeg, image/png, image/jpg"
                  required
                  className="mt-2 mb-2 bg-violet-50 rounded-r-md border-2 border-[#24A3B5] text-sm py-2 px-2 cursor-pointer"
                />{" "}
              </>
            )}

            <input
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              placeholder="Create Password"
              className="w-full px-4 py-2 border-2 mt-2 border-[#24A3B5] outline-none rounded-md"
            />
            <p
              onClick={() => setShowpassword((prev) => !prev)}
              className="text-[12px] font-semibold cursor-pointer my-2"
            >
              {showPassword ? "Hide password" : "Show password"}
            </p>
          </section>

          <section className="px-10 py-4 flex-col mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#24A3B5] rounded-lg cursor-pointer  text-white transition-all duration-150"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Signup;
