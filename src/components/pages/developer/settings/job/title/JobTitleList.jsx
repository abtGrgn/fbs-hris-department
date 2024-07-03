import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import JobTitleTable from "./JobTitleTable";
import ModalAddTitle from "./ModalAddTitle";
import { StoreContext } from "@/store/storeContext";
import { setIsAdd } from "@/store/storeAction";
import ModalSuccess from "@/components/partials/modal/ModalSuccess";
import ModalError from "@/components/partials/modal/ModalError";
import useQueryData from "@/components/custom-hooks/useQueryData";

const JobTitleList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [jobtitleEdit, setJobtitleEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setJobtitleEdit(null);
  };

  return (
    <>
      <Header avatar="LR" />
      <div className="flex">
        <Navigation menu="settings" submenu="job" />
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
          <div className="h-screen">
            <div className="list-content">
              <BreadCrumbs />
              <button className="btn-add" onClick={handleAdd}>
                <MdOutlineAdd size={18} />
                Add
              </button>
            </div>
            <h2 className="text-lg font-bold -translate-y-5">Job Title</h2>
            <JobTitleTable
              setJobtitleEdit={setJobtitleEdit}
            />
          </div>
          <Footer />
        </div>
      </div>
      {store.success && <ModalSuccess />}
      {store.isAdd && (
        <ModalAddTitle
          jobtitleEdit={jobtitleEdit}
          setJobtitleEdit={setJobtitleEdit}
        />
      )}
      {store.error && <ModalError />}
    </>
  );
};

export default JobTitleList;
