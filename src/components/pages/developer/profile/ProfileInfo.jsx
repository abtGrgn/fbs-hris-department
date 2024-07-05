import useQueryData from "@/components/custom-hooks/useQueryData";
import NoData from "@/components/partials/NoData";
import ServerError from "@/components/partials/ServerError";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import TableSpinner from "@/components/partials/spinner/TableSpinner";
import TableLoader from "@/components/partials/TableLoader";
import { setIsAdd } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const ProfileInfo = ({ setProfileEdit, id }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setProfileEdit(item);
  };

  const {
    isLoading ,
    isFetching ,
    error,
    data: profile,
  } = useQueryData(
    `/v2/profile/${id}`, // endpoint
    "get", // method
    "profile" // key
  );


  return (
    <>
      <div className="company-info-wrapper">
        <div className="company-info-top">
          <div className="company-info-top-title">
            <h2 className="text-sm font-semibold py-2 !uppercase">Details</h2>
            <button
              className="flex text-[#9f1659] text-sm"
              onClick={handleEdit}
            >
              <FaPencilAlt />
              Edit
            </button>
          </div>
        </div>

        <table className="mt-3 relative">
        {/* {isFetching && status !== "loading" && (
            <FetchingSpinner />
          )} */}
          <tbody>
          {/* {isLoading && status !== "pending" && (
              <TableSpinner/>
            )} */}
            {/* {status === "pending" && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {status === "pending" ? (
                    <TableLoader count={20} cols={3} />
                  ) : (
                    <NoData />
                  )}
                </td>
              </tr>
            )}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )} */}
            {profile?.data.map((item, key) => (
              <>
                <tr key={key}>
                  <th>Name :</th>
                  <td>{item.employees_fname} {item.employees_lname}</td>
                </tr>
                <tr>
                  <th>Email :</th>
                  <td>{item.profile_email}</td>
                </tr>
                <tr>
                  <th>Telephone No. :</th>
                  <td>{item.profile_telephone}</td>
                </tr>
                <tr>
                  <th>Address :</th>
                  <td>{item.profile_address}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfileInfo;
