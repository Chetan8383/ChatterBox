import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  House,
  Key,
  LogOut,
  MessageSquareText,
  Palette,
  Settings,
  UserPen,
} from "lucide-react";

const NavBar = () => {
  const { logout, authUser , onlineUsers} = useAuthStore();
  return (
    <div className="navbar fixed w-full top-0 z-40 backdrop-blur-md bg-base-100/50 md:px-6">
      {/* Left Side (Start) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-accent btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-44 gap-2 p-2 shadow"
          >
            {!authUser && (
              <>
                <li>
                  <Link>
                    <Key /> Get Started
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="https://chetan8383.github.io/Portfolio/">
                <BriefcaseBusiness /> Portfolio
              </Link>
            </li>
            <li>
              <Link to={"settings"}>
                <Palette /> Theme
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Center */}
      <div className="navbar-center">
        <Link
          to="/"
          className="flex items-centerś gap-2 hover:opacity-80 transition-all"
        >
          <div
            className="size-8 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
          >
            <MessageSquareText className="size-6 text-accent" />
          </div>
          <h1 className="text-lg font-bold">ChatterBox</h1>
        </Link>
      </div>

      {/* Right Side (End) */}
      <div className="navbar-end">
        {/* Profile Picture */}

        {authUser && (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ">
                  {authUser.profilepic ? (
                    <img
                      src={authUser.profilepic}
                      alt={authUser.fullname}
                      className="size-30 object-cover rounded-full"
                    />
                  ) : (
                    <div className="size-10 flex items-center justify-center bg-gray-500 text-white font-medium rounded-full">
                      {authUser.fullname.includes(" ")
                        ? authUser.fullname
                            .split(" ")
                            .map((name) => name.charAt(0))
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()
                        : authUser.fullname.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {onlineUsers.includes(authUser._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-44 gap-2 p-2 shadow"
              >
                <li>
                  <Link to={"/"}>
                    <House /> Home
                  </Link>
                </li>
                <li>
                  <Link to={"/profile"}>
                    <UserPen /> Profile
                  </Link>
                </li>
                <li></li>
                <li>
                  <Link onClick={logout}>
                    <LogOut /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
