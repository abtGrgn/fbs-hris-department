import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import ClientTable from "./ClientTable";
import ModalAddClient from "./ModalAddClient";
import { StoreContext } from "@/store/storeContext";
import { setIsAdd } from "@/store/storeAction";
import ModalSuccess from "@/components/partials/modal/ModalSuccess";
import ModalError from "@/components/partials/modal/ModalError";

const Client = () => {
    const {store, dispatch} = React.useContext(StoreContext);
    const [clientEdit, setClientEdit] = useState(null);

    const handleAdd = () => {
        dispatch(setIsAdd(true))
        setClientEdit(null)
    };

  return (
    <>
      <Header avatar="LR" />
      <div className="flex">
        <Navigation menu="client" />
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
          <div className="h-screen">
            <div className="list-content">
              <h2>Client</h2>
              <button className="btn-add" onClick={handleAdd}>
                <MdOutlineAdd size={18} fontWeight="bold" />
                Add
              </button>
            </div>
            <ClientTable setClientEdit={setClientEdit}/>
          </div>
        </div>
      </div>
      {store.success && <ModalSuccess/>}
      {store.isAdd && <ModalAddClient setClientEdit={setClientEdit} clientEdit={clientEdit}/>}
      {store.error && <ModalError/>}
    </>
  );
};

export default Client;
