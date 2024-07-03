import NoData from "@/components/partials/NoData";
import TableLoader from "@/components/partials/TableLoader";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import TableSpinner from "@/components/partials/spinner/TableSpinner";
import { setIsAdd, setIsCompanyInfoEdit } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const CompanyInfoTable = ({ setCompanyEdit, company, isLoading, isFetching, status }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setCompanyEdit(item);
  };

  return (
    <>
      <div className="company-info-wrapper">
        <div className="company-info-top">
          <div className="company-info-top-title">
            <h2 className="text-sm font-semibold py-2 !uppercase">details</h2>
            <button
              className="flex text-[#9f1659] text-sm"
              onClick={() => handleEdit(company.data[0])}
            >
              <FaPencilAlt />
              Update
            </button>
          </div>
        </div>
        {isFetching && status !== "loading" && (
            <FetchingSpinner />
          )}
        <table className="mt-3 relative">
        {isLoading && status !== "pending" && (
              <TableSpinner/>
            )}
          {isLoading ? (
            <TableLoader />
          ) : company?.data.length === 0 ? (
            <NoData />
          ) : (
            <tbody>
              {company?.data.map((item, key) => (
                <>
                  <tr key={key}>
                    <th>Company Name:</th>
                    <td>{item.company_name}</td>
                  </tr>
                  <tr>
                    <th>Company Email:</th>
                    <td>{item.company_email}</td>
                  </tr>
                  <tr>
                    <th>Company Phone:</th>
                    <td>{item.company_phone}</td>
                  </tr>
                  <tr>
                    <th>Street:</th>
                    <td>{item.company_street}</td>
                  </tr>
                  <tr>
                    <th>City:</th>
                    <td>{item.company_city}</td>
                  </tr>
                  <tr>
                    <th>Province:</th>
                    <td>{item.company_province}</td>
                  </tr>
                  <tr>
                    <th>Postal:</th>
                    <td>{item.company_postal}</td>
                  </tr>
                  <tr>
                    <th>Country:</th>
                    <td>{item.company_country}</td>
                  </tr>
                  <tr>
                    <th>Navigation Background Color:</th>
                    <td>{item.company_background}</td>
                  </tr>
                  <tr>
                    <th>Sub Menu Color:</th>
                    <td>{item.company_submenu}</td>
                  </tr>
                  <tr>
                    <th>Accent Color:</th>
                    <td>{item.company_accent}</td>
                  </tr>
                  <tr>
                    <th>Company Logo:</th>
                    <td>
                    {item.company_logo}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          )}
        </table>
        <div className="company-info-top mt-10">
          <div className="company-info-top-title">
            <h2 className="text-sm font-semibold py-2 !uppercase">
              subscription
            </h2>
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Product:</th>
              <td>Hris</td>
            </tr>
            <tr>
              <th>Company Code:</th>
              <td>FBS001</td>
            </tr>
            <tr>
              <th>No. Of Employee:</th>
              <td>11</td>
            </tr>
            <tr>
              <th>Add-ons:</th>
              <td>Company Branding</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompanyInfoTable;
