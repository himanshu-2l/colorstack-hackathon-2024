import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div class="justify-center mx-24 my-6 align-center justify-center items-center content-center">
        <div class="flex flex-row justify-between">
          <div class="">
            <Link to="/">
              <p class="text-xl font-bold font-[Helvetica]">Marco</p>
            </Link>
          </div>
          <div>
            <li class="flex flex-row gap-6">
              <Link to="/">
                <ul class="text-sm my-2 font-[Arial]">About</ul>
              </Link>

              <Link to="/lost_found">
                <ul class="text-sm my-2 font-[Arial]">Lost & Found</ul>
              </Link>

              <Link to="/Problems">
                <ul class="text-sm my-2 font-[Arial]">Issues</ul>
              </Link>
            </li>
          </div>
          <Link to="/">
            <ul class="bg-white text-black drop-shadow-lg rounded-full text-sm px-4 py-2 ">
              Sign Up
            </ul>
          </Link>
        </div>

        <br></br>
        <hr />
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
