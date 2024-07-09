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

const EmployeesInfoTable = ({ setEmployeesInfoEdit, id }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setEmployeesInfoEdit(item);
  };

  const {
    isLoading,
    isFetching,
    error,
    status,
    data: employees,
  } = useQueryData(
    `/v2/employees/${id}`, // endpoint
    "get", // method
    "employees" // key
  );

  return (
    <>
      <div className="company-info-wrapper">
        <div className="company-info-top">
          <div className="company-info-top-title">
            <h2 className="text-sm font-semibold py-2 !uppercase">Details</h2>
            <button
              className="flex text-[#9f1659] text-sm"
              onClick={() => handleEdit(employees.data[0])} //This refers to the first element of the data array within the employees_info object.
            >
              <FaPencilAlt />
              Edit
            </button>
          </div>
        </div>
  {isFetching && status !== "loading" && <FetchingSpinner />}
        <table className="mt-3 relative">
          
          <tbody>
            {isLoading && status !== "pending" && <TableSpinner />}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}
            
            {isLoading ? (
              <tr>
                <td>
                <TableLoader cols={2} count={8} />
                </td>
              </tr> 
            ) : employees?.data.length === 0 ? (
              <tr>
                <td>
                <NoData />
                </td>
              </tr>
              
            ) : (
              <>
                {employees?.data.map((item, key) => (
                  <>
                    <tr key={key}>
                      <th>Name :</th>
                      <td>
                        {item.employees_fname} {item.employees_lname}
                      </td>
                    </tr>
                    <tr>
                      <th>Email :</th>
                      <td>{item.employees_info_email}</td>
                    </tr>
                    <tr>
                      <th>Telephone No. :</th>
                      <td>{item.employees_info_telephone}</td>
                    </tr>
                    <tr>
                      <th>Address :</th>
                      <td>{item.employees_info_address}</td>
                    </tr>
                  </>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeesInfoTable;
