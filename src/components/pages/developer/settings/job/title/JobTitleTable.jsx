import NoData from "@/components/partials/NoData";
import Status from "@/components/partials/Status";
import TableLoader from "@/components/partials/TableLoader";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import ModalRestore from "@/components/partials/modal/ModalRestore";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React from "react";
import { FaArchive, FaEdit } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdDelete, MdOutlineSearch, MdRestore } from "react-icons/md";

const JobTitleTable = ({ setJobtitleEdit, jobtitle, isLoading }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isArchiving, setIsArchiving] = React.useState(false);
  const [id, setId] = React.useState("");
  const [isData, setIsData] = React.useState("");
  let counter = 1;

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setJobtitleEdit(item);
  };

  const handleArchive = (item) => {
    setIsData(item.jobTitle_level);
    dispatch(setIsArchive(true));
    setId(item.jobTitle_aid);
    setIsArchiving(true);
    setIsRestore(false);
  };

  const handleRestore = (item) => {
    setIsData(item.jobTitle_level);
    dispatch(setIsRestore(true));
    setId(item.jobTitle_aid);
    setIsArchiving(false);
    setIsRestore(true);
  };

  const handleDelete = (item) => {
    setIsData(item.jobTitle_level);
    dispatch(setIsDelete(true));
    setId(item.jobTitle_aid);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="input-wrapper w-[120px]">
            <label className="p-1 z-10">Status</label>
            <select>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="count flex items-center gap-2">
            <span>
              <FaUserGroup className="text-gray-500" />
            </span>
            <h3 className="text-gray-500">4</h3>
          </div>
        </div>
        <div className="search relative">
          <span>
            <MdOutlineSearch
              className="top-[25%] absolute left-2 z-10 text-gray-500"
              size={18}
            />
          </span>
          <input type="text" placeholder="Search here..." className="pl-8" />
        </div>
      </div>

      <div className="site-table relative">
        {isLoading ? (
          <TableLoader />
        ) : jobtitle?.data.length === 0 ? (
          <NoData />
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Job Level</th>
                <th>Job Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobtitle?.data.map((item, key) => (
                <tr key={key}>
                  <td>{counter++}</td>
                  <td>
                    {item.jobTitle_is_active === 1 ? (
                      <Status text="Active" />
                    ) : (
                      <Status text="Inactive" />
                    )}
                  </td>
                  <td>{item.jobTitle_level}</td>
                  <td>{item.jobTitle_title}</td>
                  <td className="flex gap-3 justify-end">
                    {item.jobTitle_is_active ? (
                      <>
                        <button
                          className="tooltip"
                          data-tooltip="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit className="text-gray-500" size={12} />
                        </button>
                        <button
                          className="tooltip"
                          data-tooltip="Archive"
                          onClick={() => handleArchive(item)}
                        >
                          <FaArchive className="text-gray-500" size={11} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="tooltip"
                          data-tooltip="Restore"
                          onClick={() => handleRestore(item)}
                        >
                          <MdRestore className="text-gray-500" size={15} />
                        </button>
                        <button
                          className="tooltip"
                          data-tooltip="Delete"
                          onClick={() => handleDelete(item)}
                        >
                          <MdDelete className="text-gray-500" size={14} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          queryKey={"jobtitle"}
          mysqlEndpoint={`/v2/jobtitle/active/${id}`}
          item={isData}
          archive={isArchiving}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          queryKey={"jobtitle"}
          mysqlEndpoint={`/v2/jobtitle/active/${id}`}
          item={isData}
        />
      )}
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          queryKey={"jobtitle"}
          mysqlEndpoint={`/v2/jobtitle/${id}`}
          item={isData}
        />
      )}
    </>
  );
};

export default JobTitleTable;
