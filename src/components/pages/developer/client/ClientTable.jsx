import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import Loadmore from "@/components/partials/LoadMore";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import ModalRestore from "@/components/partials/modal/ModalRestore";
import NoData from "@/components/partials/NoData";
import SearchBar from "@/components/partials/SearchBar";
import ServerError from "@/components/partials/ServerError";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import TableSpinner from "@/components/partials/spinner/TableSpinner";
import Status from "@/components/partials/Status";
import TableLoader from "@/components/partials/TableLoader";
import { setIsAdd, setIsArchive, setIsDelete, setIsRestore } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaArchive, FaEdit } from "react-icons/fa";
import { MdDelete, MdRestore } from "react-icons/md";
import { useInView } from "react-intersection-observer";

const ClientTable = ({ setClientEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isArchiving, setIsArchiving] = React.useState(false);
  const [id, setId] = React.useState("");
  const [isData, setIsData] = React.useState("");

  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();

  let counter = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    status,
  } = useInfiniteQuery({
    queryKey: ["client", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/client/search`, // search endpoint
        `/v2/client/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean
        { searchValue: search.current.value, id: "" } // search value
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setClientEdit(item);
  };

  const handleArchive = (item) => {
    setIsData(item.client_name);
    dispatch(setIsArchive(true));
    setId(item.client_aid);
    setIsArchiving(true);
    setIsRestore(false);
  };

  const handleRestore = (item) => {
    setIsData(item.client_name);
    dispatch(setIsRestore(true));
    setId(item.client_aid);
    setIsArchiving(false);
    setIsRestore(true);
  };

  const handleDelete = (item) => {
    setIsData(item.client_name);
    dispatch(setIsDelete(true));
    setId(item.client_aid);
  };

  // used for loading of pages without clicking the Load more button
  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="site-table-action">
        <SearchBar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />
      </div>

      <div className="site-table relative">
        {isFetching && !isFetchingNextPage && status !== "loading" && (
          <FetchingSpinner />
        )}
        <table className="relative">
          {isLoading && !isFetchingNextPage && status !== "pending" && (
            <TableSpinner />
          )}
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Client</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(status === "pending" || result?.pages[0].data.length === 0) && (
              <tr className="text-center">
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
              <tr className="text-center">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}
            {result?.pages.map((page, key) => (
              <React.Fragment key={key}>
                {page.data.map((item, key) => (
                  <tr key={key}>
                    <td>{counter++}</td>
                    <td>
                      {item.client_is_active === 1 ? (
                        <Status text="Active" />
                      ) : (
                        <Status text="Inactive" />
                      )}
                    </td>
                    <td>{item.client_name}</td>
                    <td className="flex items-center justify-end gap-3">
                      {item.client_is_active ? (
                        <>
                          <button
                            className="tooltip"
                            data-tooltip="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit className="text-gray-500" size={11} />
                          </button>
                          <button
                            className="tooltip"
                            data-tooltip="Archive"
                            onClick={() => handleArchive(item)}
                          >
                            <FaArchive className=" text-gray-500" size={10} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="tooltip"
                            data-tooltip="Restore"
                            onClick={() => handleRestore(item)}
                          >
                            <MdRestore className=" text-gray-500" size={14} />
                          </button>
                          <button
                            className="tooltip"
                            data-tooltip="Delete"
                            onClick={() => handleDelete(item)}
                          >
                            <MdDelete className=" text-gray-500" size={13} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <Loadmore
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          result={result?.pages[0]}
          setPage={setPage}
          page={page}
          refView={ref}
        />
      </div>
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          queryKey={"client"}
          mysqlEndpoint={`/v2/client/active/${id}`}
          item={isData}
          archive={isArchiving}
        />
      )}
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          queryKey={"client"}
          mysqlEndpoint={`/v2/client/${id}`}
          item={isData}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          queryKey={"client"}
          mysqlEndpoint={`/v2/client/active/${id}`}
          item={isData}
        />
      )}
    </>
  );
};

export default ClientTable;
