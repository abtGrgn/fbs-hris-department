import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import LeaveBenefitsTable from "./LeaveBenefitsTable";
import ModalAddLeaveBenefits from "./ModalAddLeaveBenefits";
import { StoreContext } from "@/store/storeContext";
import { setIsAdd, setIsSettingsOpen } from "@/store/storeAction";
import ModalSuccess from "@/components/partials/modal/ModalSuccess";
import ModalError from "@/components/partials/modal/ModalError";
import useQueryData from "@/components/custom-hooks/useQueryData";

const LeaveBenefits = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [leaveBenefitsEdit, setLeaveBenefitsEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setLeaveBenefitsEdit(null);
  };

  // used para mapanatili na bukas ang settings/submenu kahit ma-refresh
  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);

  const {
    isLoading: joblevelIsLoading,
    isFetching: joblevelIsFetching,
    error: joblevelError,
    data: joblevel,
  } = useQueryData(
    `/v2/joblevel`, // endpoint
    "get", // method
    "joblevel" // key
  );

  const {
    isLoading: jobtitleIsLoading,
    isFetching: jobtitleIsFetching,
    error: jobtitleError,
    data: jobtitle,
  } = useQueryData(
    `/v2/jobtitle`, // endpoint
    "get", // method
    "jobtitle" // key
  );

  const {
    isLoading: leavetypeIsLoading,
    isFetching: leavetypeIsFetching,
    error: leavetypeError,
    data: leavetype,
  } = useQueryData(
    `/v2/leavetype`, // endpoint
    "get", // method
    "leavetype" // key
  );

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
            <h2>Leave Benefits</h2>
            <LeaveBenefitsTable setLeaveBenefitsEdit={setLeaveBenefitsEdit} />
          </div>
        </div>
      </div>
      {store.success && <ModalSuccess/>}
      {store.isAdd && (
        <ModalAddLeaveBenefits
          setLeaveBenefitsEdit={setLeaveBenefitsEdit}
          leaveBenefitsEdit={leaveBenefitsEdit}
          joblevel={joblevel}
          jobtitle={jobtitle}
          leavetype={leavetype}

        />
      )}
      {store.error && <ModalError/>}
    </>
  );
};

export default LeaveBenefits;
