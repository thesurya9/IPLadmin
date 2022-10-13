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
    ],
    []
  );
  return <Table columns={columns} data={props.data} />;
};

export default NewsTable;
