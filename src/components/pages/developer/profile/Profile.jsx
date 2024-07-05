import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import ModalAddProfile from "./ModalAddProfile";
import Footer from "@/components/partials/Footer";
import { StoreContext } from "@/store/storeContext";
import ModalSuccess from "@/components/partials/modal/ModalSuccess";
import ModalError from "@/components/partials/modal/ModalError";
import useQueryData from "@/components/custom-hooks/useQueryData";
import { getUrlParam } from "@/components/helpers/functions-general";

const Profile = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [profileEdit, setProfileEdit] = React.useState(null);
  const id = getUrlParam().get('empid')  


  return (
    <>
      <Header avatar="LR" />
      <div className="flex">
        <Navigation menu="employees" />
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
          <div className="h-screen">
            <div className="list-content">
              <h2>Profile</h2>
            </div>
            <ProfileInfo setProfileEdit={setProfileEdit} id= {id} />
          </div>
          <Footer />
        </div>
      </div>
      {store.success && <ModalSuccess />}
      {store.isAdd && (
        <ModalAddProfile
          setProfileEdit={setProfileEdit}
          profileEdit={profileEdit}
     
        />
      )}
      {store.error && <ModalError />}
    </>
  );
};

export default Profile;
