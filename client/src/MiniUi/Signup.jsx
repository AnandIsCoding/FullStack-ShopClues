import React from "react";

function Signup() {
  return (
    <div className="w-screen! h-screen! flex justify-center items-center z-[999] absolute top-0 left-0 bg-[#000000a4] md:p-5">
      <div className="w-full md:w-[40vw] pb-3 bg-[#f1f9fd] rounded-sm pt-4 relative">
        <button onClick={()=>{
            setShowSignuppage(false)
        }} className="absolute right-2 top-1 text-xl font-bold cursor-pointer">
          ❌
        </button>

        <form>
          <section className="flex gap-5 w-full justify-center">
            <button className="text-lg flex gap-2 text-black font-normal cursor-pointer bg-[#FFDB52] px-5 py-2">
              Signup
            </button>
            <button className="text-lg flex gap-2 text-black font-normal cursor-pointer bg-white px-5 py-2">
              Login
            </button>
          </section>

          {/* input section */}
          <section className="px-10 py-4 flex-col mt-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border-2 mt-2 border-amber-200 outline-none rounded-md"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border-2 mt-2 border-amber-200 outline-none rounded-md"
            />
            <input
              type="password"
              placeholder="Create Password"
              className="w-full px-4 py-2 border-2 mt-2 border-amber-200 outline-none rounded-md"
            />
            <p className="text-sm font-semibold cursor-pointer">Show password</p>
          </section>

          <section className="px-10 py-4 flex-col mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#FFDB52] rounded-lg cursor-pointer hover:bg-yellow-500 transition-all duration-150"
            >
              Create Account
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Signup;
