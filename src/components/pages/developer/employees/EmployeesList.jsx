import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import EmployeesTable from "./EmployeesTable";
import { StoreContext } from "@/store/storeContext";
import { setIsAdd } from "@/store/storeAction";
import Footer from "@/components/partials/Footer";
import ModalAddEmployees from "./ModalAddEmployees";
import ModalSuccess from "@/components/partials/modal/ModalSuccess";
import ModalError from "@/components/partials/modal/ModalError";
import useQueryData from "@/components/custom-hooks/useQueryData";

const EmployeesList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [employeesEdit, setEmployeesEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setEmployeesEdit(null);
  };

  const {
    isLoading:departmentsIsLoading,
    isFetching:departmentsIsFetching,
    error:departmentsError,
    data: departments,
  } = useQueryData(
    `/v2/departments`, // endpoint
    "get", // method
    "departments" // key
  );

  const {
    isLoading:jobtitleIsLoading,
    isFetching:jobtitleIsFetching,
    error:jobtitleError,
    data: jobtitle,
  } = useQueryData(
    `/v2/jobtitle`, // endpoint
    "get", // method
    "jobtitle" // key
  );



  return (
    <>
      <Header avatar="LR" />
      <div className="flex">
        <Navigation menu="employees" />
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
          <div className="h-screen">
            <div className="list-content">
              <h2>Employees</h2>
              <button className="btn-add" onClick={handleAdd} >
                <MdOutlineAdd size={18} fontWeight="bold" />
                Add
              </button>
            </div>
            <EmployeesTable setEmployeesEdit={setEmployeesEdit}  />
          </div>
          <Footer />
        </div>
      </div>
      {store.success && <ModalSuccess />}
      {store.isAdd && (
        <ModalAddEmployees
          employeesEdit={employeesEdit}
          setEmployeesEdit={setEmployeesEdit}
          departments={departments}
          jobtitle={jobtitle}
        />
      )}
      {store.error && <ModalError />}
    </>
  );
};

export default EmployeesList;
