import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import LeaveTypeTable from "./LeaveTypeTable";
import ModalAddLeaveType from "./ModalAddLeaveType";
import { StoreContext } from "@/store/storeContext";
import { setIsAdd } from "@/store/storeAction";

const LeaveType = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [leaveTypeEdit, setLeaveTypeEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setLeaveTypeEdit(null);
  };

  return (
    <>
      <Header avatar="LR" />
      <div className="flex">
        <Navigation menu="settings" submenu="leave" />
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
          <div className="h-screen">
            <div className="list-content">
              <BreadCrumbs />
              <button className="btn-add" onClick={handleAdd}>
                <MdOutlineAdd size={18} />
                Add
              </button>
            </div>
            <h2 className="text-lg font-bold -translate-y-5">Leave Type</h2>
            <LeaveTypeTable setLeaveTypeEdit={setLeaveTypeEdit} />
          </div>
        </div>
      </div>
      {store.isAdd && (
        <ModalAddLeaveType
          setLeaveTypeEdit={setLeaveTypeEdit}
          leaveTypeEdit={leaveTypeEdit}
        />
      )}
    </>
  );
};

export default LeaveType;
