import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import CreateButton from "./components/CreateButton";
import { FiExternalLink } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import gradient from "./assets/gradient.jpg";
import { FaExclamation } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import checklist from "./assets/checklist.jpg";

function App() {
  return (
    <>
      <div
      // style={{
      //   backgroundImage: `url(${gradient})`,
      //   backgroundRepeat: "no-repeat",
      //   width: "100%",
      // }}
      >
        <br></br>
        <div className="flex flex-row">
          <div className="ml-64 mt-8 w-1/4">
            <div className="text-6xl font-mono">
              <h1>Find.</h1>
              <h1>Share.</h1>
              <h1>
                <span className="italic text-sky-500">Connect.</span>
              </h1>
            </div>
            <p className="text-slate-400 py-4 px-1 w-3/4 text-left">
              Find and share about your{" "}
              <span className="font-bold text-slate-400">lost items</span> and
              <span className="font-bold text-slate-400"> issues</span> with
              your campus community. We're here to help.
            </p>
            <div className="flex gap-4 py-4">
              <Link to="/login">
                <div className="flex flex-row gap-2 w-36 justify-center align-center rounded-lg py-2 text-white bg-slate-900">
                  <p>Get Started</p>
                  <FiExternalLink />
                </div>
              </Link>

              <div className="flex flex-row gap-2 w-36 justify-center border border-2 border-slate-200 font-bold align-center rounded-lg py-2 text-black">
                <p>Explore</p>
              </div>
            </div>
          </div>
          {/* end left side */}
          <div className="justify-left align-left flex gap-4 flex-col mt-12 w-1/3">
            <img src={checklist} className="absolute w-1/2 z-0 -mt-24" />
            <div className="bg-slate-100 flex flex-row gap-4 items-center px-4 py-2 w-2/3 -mt-16 rounded-lg ml-72 z-10 border border-2 ">
              <FaExclamation color="black" />
              <p>Your item has been found</p>
            </div>

            <div className="bg-slate-100 flex flex-row gap-4 items-center px-4 py-2 ml-96 w-2/3 rounded-lg z-10 border border-2 ">
              <ImCheckmark color="black" />
              <p>You reported a missing item</p>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="bg-slate-100 flex flex-row gap-4 items-center px-4 py-2 w-2/3 ml-96 rounded-lg ml-4 border border-2 z-10">
              <ImCheckmark color="black" />
              <p>An admin resolved your problem</p>
            </div>

            <div className="bg-slate-100 flex flex-row gap-4 items-center px-4 py-2 w-3/4 ml-72 rounded-lg ml-12 border border-2   z-10">
              <FaExclamation color="black" />
              <p>You reported a campus problem</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
