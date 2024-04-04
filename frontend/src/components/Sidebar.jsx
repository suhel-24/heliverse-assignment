import { useDispatch } from "react-redux";
import Home from "../icons/Home";
import TeamIcons from "../icons/TeamIcons";
import { useNavigate } from "react-router-dom";
import { clearAll } from "../context/teamContext";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="w-full md:basis-[20%] md:h-full flex-col items-center justify-center">
      <div
        className="w-full flex items-center justify-between md:justify-start 
        md:items-start px-4 md:flex-col py-5 md:basis-[20%] bg-[#1E212A] 
    text-white md:h-full md:py-5 md:px-2"
      >
        {/* logo */}
        <div className="flex items-center gap-2">
          <img
            src="data:image/jpeg;base64,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"
            alt="logo"
            className="h-8 w-8 rounded-full"
          />
          <h1 className="text-lg font-bold ">Heliverse</h1>
        </div>

        <div
          className={`hidden md:flex gap-2 mt-8 px-1 items-center cursor-pointer ${
            currentPath === "/" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            dispatch(clearAll());
            navigate("/adduser");
          }}
        >
          Add User
        </div>
        <div
          className={`hidden md:flex gap-2 mt-8 px-1 items-center cursor-pointer ${
            currentPath === "/" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            dispatch(clearAll());
            navigate("/");
          }}
        >
          <Home />
          All Users
        </div>
        <div
          className={`hidden md:flex gap-2 mt-3 px-1 items-center cursor-pointer ${
            currentPath === "/team" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            dispatch(clearAll());
            navigate("/team");
          }}
        >
          <TeamIcons />
          Team
        </div>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={() => setOpen(!open)}
          className="w-6 h-6 md:hidden cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      {open && (
        <div
          className="w-full flex flex-col
        px-3
        items-start justify-center bg-[#1E212A] text-white transition-all d
        uration-500 ease-in-out md:hidden"
        >
          <hr className="text-white h-2 w-full" />
          <div
            className={`flex gap-2 m-2 px-1 items-center cursor-pointer ${
              currentPath === "/" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() => {
              navigate("/");
            }}
          >
            <Home />
            All Users
          </div>

          <div
            className={`flex  gap-2 m-2 px-1 items-center cursor-pointer ${
              currentPath === "/team" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() => {
              navigate("/team");
            }}
          >
            <TeamIcons />
            Team
          </div>
          <div
            className={`flex  gap-2 m-2 px-1 items-center cursor-pointer ${
              currentPath === "/create-team" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() => {
              navigate("/create-team");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Create Team
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
