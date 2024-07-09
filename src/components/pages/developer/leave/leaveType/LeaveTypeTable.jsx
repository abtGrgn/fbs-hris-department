import SearchBar from "@/components/partials/SearchBar";
import { setIsAdd, setIsArchive } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React from "react";
import { FaArchive, FaEdit } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdDelete, MdRestore } from "react-icons/md";

const LeaveTypeTable = ({ setLeaveTypeEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isArchiving, setIsArchiving] = React.useState(false);
  const [id, setId] = React.useState("");
  const [isData, setIsData] = React.useState("");

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setLeaveTypeEdit(item)
  }

  const handleArchive = (item) => {
    setIsData();
    dispatch(setIsArchive(true));
    setId();
    setIsArchiving(true);
    setIsRestore(false);
  }

  const handleRestore = (item) => {
    setIsData();
    dispatch(setIsRestore(true));
    setId();
    setIsArchiving(false);
    setIsRestore(true);
  };

  const handleDelete = (item) => {
    setIsData();
    dispatch(setIsDelete(true));
    setId();
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
            <h4>1</h4>
          </div>
        </div>
        <div className="search">
          <SearchBar />
        </div>
      </div>

      <div className="site-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Leave Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>active</td>
              <td>birthday leave</td>
              <td className="flex gap-3 justify-end">
                <button className="tooltip" data-tooltip="Edit" onClick={() => handleEdit(item)}>
                  <FaEdit className="text-gray-500" size={12} />
                </button>
                <button className="tooltip" data-tooltip="Archive" onClick={() => handleArchive(item)}>
                  <FaArchive className="text-gray-500" size={11} />
                </button>
                <button className="tooltip" data-tooltip="Restore" onClick={() => handleRestore(item)}>
                  <MdRestore className="text-gray-500" size={15} />
                </button>
                <button className="tooltip" data-tooltip="Delete" onClick={() => handleDelete(item)}>
                  <MdDelete className="text-gray-500" size={14} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaveTypeTable;
