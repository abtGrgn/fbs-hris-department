import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { MdOutlineAdd, MdOutlineSearch } from "react-icons/md";
import JobLevelTable from "./JobLevelTable";
import ModalAddLevel from "./ModalAddLevel";
import { StoreContext } from "@/store/storeContext";
import { setIsAdd } from "@/store/storeAction";
import Footer from "@/components/partials/Footer";
import ModalSuccess from "@/components/partials/modal/ModalSuccess";
import ModalError from "@/components/partials/modal/ModalError";
import useQueryData from "@/components/custom-hooks/useQueryData";

const JobLevelList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [joblevelEdit, setJoblevelEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setJoblevelEdit(null);
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
                <MdOutlineAdd size={18} fontWeight="bold" />
                Add
              </button>
            </div>
            <h2 className="text-lg font-bold -translate-y-5">Job Level</h2>
            <JobLevelTable
              setJoblevelEdit={setJoblevelEdit}
              setIsAdd={setIsAdd}
            />
          </div>
          <Footer />
        </div>
      </div>
      {store.success && <ModalSuccess />}
      {store.isAdd && (
        <ModalAddLevel
          setIsAdd={setIsAdd}
          joblevelEdit={joblevelEdit}
          setJoblevelEdit={setJoblevelEdit}
        />
      )}
      {store.error && <ModalError />}
    </>
  );
};

export default JobLevelList;
