import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { FaUserClock } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import { RiUserShared2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Leave = () => {
  return (
    <>
      <Header avatar="LR" />
      <div className="flex">
        <Navigation menu="settings" submenu="leave" />
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
          <div className="h-screen">
            <div className="list-content">
              <h2>Leave</h2>
            </div>
            <div className="list-content-button">
              <Link to="/settings/leave/leave-type">
                <button className="button">
                  <span className="font-semibold">
                    <RiUserShared2Fill size={20} />
                    Leave Type
                  </span>
                  <GoChevronRight className="group-hover:bg-[#9f1659] group-hover:text-white border duration-200 border-gray-300 rounded-md inline-block w-[2rem] h-[2rem] py-1" />
                </button>
              </Link>
              <Link to="/settings/leave/leave-benefits">
                <button className="button">
                  <span className="font-semibold">
                    <FaUserClock size={20} />
                    Leave Benefits
                  </span>
                  <GoChevronRight className="group-hover:bg-[#9f1659] group-hover:text-white border duration-200 border-gray-300 rounded-md inline-block w-[2rem] h-[2rem] py-1" />
                </button>
              </Link>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default Leave;
