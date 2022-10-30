import Table, { indexID } from "../table"; // new
import React, { useMemo } from "react";

const NewsTable = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        Cell: indexID,
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "News",
        accessor: "news",
      },
      {
        Header: "Action",
        Cell: ActionSection,
      },
    ],
    []
  );

  function ActionSection({ row }) {
    console.log(row);
    return (
      <div className="flex ">
        {/* <div
          className="h-7 w-9 bg-red-700 rounded-sm ml-2 flex justify-center items-center cursor-pointer"
          onClick={() => {
            props.setSigleData(row.original);
            props.setShowForm(true);
            props.goToTop();
          }}
        >
          Edit
        </div> */}
        <div
          className="h-7 px-2 bg-red-700 rounded-sm ml-2 flex justify-center items-center cursor-pointer"
          onClick={() => {
            props.deleteNews(row.original._id);
          }}
        >
          Delete
        </div>
      </div>
    );
  }
  return <Table columns={columns} data={props.data} />;
};

export default NewsTable;
