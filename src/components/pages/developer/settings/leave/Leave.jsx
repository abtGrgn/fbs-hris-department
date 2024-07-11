import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { FaUserClock } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import { RiUserShared2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";

const Leave = () => {
  return (
    <>
      <Header avatar="LR" />
      <div className="flex">
        <Navigation menu="settings" submenu="leave" />
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
          <div className="h-screen">
            <div className="list-content">
              <BreadCrumbs />
            </div>
            <h2>Leave</h2>
            <div className="list-content-button">
              <Link to="/settings/leave/leave-type">
                <button className="button">
                  <span>
                    <BiCategory className="text-[14px]" />
                    Leave Type
                    <GoChevronRight className="group-hover:bg-[#9f1659] group-hover:text-white duration-200 rounded-md inline-block w-[1rem] h-[2rem] py-1" />
                  </span>
                </button>
              </Link>
              <Link to="/settings/leave/leave-benefits">
                <button className="button">
                  <span>
                    <BiCategory className="text-[14px]" />
                    Leave Benefits
                    <GoChevronRight className="group-hover:bg-[#9f1659] group-hover:text-white duration-200 rounded-md inline-block w-[1rem] h-[2rem] py-1" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Leave;
